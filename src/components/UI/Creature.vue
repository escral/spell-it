<script setup lang="ts">
    import type Creature from '~/lib/Models/Creature'
    import ProgressBar from "~/components/ProgressBar.vue"

    defineOptions({
        name: 'Creature',
    })

    const props = defineProps<{
        creature: Creature
        acting?: boolean
    }>()

    const commandStack = computed(() => props.creature.commandStack)
    const commandHistory = computed(() => props.creature.commandHistory)
    const lastCommandHistory = computed(() => commandHistory.value.slice(-10))
</script>

<template>
    <div class="flex flex-col gap-x-12">
        <div
            class="bg-blue-100 rounded-lg p-8 border-2"
            :class="acting ? 'border-blue-500' : ' border-blue-100'"
        >
            <div class="text-lg font-bold text-gray-600 mb-8">
                {{ creature.name }}
            </div>

            <div class="flex flex-col gap-4">
                <div class="w-full flex flex-col gap-1">
                    {{ creature.health }} / {{ creature.maxHealth }}
                    <ProgressBar color="bg-red-400" :progress="creature.health" :max="creature.maxHealth" />
                    {{ creature.mana }} / {{ creature.maxMana }}
                    <ProgressBar color="bg-blue-400" :progress="creature.mana" :max="creature.maxMana" />
                </div>

                <div class="grid grid-cols-3 gap-4 text-center">
                    <div :class="{ 'opacity-30': !creature.stats.strength }">
                        <i class="fa-solid fa-hand-fist" /> {{ creature.stats.strength }}
                    </div>
                    <div :class="{ 'opacity-30': !creature.stats.agility }">
                        <i class="fa-solid fa-hourglass" /> {{ creature.stats.agility }}
                    </div>
                    <div :class="{ 'opacity-30': !creature.stats.intelligence }">
                        <i class="fa-solid fa-book" /> {{ creature.stats.intelligence }}
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <div v-if="commandStack.length">
                <div class="text-gray-500 text-sm">
                    Casting:
                </div>
                <div>
                    {{ commandStack.join(' > ') }}
                </div>
            </div>

            <div v-if="lastCommandHistory.length" class="text-gray-500 text-xs">
                History:
                <div v-for="(command, $i) in lastCommandHistory" :key="$i" class="text-gray-400">
                    {{ command }}
                </div>
            </div>
        </div>
    </div>
</template>
