import { 
    Game
} from 'models/Game'

import { 
    MinefieldFactory
} from 'models/Minefield'

import { 
    Square
} from 'models/Square'

import { handleActions } from 'redux-actions';

import {
    GAME_START,
    GAME_CLICK_SQUARE
} from 'actions/game';

const defaultState = { game: null }

const modelToStateMapper = {
    startGame: () => {
        var game = new Game(MinefieldFactory(Square)(10, 10))
        return {game, flatState:game.getState()}
    },
    clickSquare: (state, action) => {
        var {game} = state
        var {x,y} = action.data
        game.clickField(x, y)
        return {game, flatState:game.getState()}
    },
}

export default handleActions({
    [GAME_START]: modelToStateMapper.startGame,
    [GAME_CLICK_SQUARE]: modelToStateMapper.clickSquare,
}, defaultState);
