import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {startGame, changeDifficulty} from 'actions/game'

import {Game} from 'components/Game'

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