class AppMenuItem {
  name: string
  view: string
  icon: string

  constructor(name: string, view: string, icon: string) {
    this.name = name
    this.view = view
    this.icon = icon
  }
}

class AppSubMenu {
  name: string
  icon: string
  items: AppMenuItem[]

  constructor(name: string, icon: string, items: AppMenuItem[]) {
    this.name = name
    this.icon = icon
    this.items = items
  }
}

class AppMenu {
  items: Array<AppMenuItem | AppSubMenu>

  constructor(items: Array<AppMenuItem | AppSubMenu>) {
    this.items = items
  }
}

export { AppMenuItem, AppSubMenu, AppMenu }
export default AppMenu
