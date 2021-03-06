export const GAME_STATE_START = Symbol('START')
export const GAME_STATE_RUNNING = Symbol('RUNNING')
export const GAME_STATE_LOSE = Symbol('LOSE')
export const GAME_STATE_WIN = Symbol('WIN')

export class Game {
    constructor(minefield) {
        this.state = GAME_STATE_START
        this.minefield = minefield
    }

    clickField(x,y) {
        if ( this.state === GAME_STATE_START ) {
            this.minefield.plantMines({x,y}, this.minefield.getMineCount())
            this.state = GAME_STATE_RUNNING
        }
        const square = this.minefield.dig(x,y)

        if ( square.hasMine() ) {
            this.state = GAME_STATE_LOSE
            this.minefield.clearAll()
        }

        if ( this.minefield.getSquaresCleared() + this.minefield.getMineCount()
            == this.minefield.getSquareCount() ) {
            this.state = GAME_STATE_WIN
            this.minefield.clearAll()
        }

        return square
    }

    getState() {
        return {
            state: this.state,
            minefield: this.minefield.getState(),
            mineCount: this.minefield.getMineCount()
        }
    }

    getMinefield() {
        return this.minefield
    }
}