import {Square} from './Square'

export class Minefield {
    constructor(w, h) {
        this.width = w
        this.height = h

        this.field = this.generateField(w, h)

        this.planted = false
    }

    getInitialMineCount() {
        return (this.width * this.height) / 2;
    }

    getState() {
        return this.field
    }

    generateField(width, height) {
        let field = []
        for (var h = 0; h < height; h++) {
            let row = []
            for (var w = 0; w < width; w++) {
                row.push(new Square(w,h))
            }
            field.push(row)
        }
        return field
    }

    dig(x,y) {
        if ( this.planted == false ) {
            this.plantMines({x,y}, this.getInitialMineCount())
        }
    }

    getSquare(x,y) {
        return this.field[y][x]
    }

    plantMines(startPosition, mineCount) {
        let minesPlanted = 0;
        while(minesPlanted < mineCount) {
            let randomCoord = this.getRandomCoordinate()
            let {x,y} = randomCoord
            let square = this.getSquare(x,y)
            if ( !this.isValidMineCoordinate(randomCoord, startPosition) ) {
                continue;
            }
            square.plantMine()
            minesPlanted++;
        }
        this.planted = true
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
}