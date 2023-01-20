import { readFileSync } from 'node:fs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

export default [
  {
    external: Object.keys(pkg.dependencies || {}),
    input: 'src/index.ts',
    output: [{ file: 'dist/index.js', format: 'es' }],
    plugins: [resolve(), typescript()]
  }
]
