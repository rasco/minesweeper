import React from 'react';
import classnames from 'classnames'

import { SQUARE_DISPLAY_UNCLEARED, 
    SQUARE_DISPLAY_MINE, 
    SQUARE_DISPLAY_NUMBER, 
    SQUARE_DISPLAY_EMPTY } from 'models/Square'

export class Square extends React.Component {
    render() {
        let square = this.props.square
        let display = square.display
        let content = ''
        switch(display) {
            case SQUARE_DISPLAY_UNCLEARED:
                break;
            case SQUARE_DISPLAY_NUMBER:
                content = square.adjacentMineCount
                break;
            case SQUARE_DISPLAY_EMPTY:
                content= '-';
                break;
            case SQUARE_DISPLAY_MINE:
                content= <i className="fa fa-bomb"></i>;
                break;
        }
        return <div onClick={this.props.action}
            className={classnames(
                "pa1 flex items-center justify-center pointer",
                'bg-silver'
            )}
            style={{
                width: '1em',
                height: '1em',
                margin: '.5px'
            }}>
            <span>{content}</span>
        </div>
    }
}
