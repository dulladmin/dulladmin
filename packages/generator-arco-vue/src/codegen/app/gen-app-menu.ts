/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import { AppMenuItemType, AppMenu, AppSubMenu, AppMenuItem, Resource } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { generatorsDir } from '../../files'
import { toI18nMessage, toPath } from '../../naming'
import { extractRouteInfo } from '../info'
import { i18nFile } from '../generated'

export function genAppMenu(appMenu: AppMenu | null, resources: Resource[]): GeneratedFile[] {
  const menu = appMenu != null ? genAppMenu_menu(appMenu, resources) : genAppMenu_defaultMenu(resources)

  const infileRawPath = 'src/components/menu/menu-tree.ts.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const outfilePath = 'src/components/menu/menu-tree.ts'
  const outfileContent = infileContent({ menu })
  const outfile = { path: outfilePath, content: outfileContent }

  const messages: Record<string, string> = {}
  menu.items.forEach((item: Record<string, any>) => {
    messages[item.title.i18nKey] = item.title.i18nValue
  })
  menu.items.forEach((item: Record<string, any>) => {
    item?.children?.forEach((childItem: Record<string, any>) => {
      messages[childItem.title.i18nKey] = childItem.title.i18nValue
    })
  })

  return ([] as GeneratedFile[]).concat([outfile]).concat(i18nFile(messages, '13-app-menu'))
}

function genAppMenu_menu(appMenu: AppMenu, resources: Resource[]): Record<string, any> {
  return {
    items: appMenu.items
      .map((item) => {
        switch (item.type) {
          case AppMenuItemType.Item:
            return genAppMenu_menuItem(item as AppMenuItem, resources)
          case AppMenuItemType.SubMenu:
            return genAppMenu_subMenu(item as AppSubMenu, resources)
          default:
            return null
        }
      })
      .filter((item) => item != null)
  }
}

function genAppMenu_menuItem(menuItem: AppMenuItem, resources: Resource[]): Record<string, any> | null {
  const resource = resources.find((resource) => resource.name === menuItem.resource)
  if (resource == null) return null

  const view = resource.views.find((view) => view.type === menuItem.view) ?? resource.views[0]
  if (view == null) return null

  const route = extractRouteInfo(resource, view)
  const menuItemName = toPath(menuItem.name)
  const i18nKeyPrefix = `menu.menuitem.${menuItemName}`

  return {
    ...route,
    icon: menuItem.icon,
    title: {
      i18nKey: `${i18nKeyPrefix}`,
      i18nValue: `${toI18nMessage(menuItem.name)}`
    }
  }
}

function genAppMenu_subMenu(subMenu: AppSubMenu, resources: Resource[]): Record<string, any> | null {
  const subMenuName = toPath(subMenu.name)
  const i18nKeyPrefix = `menu.submenu.${subMenuName}`

  return {
    name: `--${subMenuName}`,
    path: `--${subMenuName}`,
    icon: subMenu.icon,
    title: {
      i18nKey: `${i18nKeyPrefix}`,
      i18nValue: `${toI18nMessage(subMenu.name)}`
    },
    children: subMenu.items
      .map((item) => {
        return genAppMenu_menuItem(item, resources)
      })
      .filter((item) => item != null)
  }
}

function genAppMenu_defaultMenu(resources: Resource[]): Record<string, any> {
  const items: Record<string, any> = []

  resources.forEach((resource) => {
    const view = resource.views[0]
    if (view == null) return

    const route = extractRouteInfo(resource, view)
    const menuItemName = toPath(resource.name)
    const i18nKeyPrefix = `menu.menuitem.${menuItemName}`

    items.push({
      ...route,
      title: {
        i18nKey: `${i18nKeyPrefix}`,
        i18nValue: `${toI18nMessage(resource.name)}`
      }
    })
  })

  return { items }
}
