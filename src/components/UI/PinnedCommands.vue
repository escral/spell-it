<script setup lang="ts">
    import { commands } from "~/dictionaries/commands"
    import { Signature } from "~/lib/Command/Command"

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
                <div class="font-bold flex items-center gap-x-1">
                    <template v-for="(signature, $j) in command.signature" :key="$j">
                        <template v-if="signature === Signature.Target">
                            <div
                                v-tooltip="{ content: $__('Any target in current location<br>me | self | 1 | 2 | ...') }"
                                class="text-gray-500 bg-gray-300 rounded px-1.5"
                            >
                                {{ signature }}
                            </div>
                        </template>
                        <template v-else-if="signature === Signature.Command">
                            <div>{{ command.actName }}</div>
                        </template>
                        <template v-else>
                            <div class="text-gray-500">
                                {{ signature }}
                            </div>
                        </template>
                    </template>
                </div>
                <div class="text-gray-500 text-xs">
                    {{ command.description }}
                </div>
            </div>
        </div>
    </div>
</template>
