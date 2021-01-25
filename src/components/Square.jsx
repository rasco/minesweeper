import React from 'react';
import classnames from 'classnames'

import { SQUARE_DISPLAY_CLEARED, 
    SQUARE_DISPLAY_MINE, 
    SQUARE_DISPLAY_NUMBER, 
    SQUARE_DISPLAY_EMPTY } from 'models/Square'

// render a square on the minefield
// todo: each square type could have its own little component
export class Square extends React.Component {
    render() {
        let square = this.props.square
        let display = square.display
        let content = ''
        let classes = null
        switch(display) {
            case SQUARE_DISPLAY_CLEARED:
                classes = 'bg-silver hover-bg-moon-gray pointer'
                break;
            case SQUARE_DISPLAY_NUMBER:
                content = square.adjacentMineCount
                classes = 'bg-silver dark-blue sans-serif'
                break;
            case SQUARE_DISPLAY_EMPTY:
                content = '';
                classes = 'bg-moon-gray'
                break;
            case SQUARE_DISPLAY_MINE:
                content = <i className="fa fa-bomb"></i>;
                classes = 'bg-red'
                break;
        }
        return <div onClick={this.props.action}
            className={classnames(
                "pa1",
                classes ? classes : 'bg-silver'
            )}
            style={{
                margin: '.5px'
            }}>
            <span className="flex items-center justify-center" 
                style={{
                    width: '1em',
                    height: '1em',
                }}>{content}</span>
        </div>
    }
}
