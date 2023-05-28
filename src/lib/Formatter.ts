export enum EntityType {
    Damage = 'damage',
    StatStrength = 'stat-strength'
}

export class FormattedData {
    constructor(public value: any, public type: EntityType) {
        //
    }
}

export default class Formatter {
    public static value(value: any, type: EntityType) {
        return new FormattedData(value, type)
    }

    public static damage(value: number) {
        return new FormattedData(value, EntityType.Damage)
    }
}
