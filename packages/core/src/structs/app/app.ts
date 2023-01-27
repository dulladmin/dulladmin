import { AppMenu } from './app-menu'

class App {
  menu?: AppMenu

  constructor(menu?: AppMenu) {
    this.menu = menu
  }
}

export { App }
export default App
