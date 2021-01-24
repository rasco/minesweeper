import GameFactory, {getDifficultySettings} from 'models/GameFactory'

export const GAME_CHANGE_STATE = 'GAME_CHANGE_STATE'
export const GAME_CHANGE_DIFFICULTY = 'GAME_CHANGE_DIFFICULTY'

// singleton...bleh
// but we'll treat this as if it was a synchronous external api
let game = null  

// start or restart the game
export function startGame() {
    return (dispatch, getState) => {
        // depending on the difficulty setting, create a game with the appropriate settings
        let difficulty = getState().game.difficulty
        let difficultySettings = getDifficultySettings(difficulty)
        game = GameFactory(difficultySettings.w, difficultySettings.h, difficultySettings.mines)
        return dispatch(changeGameState(game))
    }
}

// when the minefield is clicked
export function clickSquare(x,y) {
    game.clickField(x, y)
    return changeGameState(game)
}

// changes the difficulty setting and restarts the game.
export function changeDifficulty(difficulty) {
    return (dispatch) => {
        dispatch( {
            type: GAME_CHANGE_DIFFICULTY,
            data: difficulty
        } );
        dispatch(startGame())
    }
}

// for convenience
function changeGameState(game) {
    return {
        type: GAME_CHANGE_STATE,
        data: game.getState()
    };
}