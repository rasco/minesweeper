import { 
    Game
} from 'models/Game'

import { 
    MinefieldFactory
} from 'models/Minefield'

import { 
    Square
} from 'models/Square'

export default (w = undefined, h = undefined, mines = undefined) => {
    return new Game(MinefieldFactory(Square)(w, h, mines))
}

export function getDifficultySettings(difficulty) {
    switch (difficulty) {
        case 'beginner':
            return {w: 10, h: 10, mines: 16}
        case 'intermediate':
            return {w: 20, h: 15, mines: 60}
        case 'advanced':
            return {w: 25, h: 20, mines: 100}
    }
}