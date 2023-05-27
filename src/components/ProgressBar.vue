<template>
    <div class="w-full text-sm">
        <div class="w-full bg-gray-300 rounded font-normal">
            <div
                class="rounded text-xs leading-none pt-1 text-center text-white whitespace-no-wrap"
                :style="{width: percent + '%'}"
                :class="color"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        progress: number,
        max?: number,
        color?: string,
    }>(), {
        max: undefined,
        color: 'bg-blue-400',
    })

    const percent = computed(() => {
        if (props.max) {
            return props.progress / props.max * 100
        }

        return props.progress * 100
    })
</script>
