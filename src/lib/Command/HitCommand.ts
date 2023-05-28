import Command, { CommandCategory, Signature } from '~/lib/Command/Command'
import type Creature from '~/lib/Models/Creature'
import type BattleState from '~/lib/BattleState'
import Formatter, { EntityType } from '~/lib/Formatter'

export default class HitCommand extends Command {
    public readonly originalName = 'hit'

    public readonly title = 'Hit'
    public readonly description = 'Hit the enemy with your weapon.'

    public readonly signature = [
        Signature.Command,
        Signature.Target,
    ]

    public readonly category = CommandCategory.Attack

    public act(actor: Creature, battle: BattleState) {
        const target = battle.location.creatures.find(creature => creature !== actor)

        if (!target) {
            return
        }

        const damage = actor.dealDamage(target)

        battle.log.record(`:actor hit :target for :damage damage.`, {
            actor,
            target,
            damage: Formatter.damage(damage),
        })
    }
}
