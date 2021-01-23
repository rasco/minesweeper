export const GAME_START = 'GAME_START'
export const GAME_CLICK_SQUARE = 'GAME_CLICK_SQUARE'

export function startGame() {
    return {
        type: GAME_START,
    };
}

export function clickSquare(x,y) {
    return {
        type: GAME_CLICK_SQUARE,
        data: {x,y}
    };
}