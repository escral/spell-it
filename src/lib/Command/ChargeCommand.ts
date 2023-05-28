import Command, { CommandCategory } from '~/lib/Command/Command'
import type Creature from '~/lib/Models/Creature'
import type BattleState from '~/lib/BattleState'
import Formatter, { EntityType } from '~/lib/Formatter'

export default class ChargeCommand extends Command {
    public readonly originalName = 'charge'

    public readonly title = 'Charge'
    public readonly description = 'Get temporary strength. Will be exhausted after attack.'

    public readonly category = CommandCategory.Support

    private power = 1

    public act(actor: Creature, battle: BattleState) {
        const stat = 'strength'

        const power = actor.gainStat(stat, this.power)

        battle.log.record(':actor gained :power :stat', {
            actor,
            power: Formatter.value(power, EntityType.StatStrength),
            stat,
        })
    }

    public dispose(actor: Creature, battle: BattleState) {
        const stat = 'strength'

        const power = actor.loseStat(stat, this.power)

        battle.log.record(':actor lost :power :stat', {
            actor,
            power: Formatter.value(-power, EntityType.StatStrength),
            stat,
        })
    }
}
