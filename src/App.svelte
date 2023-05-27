<script lang="ts">
    import type { SvelteComponent } from "svelte"
    import InputField from "~/components/InputField.svelte"
    import CreatureComponent from "~/components/Creature.svelte"
    import Player from "~/lib/Models/Player"
    import BattleState, { Mode } from '~/lib/BattleState'
    import ForestLocation from '~/lib/ForestLocation'
    import InputController from '~/lib/InputController'

    const battle = new BattleState({
        location: new ForestLocation(),
    })

    const inputController = new InputController(battle)

    const playerOne = new Player('Escral')
    const playerTwo = new Player('Goblin')

    battle.location.addCreature(playerOne)

    const command = ""

    const actor = playerOne

    $: mode = battle.mode

    let input: SvelteComponent

    const tryCast = () => inputController.tryCast(command, playerOne)
</script>

<svelte:window on:keydown={battle.handleInput}/>

<main>
    <div class="p-12">
        <div class="flex items-center justify-between">
            <div>
                <CreatureComponent acting={actor === playerOne} creature={playerOne}/>
            </div>

            <div>
                <CreatureComponent class="flex-row-reverse" acting={actor === playerTwo} creature={playerTwo}/>
            </div>
        </div>

        <br />

        <form
            class="fixed bottom-12 w-[40rem] left-1/2 -translate-x-1/2 flex flex-col gap-2"
            on:submit|preventDefault={tryCast}
        >
            <div class="text-center text-xl">
                {#if inputController.currentCommand.length}
                    «{inputController.currentCommand}»
                {/if}
            </div>

            <InputField class="w-full" bind:this={input} bind:command={inputController.currentCommand} />

            <div
                class="bg-gray-500 text-white mx-auto w-fit leading-none py-1.5 px-3 rounded text-sm"
                class:bg-blue-400={mode === Mode.Casting}
            >
                {mode}
            </div>
        </form>
    </div>
</main>
