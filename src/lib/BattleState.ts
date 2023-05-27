import State from "~/lib/State"
import EventBus from "~/lib/EventBus"
import InputController from "~/lib/InputController"
import type Location from "~/lib/Location";

export enum Mode {
    Normal = "Normal",
    Casting = "Casting",
}

type BattleStateType = {
    mode: Mode
}

export default class BattleState extends State {
    public eventBus: EventBus = new EventBus()

    declare private state: BattleStateType

    declare public location: Location

    constructor(config: {
        location: Location,
    }) {
        super()

        this.location = config.location

        this.state = {
            mode: Mode.Normal,
        }
    }

    get mode() {
        return this.state.mode
    }

    public changeMode(mode: Mode) {
        this.state.mode = mode

        this.eventBus.emit("changeMode", mode)
    }
}
