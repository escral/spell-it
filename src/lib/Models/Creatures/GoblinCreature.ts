import Creature from "~/lib/Models/Creature"

export default class GoblinCreature extends Creature {
    public maxHealth = 5
    public maxMana = 0

    public stats = {
        strength: 1,
        intelligence: 0,
        agility: 0,
    }

    constructor(name = 'Goblin') {
        super(name)

        this.fullStats()
    }
}
