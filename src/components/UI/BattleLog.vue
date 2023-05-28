<script setup lang="ts">
    import type BattleLog from "~/lib/BattleLog"

    defineOptions({
        name: 'BattleLog',
    })

    const props = defineProps<{
        log: BattleLog
    }>()

    const reversedLog = computed(() => props.log.records.slice().reverse())

    const pad = (n: number) => n.toString().padStart(2, '0')

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp)

        return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    }
</script>

<template>
    <div class="border-2 bg-white px-4 py-2 h-64 overflow-y-auto rounded">
        <div v-for="(record, $i) in reversedLog" :key="$i">
            <span class="font-mono text-xs text-gray-400 mr-2">{{ formatTime(record.time) }}</span>
            <span v-html="log.formatRecord(record)" />
        </div>
    </div>
</template>
