import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {clickSquare} from 'actions/game'

import {Square} from 'views/Square'

class Minefield extends React.Component {
    render() {
        let rowCounter = 0
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

        return <div>
            {minefield}
        </div>
    }
}

const mapStateToProps = state => {
  const gameState = state.game.state

  return {
    minefield: gameState.minefield
  }
};

export default connect(mapStateToProps, dispatch => ({
    clickSquare: bindActionCreators(clickSquare, dispatch)
}))(Minefield)