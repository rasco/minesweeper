import { applyMiddleware, createStore } from 'redux';
// import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { combineReducers } from 'redux';

import game from 'reducers/game'

const reducer = combineReducers({
    game
});

const middleware = [];
if ( process.env.NODE_ENV != 'production' ) {
    middleware.push(createLogger());
}
// console.log('env: ', process.env.NODE_ENV)

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;