<script lang="ts">
    import type Creature from '~/lib/Models/Creature'
    import ProgressBar from '~/components/ProgressBar.svelte'

    export let creature: Creature
    export let commandStack: string[] = []
    export let commandHistory: string[] = []

    $: lastCommandHistory = commandHistory.slice(-5)
</script>

<div class={($$restProps['class'] ?? '') + ' flex gap-x-12'}>
    <div class="bg-blue-100 rounded-lg p-8 w-80">
        <div class="text-lg font-bold text-gray-600 mb-8">{creature.name}</div>

        <div class="flex gap-4">
            <div class="w-full flex flex-col gap-1">
                <ProgressBar color="bg-red-400" value={creature.health} maxValue={creature.maxHealth}/>
                <ProgressBar color="bg-blue-500" value={creature.mana} maxValue={creature.maxMana}/>
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
