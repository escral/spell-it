import type Command from '~/lib/Command/Command'
import HitCommand from '~/lib/Command/HitCommand'
import ChargeCommand from '~/lib/Command/ChargeCommand'

export const commands: Command[] = [
    new HitCommand(),
    new ChargeCommand(),
]
