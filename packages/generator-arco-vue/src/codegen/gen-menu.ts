/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import { AppMenuItemType, AppMenu, AppSubMenu, AppMenuItem, Resource } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { generatorsDir } from '../files'
import { toI18nMessage, toPath } from '../naming'
import { extractRouteInfo } from './info'

export function genMenu(appMenu: AppMenu | null, resources: Resource[]): GeneratedFile[] {
  const menu = appMenu != null ? genMenu_menu(appMenu, resources) : genMenu_defaultMenu(resources)

  const infileRawPath = 'src/components/menu/menu-tree.ts.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const outfilePath = 'src/components/menu/menu-tree.ts'
  const outfileContent = infileContent({ menu })
  const outfile = { path: outfilePath, content: outfileContent }

  return ([] as GeneratedFile[]).concat([outfile])
}

function genMenu_menu(appMenu: AppMenu, resources: Resource[]): Record<string, any> {
  return {
    items: appMenu.items
      .map((item) => {
        switch (item.type) {
          case AppMenuItemType.Item:
            return genMenu_menuItem(item as AppMenuItem, resources)
          case AppMenuItemType.SubMenu:
            return genMenu_subMenu(item as AppSubMenu, resources)
          default:
            return null
        }
      })
      .filter((item) => item != null)
  }
}

function genMenu_menuItem(menuItem: AppMenuItem, resources: Resource[]): Record<string, any> | null {
  const resource = resources.find((resource) => resource.name === menuItem.resource)
  if (resource == null) return null

  const view = resource.views.find((view) => view.type === menuItem.view) ?? resource.views[0]
  if (view == null) return null

  const route = extractRouteInfo(resource, view)
  const resourceName = toPath(resource.name)
  const i18nKeyPrefix = `menu.${resourceName}`

  return {
    ...route,
    title: {
      i18nKey: `${i18nKeyPrefix}.title`,
      i18nValue: `${toI18nMessage(resourceName)}`
    }
  }
}

function genMenu_subMenu(subMenu: AppSubMenu, resources: Resource[]): Record<string, any> | null {
  const name = toPath(subMenu.name)
  const i18nKeyPrefix = `menu.${name}`

  return {
    title: {
      i18nKey: `${i18nKeyPrefix}.title`,
      i18nValue: `${toI18nMessage(name)}`
    },
    items: subMenu.items.map((item) => genMenu_menuItem(item, resources)).filter((item) => item != null)
  }
}

function genMenu_defaultMenu(resources: Resource[]): Record<string, any> {
  const items: Record<string, any> = []

  resources.forEach((resource) => {
    const view = resource.views[0]
    if (view == null) return

    const route = extractRouteInfo(resource, view)
    const resourceName = toPath(resource.name)
    const i18nKeyPrefix = `menu.${resourceName}`

    items.push({
      ...route,
      title: {
        i18nKey: `${i18nKeyPrefix}.title`,
        i18nValue: `${toI18nMessage(resourceName)}`
      }
    })
  })

  return { items }
}
