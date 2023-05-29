import Creature from "~/lib/Models/Creature"

export default class Player extends Creature {
    public maxHealth = 10

    public stats = {
        strength: 1,
        intelligence: 0,
        agility: 0,
    }

    constructor(name: string) {
        super(name)

        this.fullStats()
    }
}
