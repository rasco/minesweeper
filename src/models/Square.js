export const SQUARE_DISPLAY_UNCOVERED = Symbol('UNCOVERED')
export const SQUARE_DISPLAY_MINE = Symbol('MINE')
export const SQUARE_DISPLAY_NUMBER = Symbol('NUMBER')
export const SQUARE_DISPLAY_EMPTY = Symbol('EMPTY')

export class Square {
    constructor(x,y, minefield) {
        this.x = x
        this.y = y
        this.minefield = minefield

        this.mine = false
        this.uncovered = false
        this.display = SQUARE_DISPLAY_UNCOVERED
        this.adjacentMineCount = null
    }

    hasMine() {
        return this.mine
    }

    isUncovered() {
        return this.uncovered
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

    dig() {
        if ( this.uncovered ) {
            // refuse to dig already cleared squares
            return
        }

        this.uncovered = true
        this.minefield.incrementSquaresUncovered()

        if ( this.hasMine() ) {
            // We hit a mine => game over
            this.display = SQUARE_DISPLAY_MINE
            return
        }

        const adjacentSquares = this.getUncoveredAdjacentSquares()
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

    getUncoveredAdjacentSquares() {
        let squares = []
        for (let x = this.x-1; x <= this.x+1; x++) {
            for (let y = this.y-1; y <= this.y+1; y++) {
                if ( x == this.x && y == this.y ) continue;
                let square = this.minefield.getSquare(x,y)
                squares.push(square)
            }
        }
        // filter out null values and uncovered squares
        return squares.filter((square) => square && !square.uncovered)
    }
}