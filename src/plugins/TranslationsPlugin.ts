import type { App } from 'vue'

import '~/plugins/TranslationsPlugin'

const translate = (text: string, replacements?: AnyObject) => text

export default {
    install(app: App) {
        // Options API
        app.config.globalProperties.$__ = translate

        // Composition API
        app.provide('$__', translate)
    },
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $__: typeof translate,
    }
}
