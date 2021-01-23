import { 
    Minefield, MinefieldFactory
} from './Minefield'

import { 
    Square
} from './Square'

describe('Minefield model', () => {

    it('constructor should generate a minefield', () => {
        var minefield = MinefieldFactory(Square)(6,4) // width of 6, height of 4
        const field = minefield.getState()
        expect(field).toHaveLength(4) // count the rows
        field.forEach((row) => {
            expect(row).toHaveLength(6) // count the columns
        })
    })

    it('newly generated minefield should have no mines', () => {
        var minefield = MinefieldFactory(Square)(6,4) // width of 6, height of 4
        const field = minefield.getState()
        field.forEach((row) => {
            row.forEach((square) => {
                expect(square.hasMine()).toBe(false)
            })
        })
    })

    it('after digging once, there should be an appropriate number of mines', () => {
        var minefield = MinefieldFactory(Square)(6,4) // width of 6, height of 4
        const mineCountThatShouldBe = minefield.getDefaultMineCount()
        minefield.dig(3,2)
        const field = minefield.getState()
        let mineCount = 0
        field.forEach((row) => {
            row.forEach((square) => {
                mineCount += square.hasMine() ? 1 : 0
            })
        })
        expect(mineCount).toBe(mineCountThatShouldBe)
    })

    it('the starting square should never have a mine', () => {
        var minefield = MinefieldFactory(Square)(2,1)
        expect(minefield.isValidMineCoordinate({x:0,y:0}, {x:0,y:0})).toBe(false)
        expect(minefield.isValidMineCoordinate({x:0,y:0}, {x:1,y:0})).toBe(true)
    })

    it('a mine cannot be planted twice on the same square', () => {
        var minefield = MinefieldFactory(Square)(2,1) 
        const square = minefield.getSquare(1,0)
        expect(minefield.isValidMineCoordinate({x:1,y:0}, {x:0,y:0})).toBe(true)
        square.plantMine() // after planting a mine, this coordinate shouldn't be valid anymore
        expect(minefield.isValidMineCoordinate({x:1,y:0}, {x:0,y:0})).toBe(false)
    })


})