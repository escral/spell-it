export default abstract class Creature {
    public health = 10
    public mana = 0

    public maxHealth = 10
    public maxMana = 0

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
        //
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

        console.log(`${this.name} gained ${value} ${stat}.`)
    }

    loseStat(stat: keyof Stats, value: number) {
        this.stats[stat] -= value

        console.log(`${this.name} lost ${value} ${stat}.`)
    }
}

export type Stats = {
    strength: number,
    intelligence: number,
    agility: number,
}
