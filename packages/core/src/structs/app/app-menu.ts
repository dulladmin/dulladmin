enum AppMenuItemType {
  Item = 'item',
  SubMenu = 'sub_menu'
}

class AppMenuItem {
  type: AppMenuItemType
  name: string
  icon: string
  resource: string
  view: string

  constructor(name: string, icon: string, resource: string, view: string) {
    this.name = name
    this.icon = icon
    this.resource = resource
    this.view = view
    this.type = AppMenuItemType.Item
  }
}

class AppSubMenu {
  type: AppMenuItemType
  name: string
  icon: string
  items: AppMenuItem[]

  constructor(name: string, icon: string, items: AppMenuItem[]) {
    this.name = name
    this.icon = icon
    this.items = items
    this.type = AppMenuItemType.SubMenu
  }
}

class AppMenu {
  items: Array<AppMenuItem | AppSubMenu>

  constructor(items: Array<AppMenuItem | AppSubMenu>) {
    this.items = items
  }
}

export { AppMenuItemType, AppMenuItem, AppSubMenu, AppMenu }
export default AppMenu
