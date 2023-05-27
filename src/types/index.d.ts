global {
    type AnyObject = {
        [field: string | number]: any
    }

    declare module '@vue/runtime-core' {
        interface ComponentCustomProperties {
            $__: (text: string) => text
        }
    }
}

declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const component: ComponentOptions
    export default component
}
