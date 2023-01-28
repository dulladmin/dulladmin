import { AppMenu } from './app-menu'

class App {
  menu: AppMenu | null

  constructor(menu: AppMenu | null) {
    this.menu = menu
  }
}

export { App }
export default App
