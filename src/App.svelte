<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import InputField from "~/lib/InputField.svelte";
    import Player from "~/lib/Components/Player.svelte";
    import PlayerClass from "~/lib/Models/Player";
    import type Creature from "./lib/Models/Creature";

    let playerOne = new PlayerClass();
    let playerTwo = new PlayerClass();

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

<svelte:window on:keydown={onkeydown} />

<main>
    <div>
        <div style="display: flex; justify-content: center; gap: 2rem">
            <div>
                1:
                <Player player={playerOne} />

                {commandStack.join(' > ')}

                <div style="color: #555; font-size: 13px">
                    History:
                    {commandHistory.join(', ')}
                </div>
            </div>
            <div>
                2:
                <Player player={playerTwo} />
            </div>
        </div>

        <br />

        <h1>Mode: {mode}</h1>
        <h2>"{command}"</h2>
        <form on:submit|preventDefault={cast}>
            <InputField bind:this={input} bind:command />
        </form>
    </div>
</main>
