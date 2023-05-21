<script lang="ts">
    import type Creature from '~/lib/Models/Creature'
    import ProgressBar from '~/components/ProgressBar.svelte'

    export let creature: Creature
    export let acting = false

    let lastCommandHistory
    $: lastCommandHistory = commandHistory.slice(-10)

    let commandStack
    $: commandStack = creature?.commandStack

    let commandHistory
    $: commandHistory = creature?.commandHistory
</script>

<div class={($$restProps['class'] ?? '') + ' flex gap-x-12'}>
    <div class={'bg-blue-100 rounded-lg p-8 w-80 border-2 rounded ' + (acting ? 'border-blue-500' : ' border-blue-100')}>
        <div class="text-lg font-bold text-gray-600 mb-8">{creature.name}</div>

        <div class="flex flex-col gap-4">
            <div class="w-full flex flex-col gap-1">
                <ProgressBar color="bg-red-400" value={creature.health} maxValue={creature.maxHealth}/>
                <ProgressBar color="bg-blue-500" value={creature.mana} maxValue={creature.maxMana}/>
            </div>

            <div>
                <div>
                    Strength: {creature.stats.strength}
                </div>
                <div>
                    Agility: {creature.stats.agility}
                </div>
                <div>
                    Intelligence: {creature.stats.intelligence}
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-4">
        {#if commandStack.length}
            <div>
                <div class="text-gray-500 text-sm">Casting:</div>
                <div>
                    {commandStack.join(' > ')}
                </div>
            </div>
        {/if}

        {#if lastCommandHistory.length}
            <div class="text-gray-500 text-xs">
                History:
                {#each lastCommandHistory as command}
                    <div class="text-gray-400">{command}</div>
                {/each}
            </div>
        {/if}
    </div>
</div>
