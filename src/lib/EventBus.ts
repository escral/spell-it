type Callback = (...args: any[]) => any

export default class EventBus<EventsMap extends Record<string, Callback> = Record<string, Callback>> {
    private listeners: { [Event in keyof EventsMap]?: EventsMap[Event][] } = {}

    on<TEvent extends keyof EventsMap>(event: TEvent, callback: EventsMap[TEvent]) {
        if (this.listeners[event] === undefined) {
            this.listeners[event] = []
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.listeners[event]!.push(callback)

        return () => this.off(event, callback)
    }

    off<TEvent extends keyof EventsMap>(event: TEvent, callback: EventsMap[TEvent]) {
        this.listeners[event] = this.listeners[event]?.filter(listener => listener !== callback)
    }

    emit<TEvent extends keyof EventsMap>(event: TEvent, ...args: Parameters<EventsMap[TEvent]>) {
        this.listeners[event]?.forEach(listener => listener(...args))
    }

    once<TEvent extends keyof EventsMap>(event: TEvent, callback: EventsMap[TEvent]) {
        const listener = ((...args: any[]) => {
            callback(...args)

            this.off(event, listener)
        }) as EventsMap[TEvent]

        return this.on(event, listener)
    }

    clear() {
        this.listeners = {}
    }
}
