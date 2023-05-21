import Command, { CommandCategory } from '~/lib/Command/Command'
import type Creature from '~/lib/Models/Creature'
import type Location from '~/lib/Location'

export default class HitCommand extends Command {
    public readonly originalName = 'hit'

    public readonly title = 'Hit'
    public readonly description = 'Hit the enemy with your weapon.'

    public readonly category = CommandCategory.Attack

    public act(actor: Creature, location: Location) {
        const target = location.creatures.find(creature => creature !== actor)

        if (!target) {
            return
        }

        const damage = actor.dealDamage(target)

        console.log(`${actor.name} hit ${target.name} for ${damage} damage.`)
    }
}
