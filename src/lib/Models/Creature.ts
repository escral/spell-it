export default abstract class Creature {
    public health = 10
    public mana = 0

    public maxHealth: number = 10
    public maxMana: number = 0

    public stats: Stats = {
        strength: 0,
        intelligence: 0,
        agility: 0,
    }

    protected constructor(public name = 'Creature') {
        //
    }
}

export type Stats = {
    strength: number,
    intelligence: number,
    agility: number,
}
