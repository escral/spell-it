export declare global {
    type AnyObject = {
        [field: string | number]: any
    }

    declare module '*.vue' {
        import { ComponentOptions } from 'vue'
        const component: ComponentOptions
        export default component
    }
}
