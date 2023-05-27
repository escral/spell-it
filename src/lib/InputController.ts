import type BattleState from "~/lib/BattleState"
import { Mode } from "~/lib/BattleState"
import { commands } from "~/lib/commands"
import Command, { CommandCategory } from "~/lib/Command/Command"
import type Creature from "~/lib/Models/Creature"

export default class InputController {
    public currentCommand = ""

    constructor(private battleState: BattleState) {
        //
    }

    public handleInput(e: KeyboardEvent) {
        const mode = this.battleState.mode

        if (e.key === "c" && mode === Mode.Normal) {
            this.battleState.changeMode(Mode.Casting)

            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
        }

        if (e.key === "Escape") {
            this.battleState.changeMode(Mode.Normal)
        }
    }

    public cast(command: Command, actor: Creature) {
        const location = this.battleState.location

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

    public tryCast(query: string, actor: Creature) {
        const found = commands.find((c) => c.actName === query)

        if (!found) {
            console.log("Command not found")

            this.currentCommand = ""

            return
        }

        try {
            this.cast(found, actor)
        } catch (e) {
            this.currentCommand = ""
        }

        this.currentCommand = ""

        this.battleState.changeMode(Mode.Normal)
    }
}
