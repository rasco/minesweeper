import { 
    Minefield, MinefieldFactory
} from './Minefield'

import { 
    Square
} from './Square'

describe('Square model', () => {

    it('get adjacent squares should return all adjacent squares', () => {
        // we construct a 3x3 minefield
        var minefield = MinefieldFactory(Square)(3,3,8)
        minefield.plantMines({x:1, y:1}, 8)

        let square, adjacentSquares

        // the middle square should have 8 valid adjacent squares
        square = minefield.getSquare(1,1)
        adjacentSquares = square.getUnclearedAdjacentSquares()
        expect(adjacentSquares).toHaveLength(8)

        // the square at the top left should have only 3 adjacent squares
        square = minefield.getSquare(0,0)
        adjacentSquares = square.getUnclearedAdjacentSquares()
        expect(adjacentSquares).toHaveLength(3)
    })

    it('digging a square with an adjacent mine clears it and calculates the number of adjacent mines', () => {
        // we construct a 3x3 minefield
        var minefield = MinefieldFactory(Square)(3,3)

        // plant 3 mines in the top row
        minefield.getSquare(0,0).plantMine()
        minefield.getSquare(1,0).plantMine()
        minefield.getSquare(2,0).plantMine()
        minefield.minesHaveBeenPlanted = true

        let square, adjacentSquares

        square = minefield.getSquare(1,1)
        square.dig()

        expect(square.isUncleared()).toBe(true)
        expect(square.getAdjacentMineCount()).toBe(3)
        
        square = minefield.getSquare(0,1)
        square.dig()

        expect(square.isUncleared()).toBe(true)
        expect(square.getAdjacentMineCount()).toBe(2)
    })

    it('digging a square without adjacent mines clears all adjacent squares', () => {
        // we construct a 3x3 minefield
        var minefield = MinefieldFactory(Square)(10,10)

        // plant one mine in the top left corner
        minefield.getSquare(0,0).plantMine()
        minefield.minesHaveBeenPlanted = true

        let square, adjacentSquares

        // dig in the bottom right corner
        square = minefield.getSquare(9,9)
        square.dig()

        expect(square.isUncleared()).toBe(true)
        expect(square.getAdjacentMineCount()).toBe(0)

        // Count all uncleared fields
        let field = minefield.getField()
        let unclearedFields = 0
        field.forEach((row) => {
            row.forEach((square) => {
                unclearedFields += square.isUncleared() ? 1 : 0
            })
        })

        // We should end up with 10*10-1 (99) uncleared fields (last one is the mine)
        expect(unclearedFields).toBe(99)
    })
})