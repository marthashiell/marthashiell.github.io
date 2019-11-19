import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'components/index-app.js',
  output: {
    file: 'index.js',
    format: 'esm'
  },
  plugins: [
    babel({
      plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]]
    }),
    resolve(),
    process.env.PROD && terser(),
    !process.env.PROD && serve({contentBase:'', port: 8000})
  ]
}
