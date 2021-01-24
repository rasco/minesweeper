import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {startGame, changeDifficulty} from 'actions/game'

import { 
    GAME_STATE_LOSE,
    GAME_STATE_WIN 
} from 'models/Game'

import Minefield from 'components/Minefield'

class Game extends React.Component {
    componentDidMount() {
        this.props.startGame()
    }

    changeDifficulty(event) {
        // get the difficulty setting from the select box and call the action creator.
        let newDifficulty = event.target.value
        this.props.changeDifficulty(newDifficulty)
    }

    render() {
        return <div className="relative bg-light-gray ba b--silver">

            {/* Header */}
            <div className="flex ba b--moon-gray bw1">
                <div className="w-40 self-center ph2">
                    {/* Difficulty chooser */}
                    <select className="mw-100 f7"
                        name="difficulty"
                        value={this.props.difficulty}
                        onChange={(e) => {this.changeDifficulty(e)}}>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>


                <div className="w-20 flex justify-center">
                    {/* Game state indicator and restart button */}
                    <div className="pa1 f1 yellow bg-white hover-blue pointer bl br b--light-silver"
                        onClick={() => this.props.startGame()}>
                        <Smileyface gameState={this.props.gameState} />
                    </div>
                </div>
                <div className="w-40 self-center ph2 f7 tr">
                    {/* Display the total number of mines */}
                    {this.props.mineCount} <i className="fa fa-bomb"></i>
                </div>
            </div>

            {/* The actual playing field */}
            <Minefield />
        </div>
    }
}

// the smileyface indicates the game state.
const Smileyface = ({gameState}) => {
    switch(gameState) {
        case GAME_STATE_LOSE:
            return <i className="fa fa-frown-o"></i>
        case GAME_STATE_WIN:
            return <i className="fa fa-smile-o"></i>
        default: 
            return <i className="fa fa-meh-o"></i>
    }
}

const mapStateToProps = state => {
  const gameState = state.game.gameState.state
  const mineCount = state.game.gameState.mineCount
  const difficulty = state.game.difficulty

  return {
    gameState, // this is the game's internal state (win/loss etc.)
    mineCount, // how many mines there are (displayed in the header)
    difficulty // current difficulty setting
  }
};

export default connect(mapStateToProps, dispatch => ({
    startGame: bindActionCreators(startGame, dispatch),
    changeDifficulty: bindActionCreators(changeDifficulty, dispatch),
}))(Game)