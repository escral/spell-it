import Command, { CommandCategory } from '~/lib/Command/Command'
import type Creature from '~/lib/Models/Creature'
import type Location from '~/lib/Location'

export default class ChargeCommand extends Command {
    public readonly originalName = 'charge'

    public readonly title = 'Charge'
    public readonly description = 'Get temporary strength. Will be exhausted after attack.'

    public readonly category = CommandCategory.Support

    private power = 1

    public act(actor: Creature, location: Location) {
        actor.gainStat('strength', this.power)
    }

    public dispose(actor: Creature, location: Location) {
        actor.loseStat('strength', this.power)
    }
}
