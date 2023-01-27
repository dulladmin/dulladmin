import { App, AppMenu, AppSubMenu, AppMenuItem } from '../../structs'
import { assertNotNull, assertIsArray, assertIsString } from '../assert'
import { YamlAppType, YamlAppMenuType, YamlAppSubMenuType, YamlAppMenuItemType } from './loader'

function parseApp(doc: YamlAppType): App {
  const parsedMenu = doc.menu != null ? parseMenu(doc.menu) : undefined
  return new App(parsedMenu)
}

function parseMenu(doc: YamlAppMenuType): AppMenu {
  const items = doc.items
  const itemsXPath = '/menu/items'
  assertNotNull(items, itemsXPath)
  assertIsArray(items, itemsXPath)
  const parsedItems = items!.map((item, idx) => {
    if ((item as YamlAppSubMenuType).items != null) return parseSubMenu(item, itemsXPath + `[${idx}]`)
    return parseMenuItem(item, itemsXPath + `[${idx}]`)
  })

  return new AppMenu(parsedItems)
}

function parseSubMenu(doc: YamlAppSubMenuType, xpath: string): AppSubMenu {
  const name = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)

  const menuItems = doc.items
  const menuItemsXPath = xpath + '/items'
  assertNotNull(menuItems, menuItemsXPath)
  assertIsArray(menuItems, menuItemsXPath)
  const parsedMenuItems = menuItems!.map((item, idx) => parseMenuItem(item, xpath + `[${idx}]`))

  const icon = doc.icon ?? ''
  return new AppSubMenu(name!, icon, parsedMenuItems)
}

function parseMenuItem(doc: YamlAppMenuItemType, xpath: string): AppMenuItem {
  const name = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)

  const view = doc.view ?? ''
  const icon = doc.icon ?? ''
  return new AppMenuItem(name!, view, icon)
}

export { parseApp }
