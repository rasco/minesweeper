import { 
    Game,
    GAME_STATE_START,
    GAME_STATE_RUNNING,
    GAME_STATE_GAME_LOSE,
    GAME_STATE_GAME_WIN 
} from './Game'

describe('Game model', () => {

    it('initial state should be start', () => {
        var game = new Game()
        expect(game.getState()).toBe(GAME_STATE_START)
    })

    it('should change state to running', () => {
        var game = new Game()
        game.clickField(0,0)
        expect(game.getState()).toBe(GAME_STATE_RUNNING)
    })
})