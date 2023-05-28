import EventBus from '~/lib/EventBus'

const UPS = 60 // Updates per second
const MS_PER_UPDATE = 1000 / UPS // Milliseconds per update

export default class TimeController {
    private lastUpdateTime = 0
    private accumulatedTime = 0

    private _isPaused = false
    private isInitialized = false

    public eventBus = new EventBus<{
        start: () => void
        stop: () => void
        pause: () => void
        resume: () => void
        update: (deltaTime: number) => void
        render: () => void
    }>()

    declare private _gameLoop: (currentTime: number) => void

    constructor() {
        this._gameLoop = this.gameLoop.bind(this)
    }

    get isPaused() {
        return this._isPaused
    }

    public start() {
        if (this.isInitialized) {
            return
        }

        this.isInitialized = true
        this.lastUpdateTime = performance.now()

        this.eventBus.emit('start')

        requestAnimationFrame(this._gameLoop)
    }

    public stop() {
        this.isInitialized = false

        this.eventBus.emit('stop')
    }

    public pause() {
        this._isPaused = true

        this.eventBus.emit('pause')
    }

    public resume() {
        if (!this._isPaused) {
            return
        }

        this.eventBus.emit('resume')

        this._isPaused = false
        this.lastUpdateTime = performance.now()
        requestAnimationFrame(this._gameLoop)
    }

    public gameLoop(currentTime: number) {
        if (!this.isInitialized) {
            return
        }

        if (this._isPaused) {
            // If paused, simply return without updating or rendering
            requestAnimationFrame(this._gameLoop)
            return
        }

        // Calculate delta time
        const deltaTime = currentTime - this.lastUpdateTime
        this.lastUpdateTime = currentTime
        this.accumulatedTime += deltaTime

        // Update game logic based on fixed time step
        while (this.accumulatedTime >= MS_PER_UPDATE) {
            this.eventBus.emit('update', MS_PER_UPDATE)
            this.accumulatedTime -= MS_PER_UPDATE
        }

        // Render game graphics
        this.eventBus.emit('render')

        // Call the next frame
        requestAnimationFrame(this._gameLoop)
    }

    public timer(ms: number, callback: (stop: () => void) => void, interval = false) {
        let timer = 0

        const stop = this.eventBus.on('update', (deltaTime) => {
            timer += deltaTime

            if (Math.ceil(timer) >= ms) {
                callback(stop)
                timer = 0

                if (!interval) {
                    stop()
                }
            }
        })

        return stop
    }

    public interval(ms: number, callback: () => void) {
        return this.timer(ms, callback, true)
    }
}
