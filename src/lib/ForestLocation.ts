import Location, { type LocationInfo } from "~/lib/Location"
import Player from "~/lib/Models/Player"

export default class ForestLocation extends Location {
    get info(): LocationInfo {
        return {
            name: "Forest",
            description: "Typical forest, with trees and stuff.",
        }
    }

    constructor() {
        super()

        this.addCreature(reactive(new Player('Goblin 1')))
        this.addCreature(reactive(new Player('Goblin 2')))
    }
}
