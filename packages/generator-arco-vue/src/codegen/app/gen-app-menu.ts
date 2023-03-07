/* eslint-disable @typescript-eslint/naming-convention */
import { AppMenuItemType, AppMenu, AppSubMenu, AppMenuItem, Resource } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toDasherize, toI18nMessage, toPath } from '../../naming'
import { renderData_ViewRoute } from '../../renderdata'
import { handlebarsFile, i18nFile } from '../base'

export function genAppMenu(appMenu: AppMenu | null, resources: Resource[]): GeneratedFile[] {
  const menu = appMenu != null ? genAppMenu_menu(appMenu, resources) : genAppMenu_defaultMenu(resources)

  const messages: Record<string, string> = {}
  menu.items.forEach((item: Record<string, any>) => {
    if ((item.title.i18nKey as string).startsWith('menu.submenu.')) {
      messages[item.title.i18nKey] = item.title.i18nValue
    }
  })

  const routeOutfile = handlebarsFile('src/router/app-menu/routes.ts', 'src/router/app-menu/routes.ts.hbs', { menu })
  const i18nOutfiles = i18nFile('13-app-menu', messages)

  return [routeOutfile, ...i18nOutfiles]
}

function genAppMenu_menu(appMenu: AppMenu, resources: Resource[]): Record<string, any> {
  return {
    items: appMenu.items
      .map((item) => {
        switch (item.type) {
          case AppMenuItemType.SubMenu:
            return genAppMenu_subMenu(item as AppSubMenu, resources)
          case AppMenuItemType.Item:
            return genAppMenu_menuItem(item as AppMenuItem, resources)
          default:
            return null
        }
      })
      .filter(Boolean)
  }
}

function genAppMenu_subMenu(subMenu: AppSubMenu, resources: Resource[]): Record<string, any> | null {
  const subMenuName = toPath(subMenu.name)
  const xpath = `menu.submenu.${subMenuName}`

  return {
    name: `--${subMenuName}`,
    path: `--${subMenuName}`,
    icon: toDasherize(subMenu.icon),
    title: {
      i18nKey: `${xpath}`,
      i18nValue: `${toI18nMessage(subMenu.name)}`
    },
    children: subMenu.items.map((item) => genAppMenu_menuItem(item, resources)).filter(Boolean)
  }
}

function genAppMenu_menuItem(menuItem: AppMenuItem, resources: Resource[]): Record<string, any> | null {
  const resource = resources.find((resource) => resource.name === menuItem.resource)
  if (resource == null) return null

  const view = resource.views.find((view) => view.name === menuItem.view) ?? resource.views[0]
  if (view == null) return null

  return {
    ...renderData_ViewRoute(resource, view),
    icon: toDasherize(menuItem.icon)
  }
}

function genAppMenu_defaultMenu(resources: Resource[]): Record<string, any> {
  const items: Record<string, any> = []

  resources.forEach((resource) => {
    const view = resource.views[0]
    if (view == null) return

    items.push({
      ...renderData_ViewRoute(resource, view)
    })
  })

  return { items }
}
