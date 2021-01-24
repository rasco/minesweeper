export class Minefield {
    constructor(deps, w = 10, h = 10, mineCount = undefined) {
        this.width = w
        this.height = h
        this.mineCount = mineCount !== undefined ? mineCount : this.getDefaultMineCount()
        this.deps = deps

        this.field = this.generateField(w, h)

        this.minesHaveBeenPlanted = false
        this.squaresUncleared = 0
    }

    getDefaultMineCount() {
        return (this.width * this.height) / 6;
    }

    getState() {
        return this.field.map((row) => {
            return row.map((square) => {
                return square.getState()
            })
        })
    }

    getField() {
        return this.field
    }

    incrementSquaresUncleared() {
        this.squaresUncleared++
    }

    getMineCount() {
        return this.mineCount
    }

    getSquaresUncleared() {
        return this.squaresUncleared
    }

    getSquareCount() {
        return this.width * this.height
    }

    generateField(width, height) {
        let field = []
        for (var h = 0; h < height; h++) {
            let row = []
            for (var w = 0; w < width; w++) {
                row.push(new this.deps.Square(w,h, this))
            }
            field.push(row)
        }
        return field
    }

    dig(x,y) {
        if ( this.minesHaveBeenPlanted == false ) {
            this.plantMines({x,y}, this.getMineCount())
        }
        let square = this.getSquare(x,y)
        square.dig()
        return square
    }

    getSquare(x,y) {
        if ( x < 0 || y < 0 || x >= this.width || y >= this.height )
            return null;
        return this.field[y][x]
    }

    plantMines(startPosition, minesToPlant) {
        let minesPlanted = 0;
        while(minesPlanted < minesToPlant) {
            let randomCoord = this.getRandomCoordinate()
            let {x,y} = randomCoord
            if ( !this.isValidMineCoordinate(randomCoord, startPosition) ) {
                continue;
            }
            let square = this.getSquare(x,y)
            square.plantMine()
            minesPlanted++;
        }
        this.minesHaveBeenPlanted = true
        this.mineCount = minesPlanted
    }

    isValidMineCoordinate(randomCoord, startPosition) {
        let {x,y} = randomCoord
        if ( x == startPosition.x && y == startPosition.y )
            return false;
        let square = this.getSquare(x,y)
        if ( square.hasMine() )
            return false;
        return true
    }

    getRandomCoordinate() {
        let x = Math.floor(Math.random() * this.width)
        let y = Math.floor(Math.random() * this.height)
        return {x,y}
    }

    clearAll() {
        this.field.forEach((row) => {
            row.forEach((square) => {
                square.dig()
            })
        })
    }
}

export const MinefieldFactory = (Square) => {
    return (...args) => {
        return new Minefield({Square}, ...args)
    }

}