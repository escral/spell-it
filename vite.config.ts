import { resolve } from 'path'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import ViteSvgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'

export default () => {
    const entries = [
        './public/index.html',
    ]

    return defineConfig({
        root: './public',

        build: {
            assetsDir: './build/assets',

            rollupOptions: {
                input: entries,
            },
        },

        optimizeDeps: {
            entries,
        },

        plugins: [
            ViteSvgLoader({
                defaultImport: "url",
            }),
            vue(),
            AutoImport({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.mjs?$/, // .mjs
                    /\.vue$/, /\.vue\?vue/, // .vue
                ],

                imports: [
                    'vue',
                    {
                        '@vueuse/core': [
                            'useDebounceFn',
                            'useCurrentElement',
                        ],
                    },
                ],

                dirs: [
                    '../src/composables',
                ],

                dts: '../auto-imports.d.ts',
            }),
        ].filter(Boolean) as Plugin[],

        resolve: {
            alias: {
                '~': resolve(__dirname, './src'),
            },
        },
    })
}
