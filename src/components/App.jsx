import React from 'react';

import Game from 'components/Game'

import '../styles.scss'

class App extends React.Component {
    render() {
        return <div className="fixed w-100 h-100 flex justify-center items-center pa3">
            <Game />
        </div>
    }
}

export default App