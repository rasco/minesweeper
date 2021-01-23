export const SQUARE_DISPLAY_UNCLEARED = Symbol('UNCLEARED')
export const SQUARE_DISPLAY_MINE = Symbol('MINE')
export const SQUARE_DISPLAY_NUMBER = Symbol('NUMBER')
export const SQUARE_DISPLAY_EMPTY = Symbol('EMPTY')

export class Square {
    constructor(x,y, minefield) {
        this.x = x
        this.y = y
        this.minefield = minefield

        this.mine = false
        this.uncleared = false
        this.display = SQUARE_DISPLAY_UNCLEARED
        this.adjacentMineCount = null
    }

    hasMine() {
        return this.mine
    }

    isUncleared() {
        return this.uncleared
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
            uncleared: this.uncleared,
            display: this.display,
            adjacentMineCount: this.adjacentMineCount
        }
    }

    dig() {
        if ( this.uncleared ) {
            // refuse to dig already uncleared squares
            return
        }

        this.uncleared = true
        this.minefield.incrementSquaresUncleared()

        if ( this.hasMine() ) {
            // We hit a mine => game over
            this.display = SQUARE_DISPLAY_MINE
            return
        }

        const adjacentSquares = this.getUnclearedAdjacentSquares()
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

    getUnclearedAdjacentSquares() {
        let squares = []
        for (let x = this.x-1; x <= this.x+1; x++) {
            for (let y = this.y-1; y <= this.y+1; y++) {
                if ( x == this.x && y == this.y ) continue;
                let square = this.minefield.getSquare(x,y)
                squares.push(square)
            }
        }
        // filter out null values and uncleared squares
        return squares.filter((square) => square && !square.uncleared)
    }
}