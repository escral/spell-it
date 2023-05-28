import type Creature from '~/lib/Models/Creature'
import type BattleState from '~/lib/BattleState'

export enum CommandCategory {
    Attack,
    Support,
}

export enum Signature {
    Command = 'command',
    Target = 'target',
    Name = 'name',
}

export default abstract class Command {
    public abstract readonly originalName: string

    public abstract readonly category: CommandCategory

    public abstract readonly title: string
    public readonly description: string | undefined
    public readonly signature: Signature[] = [Signature.Command]

    public get actName() {
        return this.originalName
    }

    public canUse(actor: Creature, battle: BattleState) {
        return true
    }

    public beforeAct(actor: Creature, battle: BattleState) {
        //
    }

    public act(actor: Creature, battle: BattleState) {
        //
    }

    public afterAct(actor: Creature, battle: BattleState) {
        //
    }

    public onFail(actor: Creature, battle: BattleState) {
        //
    }

    public onSuccess(actor: Creature, battle: BattleState) {
        //
    }

    public dispose(actor: Creature, battle: BattleState) {
        //
    }
}
