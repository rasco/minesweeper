import { Subject } from 'rxjs';

import GameFactory, {getDifficultySettings} from 'models/GameFactory'

const subject = new Subject();
const initialState = {
    game: {
        state: null, 
        minefield: [],
        mineCount: 0
    }, 
    difficulty: 'beginner'
};

let game = null
let state = initialState;

export const store = {
    start: () => {
        let difficulty = state.difficulty
        let difficultySettings = getDifficultySettings(difficulty)
        game = GameFactory(difficultySettings.w, difficultySettings.h, difficultySettings.mines)
        state = {
            ...state,
            game: game.getState()
        }
        subject.next(state)
    },
    changeDifficulty: (difficulty) => {
        state = {
            ...state,
            difficulty
        }
        subject.next(state)
        store.start()
    },
    clickSquare: (x, y) => {
        game.clickField(x, y)
        state = {
            ...state,
            game: game.getState()
        }
        subject.next(state)
    },
    subscribe: setState => subject.subscribe(setState),
    initialState
};

export default store;