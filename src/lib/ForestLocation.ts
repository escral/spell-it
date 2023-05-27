import Location, { type LocationInfo } from "~/lib/Location"
import Player from "~/lib/Models/Player";

export default class ForestLocation extends Location {
    get info(): LocationInfo {
        return {
            name: "Forest",
            description: "Typical forest, with trees and stuff.",
        }
    }

    constructor() {
        super()
        
        this.addCreature(new Player('Goblin'))
    }
}
