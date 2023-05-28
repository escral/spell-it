import State from "~/lib/State"
import type { Ref } from 'vue'
import { FormattedData } from '~/lib/Formatter'
import Player from '~/lib/Models/Player'
import Creature from '~/lib/Models/Creature'

type BattleLogItem = {
    text: string,
    variables: AnyObject,
    time: number,
}

export default class BattleLog extends State {
    declare private state: Ref<BattleLogItem[]>

    constructor() {
        super()

        this.state = ref([])
    }

    get records() {
        return this.state.value
    }

    public record(text: string, variables: AnyObject = {}) {
        this.state.value.push({
            text,
            variables,
            time: Date.now(),
        })
    }

    public formatRecord(record: BattleLogItem) {
        let result = record.text

        for (const variable in record.variables) {
            let value = record.variables[variable]

            if (value instanceof FormattedData) {
                value = `<span class="formatted-data--${value.type}">${value.value}</span>`
            } else if (value instanceof Player) {
                value = `<span class="formatted-data--player">${value.name}</span>`
            } else if (value instanceof Creature) {
                value = `<span class="formatted-data--enemy">${value.name}</span>`
            }

            result = result.replaceAll(`:${variable}`, value)
        }

        return result
    }
}
