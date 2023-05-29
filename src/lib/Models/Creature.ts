export default abstract class Creature {
    declare public health: number
    declare public mana: number

    declare public maxHealth: number | undefined
    declare public maxMana: number | undefined

    public stats: Stats = {
        strength: 0,
        intelligence: 0,
        agility: 0,
    }

    // ================

    public commandStack: string[] = []
    public commandHistory: string[] = []

    // ================

    protected constructor(public name = 'Creature') {
        this.fullStats()
    }

    public fullStats() {
        if (this.maxHealth !== undefined) {
            this.health = this.maxHealth
        }

        if (this.maxMana !== undefined) {
            this.mana = this.maxMana
        }
    }

    dealDamage(damage: number, target: Creature) {
        return target.takeDamage(damage)
    }

    takeDamage(damage: number) {
        this.health = this.health - damage

        return damage
    }

    gainStat(stat: keyof Stats, value: number) {
        this.stats[stat] += value

        return value
    }

    loseStat(stat: keyof Stats, value: number) {
        this.stats[stat] -= value

        return value
    }
}

export type Stats = {
    strength: number,
    intelligence: number,
    agility: number,
}
