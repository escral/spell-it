import Creature from "~/lib/Models/Creature"

export default class Player extends Creature {
    declare public health: number
    declare public mana: number

    public stats = {
        strength: 1,
        intelligence: 0,
        agility: 0,
    }

    constructor(...props) {
        super(...props)

        this.health = this.maxHealth
        this.mana = this.maxMana
    }

}
