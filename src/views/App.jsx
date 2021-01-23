import React from 'react';

import Game from 'views/Game'

import '../styles.scss'

class App extends React.Component {
    render() {
        return <div className="pa3">
            <div className="flex justify-center f1 sans-serif i b">Minesweeper</div>
            <div className="flex justify-center items-center"><Game /></div>
        </div>
    }
}

export default App