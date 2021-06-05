import typescript from '@rollup/plugin-typescript'
import { babel as pluginBabel } from '@rollup/plugin-babel'
import { terser as pluginTerser } from 'rollup-plugin-terser'

export default [
  {
    input: './src/ts/jmq.ts',
    output: [
      {
        name: '$media',
        file: './dist/js-media-query.js',
        format: 'iife',
        sourcemap: 'inline',
      },
      {
        name: '$media',
        file: './dist/js-media-query.min.js',
        format: 'iife',
        plugins: [
          pluginTerser()
        ]
      },
    ],
    plugins: [
      typescript(),
      pluginBabel({
        extensions: ['.js', '.ts'],
        babelHelpers: 'bundled',
      }),
    ]
  },
]
