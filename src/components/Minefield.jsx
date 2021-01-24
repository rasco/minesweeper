import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {clickSquare} from 'actions/game'

import {Square} from 'components/Square'

// render the minefield
class Minefield extends React.Component {
    render() {
        let rowCounter = 0

        // map the minefield rows and squares to Square components.
        // each row is a flexbox.
        const minefield = this.props.minefield.map((row) => {
            const squares = row.map((square) => {
                return <Square key={`${square.x}/${square.y}`}
                    square={square}
                    action={() => this.props.clickSquare(square.x, square.y)}
                />
            })
            return <div key={rowCounter++}
                className="flex">{squares}</div>
        })

        // output all the rows
        return <div>
            {minefield}
        </div>
    }
}

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