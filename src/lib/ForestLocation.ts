import Location, { type LocationInfo } from "~/lib/Location"
import GoblinCreature from '~/lib/Models/Creatures/GoblinCreature'

export default class ForestLocation extends Location {
    get info(): LocationInfo {
        return {
            name: "Forest",
            description: "Typical forest, with trees and stuff.",
        }
    }

    constructor() {
        super()

        this.addCreature(reactive(new GoblinCreature('Goblin 1')))
        this.addCreature(reactive(new GoblinCreature('Goblin 2')))
    }
}
