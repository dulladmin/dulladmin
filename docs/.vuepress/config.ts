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
        selectLanguageAriaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        notFound: ['这里什么都没有', '我们怎么到这来了？', '这是一个 404 页面', '看起来我们进入了错误的链接'],
        backToHome: '返回首页',
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏'
      }
    }
  })
})
