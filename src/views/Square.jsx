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
        let classes = null
        switch(display) {
            case SQUARE_DISPLAY_UNCLEARED:
                classes = 'bg-silver hover-bg-light-blue'
                break;
            case SQUARE_DISPLAY_NUMBER:
                content = square.adjacentMineCount
                classes = 'bg-silver dark-blue sans-serif'
                break;
            case SQUARE_DISPLAY_EMPTY:
                content = '';
                classes = 'bg-light-silver'
                break;
            case SQUARE_DISPLAY_MINE:
                content = <i className="fa fa-bomb"></i>;
                classes = 'bg-red'
                break;
        }
        return <div onClick={this.props.action}
            className={classnames(
                "pa1 pointer",
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
