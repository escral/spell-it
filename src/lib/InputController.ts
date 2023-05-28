import type BattleState from "~/lib/BattleState"
import { Mode } from "~/lib/BattleState"
import { commands } from "~/dictionaries/commands"
import Command, { CommandCategory } from "~/lib/Command/Command"
import type Creature from "~/lib/Models/Creature"

enum ModeKey {
    Casting = 'c',
}

export default class InputController {
    public currentCommand = ref('')

    constructor(private battle: BattleState) {
        battle.eventBus.on('changeMode', (mode) => {
            this.currentCommand.value = ''

            if (mode === Mode.Paused) {
                this.battle.time.pause()
            } else {
                this.battle.time.resume()
            }
        })
    }

    public register() {
        window.addEventListener("keydown", this.handleInput.bind(this))
    }

    public unregister() {
        window.removeEventListener("keydown", this.handleInput.bind(this))
    }

    private handleInput(e: KeyboardEvent) {
        const mode = this.battle.mode

        const prevent = () => {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
        }

        if (e.key === ModeKey.Casting && mode === Mode.Normal) {
            this.battle.changeMode(Mode.Casting)

            prevent()
        }

        if (e.key === "Escape" || e.key === "CapsLock") {
            this.battle.changeMode(Mode.Normal)

            prevent()
        }

        if (e.key === "Enter" && mode === Mode.Casting) {
            this.tryCast(this.battle.player)
        }

        if (e.key === 'p' && mode !== Mode.Casting) {
            if (this.battle.mode === Mode.Paused) {
                this.battle.changeMode(Mode.Normal)
            } else {
                this.battle.changeMode(Mode.Paused)
            }
        }

        if (mode === Mode.Casting && e.code.startsWith('Key')) {
            this.currentCommand.value += e.key

            prevent()
        }
    }

    public cast(command: Command, actor: Creature) {
        const location = this.battle.location

        if (!command.canUse(actor, location)) {
            command.onFail(actor, location)

            throw new Error('Command cannot be used')
        }

        command.beforeAct(actor, location)
        command.act(actor, location)
        command.afterAct(actor, location)

        command.onSuccess(actor, location)

        if (actor.commandStack.length > 0) {
            actor.commandStack.push(command.actName)
            actor.commandHistory.push(actor.commandStack.join(' > '))

            actor.commandStack.forEach((name) => {
                const found = commands.find((c) => c.actName === name)

                found?.dispose(actor, location)
            })

            actor.commandStack = []
        } else if (command.category === CommandCategory.Support) {
            actor.commandStack.push(command.actName)
        } else {
            actor.commandHistory.push(command.actName)
        }
    }

    public resetCommand() {
        this.currentCommand.value = ''
    }

    public tryCast(actor: Creature) {
        const query = this.currentCommand.value

        const found = commands.find((c) => c.actName === query)

        if (!found) {
            console.log("Command not found")

            this.resetCommand()

            return
        }

        try {
            this.cast(found, actor)
        } catch (e) {
            //
        }

        this.resetCommand()
    }
}
