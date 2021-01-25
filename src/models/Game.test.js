import { 
    Game,
    GAME_STATE_START,
    GAME_STATE_RUNNING,
    GAME_STATE_LOSE,
    GAME_STATE_WIN 
} from './Game'

import { 
    Minefield, MinefieldFactory
} from './Minefield'

import { 
    Square
} from './Square'

describe('Game model', () => {

    it('initial state should be start', () => {
        var game = new Game(MinefieldFactory(Square)())
        expect(game.getState().state).toBe(GAME_STATE_START)
    })

    it('should change state to running', () => {
        var game = new Game(MinefieldFactory(Square)())
        game.clickField(0,0)
        expect(game.getState().state).toBe(GAME_STATE_RUNNING)
    })

    it('clicking a mine should change state to lose', () => {
        const minefield = MinefieldFactory(Square)(5,5)
        const square = minefield.getSquare(3,3)
        square.plantMine() // there is definitely a mine planted at [3,3]
        var game = new Game(minefield)
        game.clickField(0,0)
        expect(game.getState().state).toBe(GAME_STATE_RUNNING)
        game.clickField(3,3)
        expect(game.getState().state).toBe(GAME_STATE_LOSE)
    })

    it('clearing all non-mine squares should change state to win', () => {
        // test one
        // plant a mine in the top left corner
        var minefield = MinefieldFactory(Square)(3,3,1)
        minefield.getSquare(0,0).plantMine()
        minefield.minesHaveBeenPlanted = true

        // clicking anywhere except on a mine should win the game
        var game = new Game(minefield)
        game.clickField(2,2)
        expect(game.getState().state).toBe(GAME_STATE_WIN)
        
        // test two
        // plant three mines in the middle row
        minefield = MinefieldFactory(Square)(3,3,3)
        minefield.getSquare(0,1).plantMine()
        minefield.getSquare(1,1).plantMine()
        minefield.getSquare(2,1).plantMine()
        minefield.minesHaveBeenPlanted = true

        // clicking all non-mine fields should win the game
        game = new Game(minefield)
        game.clickField(0,0)
        game.clickField(1,0)
        game.clickField(2,0)
        game.clickField(0,2)
        game.clickField(1,2)
        expect(game.getState().state).toBe(GAME_STATE_RUNNING)
        game.clickField(2,2)
        expect(game.getState().state).toBe(GAME_STATE_WIN)

    })
})