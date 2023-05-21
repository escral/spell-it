<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import InputField from "~/components/InputField.svelte";
    import CreatureComponent from "~/components/Creature.svelte";
    import Player from "~/lib/Models/Player";
    import { commands } from '~/lib/commands'
    import Location from '~/lib/Location'
    import { CommandCategory } from '~/lib/Command/Command'

    let playerOne = new Player('Escral');
    let playerTwo = new Player('Goblin');

    let location = new Location()

    location.addCreature(playerOne)
    location.addCreature(playerTwo)

    let command = "";

    let actor = playerOne;

    const cast = (query: string) => {
        const found = commands.find((c) => c.actName === query);

        if (!found) {
            console.log("Command not found");

            command = "";

            return;
        }

        if (!found.canUse(actor, location)) {
            console.log("Command cannot be used");

            found.onFail(actor, location)

            command = "";

            return;
        }

        found.beforeAct(actor, location);
        found.act(actor, location);
        found.afterAct(actor, location);

        found.onSuccess(actor, location)

        playerOne = playerOne
        playerTwo = playerTwo

        if (actor.commandStack.length > 0) {
            actor.commandStack.push(command)
            actor.commandHistory.push(actor.commandStack.join(' > '))

            actor.commandStack.forEach((command) => {
                const found = commands.find((c) => c.actName === command);
                found.dispose(actor, location);
            })

            actor.commandStack = []
        } else if (found.category === CommandCategory.Support) {
            actor.commandStack.push(command);
        } else {
            actor.commandHistory.push(command)
        }

        actor = actor === playerOne ? playerTwo : playerOne;

        command = "";

        changeMode(Mode.Normal);
    };

    enum Mode {
        Normal = "Normal",
        Casting = "Casting",
    }

    let mode = Mode.Normal;

    let input: SvelteComponent;

    const changeMode = (newMode: Mode) => {
        mode = newMode;

        command = "";

        if (mode === Mode.Casting) {
            input.focus();
        }
    };

    const onkeydown = (e: KeyboardEvent) => {
        if (e.key === "c" && mode === Mode.Normal) {
            changeMode(Mode.Casting);

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }

        if (e.key === "Escape") {
            changeMode(Mode.Normal);
        }
    };
</script>

<svelte:window on:keydown={onkeydown}/>

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

        <br/>

        <form
            class="fixed bottom-12 w-[40rem] left-1/2 -translate-x-1/2 flex flex-col gap-2"
            on:submit|preventDefault={() => cast(command)}
        >
            <div class="text-center text-xl">
                {#if command.length}
                    «{command}»
                {/if}
            </div>

            <InputField class="w-full" bind:this={input} bind:command/>

            <div
                class="bg-gray-500 text-white mx-auto w-fit leading-none py-1.5 px-3 rounded text-sm"
                class:bg-blue-400={mode === Mode.Casting}
            >
                {mode}
            </div>
        </form>
    </div>
</main>
