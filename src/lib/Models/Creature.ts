export default abstract class Creature {
    declare public health: number
    declare public mana: number

    declare public maxHealth: number
    declare public maxMana: number

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
        this.health = this.maxHealth
        this.mana = this.maxMana
    }

    dealDamage(target: Creature) {
        const damage = this.stats.strength

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
