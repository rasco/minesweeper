import GameFactory from 'models/GameFactory'

export const GAME_CHANGE_STATE = 'GAME_CHANGE_STATE'

let game = null

export function startGame() {
    game = GameFactory()
    return changeGameState(game)
}

export function clickSquare(x,y) {
    game.clickField(x, y)
    return changeGameState(game)
}

function changeGameState(game) {
    return {
        type: GAME_CHANGE_STATE,
        data: {gameState: game.getState()}
    };
}