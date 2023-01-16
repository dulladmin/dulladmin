import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'es'
      }
    ],
    plugins: [resolve(), typescript()],
    watch: {
      include: 'src/**'
    }
  },
  {
    external: ['chalk', 'child-process-promise', 'cosmiconfig', 'fs-extra', 'lodash.merge', 'yargs'],
    input: 'src/cli/index.ts',
    output: [
      {
        file: 'dist/cli.js',
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
            src: [
              'templates/arco-vue/*',
              'templates/arco-vue/.*',
              '!templates/arco-vue/node_modules',
              '!templates/arco-vue/dist',
              '!templates/arco-vue/dist-ssr',

              // The 'rollup-plugin-copy' will not ignore files in subdirectories,
              // use 'rollup-plugin-delete' to delete them later.
              '!templates/arco-vue/.env',
              '!templates/arco-vue/.DS_Store',
              '!templates/arco-vue/yarn-error.log'
            ],
            dest: 'dist/templates/arco-vue'
          }
        ]
      }),
      del({
        targets: ['**/.DS_Store', '**/yarn-error.log']
      })
    ]
  }
]
