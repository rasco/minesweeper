import {Minefield} from './Minefield'

export const GAME_STATE_START = Symbol()
export const GAME_STATE_RUNNING = Symbol()
export const GAME_STATE_GAME_LOSE = Symbol()
export const GAME_STATE_GAME_WIN = Symbol()

export class Game {
    constructor() {
        this.state = GAME_STATE_START
        this.minefield = new Minefield(6,4)
    }

    clickField(x,y) {
        if ( this.state === GAME_STATE_START ) {
            this.minefield.dig(x,y)
            this.state = GAME_STATE_RUNNING
        }
    }

    getState() {
        return this.state
    }
}