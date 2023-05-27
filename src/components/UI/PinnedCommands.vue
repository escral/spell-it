<script setup lang="ts">
    import { commands } from "~/dictionaries/commands"

    defineOptions({
        name: 'PinnedCommands',
    })
</script>

<template>
    <div>
        <div class="font-bold text-xs mb-1">
            {{ $__('Commands') }}
        </div>

        <div class="flex flex-col gap-1">
            <div v-for="(command, $i) in commands" :key="$i" class="bg-gray-200 px-2 py-1 rounded">
                <div class="font-bold leading-none">
                    {{ command.actName }}
                </div>
                <div class="text-gray-500 text-xs">
                    {{ command.description }}
                </div>
            </div>
        </div>
    </div>
</template>
