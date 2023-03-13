import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
  '/guide/': [
    {
      text: 'Guide',
      collapsible: true,
      children: ['/guide/README.md', '/guide/getting-started.md', '/guide/resource-file.md', '/guide/app-file.md']
    },
    {
      text: 'Specification',
      collapsible: true,
      children: [
        '/guide/specification/resource.md',
        '/guide/specification/view.md',
        '/guide/specification/block.md',
        '/guide/specification/block-table.md',
        '/guide/specification/block-descriptions.md',
        '/guide/specification/block-form.md',
        '/guide/specification/block-echarts.md',
        '/guide/specification/block-custom.md',
        '/guide/specification/type.md',
        '/guide/specification/auth.md'
      ]
    },
    {
      text: 'ClientGenerator (Arco)',
      collapsible: true,
      children: [
        '/guide/generator-arco-vue/directory.md',
        '/guide/generator-arco-vue/config.md',
        '/guide/generator-arco-vue/mock.md'
      ]
    }
  ]
}
