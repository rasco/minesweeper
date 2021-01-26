import React, { useState, useLayoutEffect } from 'react';

import store from 'store'

import {Minefield} from 'components/Minefield'

export default function () {

    const [gameState, setGameState] = useState(store.initialState)

    useLayoutEffect( () => {
        store.subscribe(setGameState);
        store.start()
    },[]);

    const onClickSquare = (x, y) => {
        store.clickSquare(x, y)
    }

    return (
        <Minefield minefield={gameState.game.minefield} 
            clickSquare={onClickSquare} />
    )
}
