import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {clickSquare} from 'actions/game'

import {Minefield} from 'components/Minefield'

// we just need the minefield state
const mapStateToProps = state => {
  const minefield = state.game.gameState.minefield

  return {
    minefield
  }
};

// when a square is clicked, the clickSquare action is called
export default connect(mapStateToProps, dispatch => ({
    clickSquare: bindActionCreators(clickSquare, dispatch)
}))(Minefield)