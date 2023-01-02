import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

import { version } from './package.json'
const banner = `/*\nDullAdmin ${version}\n*/`

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'DullAdmin',
        file: 'dist/index.umd.js',
        format: 'umd',
        banner
      },
      {
        file: 'dist/index.js',
        format: 'es',
        banner
      }
    ],
    plugins: [resolve(), typescript()],
    watch: {
      include: 'src/**'
    }
  },
  {
    input: 'src/cli.ts',
    output: [
      {
        file: 'dist/cli.js',
        format: 'cjs'
      }
    ],
    plugins: [resolve(), typescript()]
  }
]
