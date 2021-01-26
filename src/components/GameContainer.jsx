import React, { useState, useLayoutEffect } from 'react';

import store from 'store'

import {Game} from 'components/Game'



export default function () {

    const [gameState, setGameState] = useState(store.initialState)

    useLayoutEffect( () => {
        store.subscribe(setGameState);
        store.start()
    },[]);

    const onChangeDifficulty = (diff) => {
        store.changeDifficulty(diff)
    }

    return (
        <Game gameState={gameState.game.state} // this is the game's internal state (win/loss etc.)
            mineCount={gameState.game.mineCount} // how many mines there are (displayed in the header)
            difficulty={gameState.difficulty} // current difficulty setting
            startGame={store.start}
            changeDifficulty={onChangeDifficulty} />
    )
}