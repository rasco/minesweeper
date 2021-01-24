import { handleActions } from 'redux-actions';

import {
    GAME_CHANGE_STATE,
    GAME_CHANGE_DIFFICULTY,
} from 'actions/game';

const defaultState = { gameState: {
    state: null, minefield: []
}, difficulty: 'beginner' }

export default handleActions({
    // the actual game logic is in the Game model.
    // this reducer just takes a flat state.
    [GAME_CHANGE_STATE]: (state, action) => ({
        ...state,
        gameState: action.data
    }),

    // setting the difficulty just changes the difficulty field and leaves the rest untouched
    [GAME_CHANGE_DIFFICULTY]: (state, action) => ({
        ...state,
        difficulty: action.data
    }),
}, defaultState);
