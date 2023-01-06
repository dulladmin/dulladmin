import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

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
