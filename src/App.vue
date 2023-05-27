<template>
    <Component :is="viewComponent" />
</template>

<script setup lang="ts">
    import BattleView from "~/views/BattleView.vue"

    const views = {
        'battle': BattleView,
    }

    const view = ref<keyof typeof views>('battle')

    const viewComponent = computed(() => views[view.value])
</script>
