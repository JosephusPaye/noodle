import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import { string } from 'rollup-plugin-string';

export default {
  input: 'index.js',
  output: {
    name: 'noodle',
    format: 'umd',
    file: 'dist/noodle.js',
    plugins: [terser()],
  },
  plugins: [
    string({
      include: '**/*.css',
    }),
    resolve({
      preferBuiltins: false,
    }),
    commonjs(),
    json(),
    vue(),
  ],
};
