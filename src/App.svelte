<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import InputField from "~/lib/InputField.svelte";
    import CreatureComponent from "~/components/Creature.svelte";
    import Player from "~/lib/Models/Player";
    import type Creature from "./lib/Models/Creature";

    let playerOne = new Player('Escral');
    let playerTwo = new Player('Goblin');

    let command = "";

    let commandStack = []
    let commandHistory = []

    const commands = [
        {
            name: 'charge',
            support: true,
            action: (actor: Creature) => {
                actor.stats.strength += 1;
            },
        },
        {
            name: "hit",
            support: false,
            action: (actor: Creature) => {
                playerTwo.health -= actor.stats.strength;
            },
        },
    ];

    let actor = playerOne;

    const cast = () => {
        const found = commands.find((c) => c.name === command);

        if (!found) {
            console.log("Command not found");

            command = "";

            return;
        }

        found.action(actor);

        if (commandStack.length > 0) {
            commandStack.push(command)
            commandHistory.push(commandStack.join(' > '))
            commandStack = []
        } else if (found.support) {
            commandStack.push(command);
            commandStack = commandStack
        } else {
            commandHistory.push(command)
        }

        commandHistory = commandHistory

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
                <CreatureComponent {commandHistory} {commandStack} creature={playerOne}/>
            </div>

            <div>
                <CreatureComponent class="flex-row-reverse" {commandHistory} {commandStack} creature={playerTwo}/>
            </div>
        </div>

        <br/>

        <form
            class="fixed bottom-12 w-[40rem] left-1/2 -translate-x-1/2 flex flex-col gap-2"
            on:submit|preventDefault={cast}
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
