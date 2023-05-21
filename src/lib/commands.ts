import HitCommand from '~/lib/Command/HitCommand'
import Command from '~/lib/Command/Command'
import ChargeCommand from '~/lib/Command/ChargeCommand'

export const commands: Command[] = [
    new HitCommand(),
    new ChargeCommand(),
]
