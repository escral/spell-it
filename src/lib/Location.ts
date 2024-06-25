import type Creature from '~/lib/Models/Creature'

export type LocationInfo = {
    name: string
    description: string
}

export default abstract class Location {
    abstract get info(): LocationInfo

    creatures: Creature[] = []

    addCreature(creature: Creature) {
        this.creatures.push(creature)
    }

    removeCreature(creature: Creature) {
        this.creatures = this.creatures.filter((c) => c !== creature)
    }
}
