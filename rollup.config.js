import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

export default [
  // ESM build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/ngatecore.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
      terser()
    ]
  },
  // UMD build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/ngatecore.umd.js',
      format: 'umd',
      name: 'NGateCore',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
      terser()
    ]
  }
];
