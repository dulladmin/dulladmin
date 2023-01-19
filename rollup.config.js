import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'

export default [
  {
    external: ['chalk', 'cosmiconfig', 'fs-extra', 'globby', 'handlebars', 'js-yaml', 'lodash.merge', 'yargs'],
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'es'
      }
    ],
    plugins: [
      resolve(),
      typescript(),
      commonjs(),
      copy({
        targets: [
          {
            // Templates
            src: [
              'templates/arco-vue/*',
              'templates/arco-vue/.*',
              '!templates/arco-vue/node_modules',
              '!templates/arco-vue/dist',
              '!templates/arco-vue/dist-ssr',
              '!templates/arco-vue/.env',
              '!templates/arco-vue/.DS_Store',
              '!templates/arco-vue/yarn-error.log'
            ],
            dest: 'dist/templates/arco-vue'
          },
          {
            // Generators
            src: 'generators/arco-vue/*',
            dest: 'dist/generators/arco-vue'
          }
        ]
      }),
      del({
        // The 'rollup-plugin-copy' will not ignore files in subdirectories,
        // use 'rollup-plugin-delete' to delete them later.
        targets: ['**/.DS_Store', '**/yarn-error.log']
      })
    ]
  }
]
