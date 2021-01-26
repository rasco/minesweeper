import React from 'react';

import GameContainer from 'components/GameContainer'

import '../styles.scss'

const App = () => {
    return (
        <div className="fixed w-100 h-100 flex justify-center items-center pa3">
            <GameContainer />
        </div>
    )
}

export default App