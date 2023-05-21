import type Creature from '~/lib/Models/Creature'

export default class Location {
    constructor() {

    }

    creatures: Creature[] = []

    addCreature(creature: Creature) {
        this.creatures.push(creature)
    }
}
