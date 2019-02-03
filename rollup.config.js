import RollupPluginVue from 'rollup-plugin-vue'
import RollupPluginBabel from 'rollup-plugin-babel'
import RollupPluginCJS from 'rollup-plugin-commonjs'

export default {
    input: 'src-js/index.js',
    output: {
        file: 'dist-js/index.js',
        format: 'cjs',
    },
    external: [
        'vue',
        'lodash',
        'axios',
    ],
    plugins: [
        RollupPluginVue(),
        RollupPluginBabel(),
        RollupPluginCJS(),
    ],
}
