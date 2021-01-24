import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import {startGame} from 'actions/game'

import App from 'components/App';

function start() {
    ReactDOM.render((
        <Provider store={store}>
            <App></App>
        </Provider>
    ), document.getElementById('app'));
}


function domReady(fn, context) {

    function onReady(event) {
        window.removeEventListener("DOMContentLoaded", onReady);
        fn.call(context, event);
    }

    function onReadyIe(event) {
        if (window.readyState === "complete") {
            window.detachEvent("onreadystatechange", onReadyIe);
            fn.call(context, event);
        }
    }

    window.addEventListener && window.addEventListener("DOMContentLoaded", onReady) ||
    window.attachEvent      && window.attachEvent("onreadystatechange", onReadyIe);
}

domReady(start, this);
