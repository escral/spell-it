import Creature from '~/lib/Models/Creature'
import type Location from '~/lib/Location'

export enum CommandCategory {
    Attack,
    Support,
}

export default abstract class Command {
    public abstract readonly originalName: string

    public abstract readonly category: CommandCategory

    public abstract readonly title: string
    public readonly description: string | undefined

    public get actName() {
        return this.originalName
    }

    public canUse(actor: Creature, location: Location) {
        return true
    }

    public beforeAct(actor: Creature, location: Location) {
        //
    }

    public act(actor: Creature, location: Location) {
        //
    }

    public afterAct(actor: Creature, location: Location) {
        //
    }

    public onFail(actor: Creature, location: Location) {
        //
    }

    public onSuccess(actor: Creature, location: Location) {
        //
    }

    public dispose(actor: Creature, location: Location) {
        //
    }
}
