<script setup lang="ts">
    import type { ComponentOptions } from "vue"

    withDefaults(defineProps<{
        tag?: string | ComponentOptions,
        icon: string | [string] | AnyObject
    }>(), {
        tag: 'i',
    })
</script>

<script lang="ts">
    export default {
        render() {
            return h(this.tag, {
                class: this.icon,
            })
        },
    }
</script>

