export const SQUARE_DISPLAY_CLEARED = Symbol('CLEARED')
export const SQUARE_DISPLAY_MINE = Symbol('MINE')
export const SQUARE_DISPLAY_NUMBER = Symbol('NUMBER')
export const SQUARE_DISPLAY_EMPTY = Symbol('EMPTY')

export class Square {
    constructor(x,y, minefield) {
        this.x = x
        this.y = y
        this.minefield = minefield

        this.mine = false
        this.cleared = false
        this.display = SQUARE_DISPLAY_CLEARED
        this.adjacentMineCount = null
    }

    hasMine() {
        return this.mine
    }

    isCleared() {
        return this.cleared
    }

    getAdjacentMineCount() {
        return this.adjacentMineCount
    }

    getDisplayState() {
        return this.display
    }

    plantMine() {
        this.mine = true
    }

    getState() {
        return {
            x: this.x,
            y: this.y,
            mine: this.mine,
            cleared: this.cleared,
            display: this.display,
            adjacentMineCount: this.adjacentMineCount
        }
    }

    dig() {
        if ( this.cleared ) {
            // refuse to dig already cleared squares
            return
        }

        this.cleared = true
        this.minefield.incrementSquaresCleared()

        if ( this.hasMine() ) {
            // We hit a mine => game over
            this.display = SQUARE_DISPLAY_MINE
            return
        }

        const adjacentSquares = this.getClearedAdjacentSquares()
        const adjacentMines = adjacentSquares.filter((square) => square.hasMine())

        this.adjacentMineCount = adjacentMines.length

        if ( adjacentMines.length > 0 ) {
            // There is at least one adjacent mine.
            // Display the number of mines.
            this.display = SQUARE_DISPLAY_NUMBER
        } else {
            // There are no adjacent mines.
            // Display an empty square and recursively dig all adjacent squares.
            this.display = SQUARE_DISPLAY_EMPTY
            adjacentSquares.forEach((square) => {
                square.dig() // recurse
            })
        }
    }

    getClearedAdjacentSquares() {
        let squares = []
        for (let x = this.x-1; x <= this.x+1; x++) {
            for (let y = this.y-1; y <= this.y+1; y++) {
                if ( x == this.x && y == this.y ) continue;
                let square = this.minefield.getSquare(x,y)
                squares.push(square)
            }
        }
        // filter out null values and cleared squares
        return squares.filter((square) => square && !square.cleared)
    }
}