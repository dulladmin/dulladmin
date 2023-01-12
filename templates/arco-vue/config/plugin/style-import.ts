/**
 * Introduces component library styles on demand.
 *
 * https://github.com/anncwb/vite-plugin-style-import
 */
import styleImport from 'vite-plugin-style-import';

export default function configStyleImportPlugin() {
  const styleImportPlugin = styleImport({
    libs: [
      {
        libraryName: '@arco-design/web-vue',
        esModule: true,
        resolveStyle: (name) => {
          // The use of this part of the component must depend on the parent, so
          // it can be ignored directly.
          const ignoreList = [
            'config-provider',
            'anchor-link',
            'sub-menu',
            'menu-item',
            'menu-item-group',
            'breadcrumb-item',
            'form-item',
            'step',
            'card-grid',
            'card-meta',
            'collapse-panel',
            'collapse-item',
            'descriptions-item',
            'list-item',
            'list-item-meta',
            'table-column',
            'table-column-group',
            'tab-pane',
            'tab-content',
            'timeline-item',
            'tree-node',
            'skeleton-line',
            'skeleton-shape',
            'grid-item',
            'carousel-item',
            'doption',
            'option',
            'optgroup',
            'icon',
          ];
          // List of components that need to map imported styles.
          const replaceList = {
            'typography-text': 'typography',
            'typography-title': 'typography',
            'typography-paragraph': 'typography',
            'typography-link': 'typography',
            'dropdown-button': 'dropdown',
            'input-password': 'input',
            'input-search': 'input',
            'input-group': 'input',
            'radio-group': 'radio',
            'checkbox-group': 'checkbox',
            'layout-sider': 'layout',
            'layout-content': 'layout',
            'layout-footer': 'layout',
            'layout-header': 'layout',
            'month-picker': 'date-picker',
            'range-picker': 'date-picker',
            'row': 'grid',
            'col': 'grid',
            'avatar-group': 'avatar',
            'image-preview': 'image',
            'image-preview-group': 'image',
            'cascader-panel': 'cascader',
          };
          if (ignoreList.includes(name)) return '';
          // eslint-disable-next-line no-prototype-builtins
          return replaceList.hasOwnProperty(name)
            ? `@arco-design/web-vue/es/${replaceList[name]}/style/css.js`
            : `@arco-design/web-vue/es/${name}/style/css.js`;
        },
      },
    ],
  });
  return styleImportPlugin;
}
