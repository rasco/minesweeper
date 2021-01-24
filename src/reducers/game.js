import { handleActions } from 'redux-actions';

import {
    GAME_CHANGE_STATE,
} from 'actions/game';

const defaultState = { state: null, minefield: [] }

export default handleActions({
    [GAME_CHANGE_STATE]: (state, action) => ({
        state: action.data.gameState.state,
        minefield: action.data.gameState.minefield
    }),
}, defaultState);
