import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';

function start() {
    ReactDOM.render((
        <App></App>
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
