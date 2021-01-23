import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {startGame} from 'actions/game'

import { 
    GAME_STATE_START,
    GAME_STATE_RUNNING,
    GAME_STATE_LOSE,
    GAME_STATE_WIN 
} from 'models/Game'

import Minefield from 'views/Minefield'

class Game extends React.Component {
    render() {
        let smileyface 
        switch(this.props.gameState) {
            case GAME_STATE_LOSE:
                smileyface = <i className="fa fa-frown-o"></i>
                break;
            case GAME_STATE_WIN:
                smileyface = <i className="fa fa-smile-o"></i>
                break;
            default: 
                smileyface = <i className="fa fa-meh-o"></i>
        }

        return <div className="relative bg-light-gray ba b--silver">
            <div className="flex ba b--moon-gray">
                <div className="flex-auto"></div>
                <div className="pa1 f1 yellow bg-white hover-blue pointer" 
                    onClick={() => this.props.startGame()}>
                    {smileyface}
                </div>
                <div className="flex-auto"></div>
            </div>
            <Minefield />
        </div>
    }
}

const mapStateToProps = state => {
  const gameState = state.game.state

  return {
    gameState: gameState.state
  }
};

export default connect(mapStateToProps, dispatch => ({
    startGame: bindActionCreators(startGame, dispatch)
}))(Game)