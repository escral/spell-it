export default abstract class Creature {
    public health = 10
    public mana = 0

    public stats: Stats = {
        strength: 0,
        intelligence: 0,
        agility: 0,
    }
}

export type Stats = {
    strength: number,
    intelligence: number,
    agility: number,
}
