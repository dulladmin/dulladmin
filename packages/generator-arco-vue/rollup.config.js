import { readFileSync } from 'node:fs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

export default [
  {
    external: Object.keys(pkg.dependencies || {}),
    input: 'src/index.ts',
    output: [{ file: 'dist/index.js', format: 'es' }],
    plugins: [
      resolve(),
      typescript(),
      copy({
        targets: [
          {
            src: [
              'skeletal/*',
              'skeletal/.*',
              '!skeletal/node_modules',
              '!skeletal/dist',
              '!skeletal/dist-ssr',
              '!skeletal/.env.*',
              '!skeletal/.DS_Store',
              '!skeletal/yarn-error.log',
              '!skeletal/components.d.ts'
            ],
            dest: 'dist/skeletal'
          },
          {
            src: 'generators/*',
            dest: 'dist/generators'
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
