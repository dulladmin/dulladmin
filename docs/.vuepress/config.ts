import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'
import { navbarEn, navbarZh, sidebarEn, sidebarZh } from './configs'

export default defineUserConfig({
  base: '/dulladmin/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'DullAdmin',
      description: 'A SPECIFICATION FOR BUILDING ADMIN PANEL'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'DullAdmin',
      description: '快速构建后台管理系统的规范'
    }
  },
  theme: defaultTheme({
    locales: {
      '/': {
        navbar: navbarEn,
        sidebar: sidebarEn,
        selectLanguageName: 'English'
      },
      '/zh/': {
        navbar: navbarZh,
        sidebar: sidebarZh,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言'
      }
    }
  })
})
