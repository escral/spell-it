import Creature from "~/lib/Models/Creature"

export default class Player extends Creature {
    public health = 10
    public mana = 0

    public stats = {
        strength: 1,
        intelligence: 0,
        agility: 0,
    }
}
