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
