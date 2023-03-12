import { App, AppMenu, AppSubMenu, AppMenuItem } from '../../structs'
import { assertFieldNames, assertNotNull, assertIsArray, assertIsString, assertIsIdentifier } from '../assert'
import { YamlAppType, YamlAppMenuType, YamlAppSubMenuType, YamlAppMenuItemType } from './loader'

function parseApp(doc: YamlAppType): App {
  if (doc == null) doc = {}

  const allowedFiledNames = ['menu']
  assertFieldNames(doc, allowedFiledNames, '/')

  const parsedMenu = doc?.menu != null ? parseMenu(doc.menu) : null
  return new App(parsedMenu)
}

function parseMenu(doc: YamlAppMenuType): AppMenu {
  const allowedFiledNames = ['items']
  assertFieldNames(doc, allowedFiledNames, '/menu')

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
  const allowedFiledNames = ['name', 'icon', 'items']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const name = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)
  assertIsIdentifier(name, nameXPath)

  const menuItems = doc.items
  const menuItemsXPath = xpath + '/items'
  assertNotNull(menuItems, menuItemsXPath)
  assertIsArray(menuItems, menuItemsXPath)
  const parsedMenuItems = menuItems!.map((item, idx) => parseMenuItem(item, menuItemsXPath + `[${idx}]`))

  const icon = doc.icon ?? ''
  return new AppSubMenu(name!, icon, parsedMenuItems)
}

function parseMenuItem(doc: YamlAppMenuItemType, xpath: string): AppMenuItem {
  const allowedFiledNames = ['name', 'icon', 'view']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const name = doc.name
  const nameXPath = xpath + '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)
  assertIsIdentifier(name, nameXPath)

  const viewUri = doc.view
  const viewUriXPath = xpath + '/view'
  assertNotNull(viewUri, viewUriXPath)
  assertIsString(viewUri, viewUriXPath)

  const icon = doc.icon ?? ''
  const [resource, view] = viewUri!.split('#')
  return new AppMenuItem(name!, icon, resource, view ?? '')
}

export { parseApp }
