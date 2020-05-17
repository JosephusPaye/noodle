import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  resolve({
    preferBuiltins: false,
    browser: true,
  }),
  commonjs(),
  vue(),
];

export default [
  {
    input: 'src/background.js',
    output: {
      name: 'noodle',
      format: 'iife',
      file: 'dist/js/background.js',
      plugins: isProduction ? [terser()] : [],
    },
    plugins,
  },
  {
    input: 'src/popup.js',
    output: {
      name: 'noodle',
      format: 'iife',
      file: 'dist/js/popup.js',
      plugins: isProduction ? [terser()] : [],
    },
    plugins,
  },
  {
    input: 'src/demo.js',
    output: {
      name: 'noodle',
      format: 'iife',
      file: 'dist/js/demo.js',
      plugins: isProduction ? [terser()] : [],
    },
    plugins,
  },
  {
    input: 'src/content.js',
    output: {
      name: 'noodle',
      format: 'iife',
      file: 'dist/js/content.js',
      plugins: isProduction ? [terser()] : [],
    },
    plugins,
  },
];
