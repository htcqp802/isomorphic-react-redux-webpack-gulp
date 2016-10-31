import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index';
import clientMiddleware from './clientMiddleware';

export default function createStore(history, client, data) {
    const middleware = [
        clientMiddleware(client)
    ];
    let finalCreateStore;
    if (module.hot) {
        const {persistState} = require('redux-devtools');
        const DevTools = require('../containers/DevTools');
        finalCreateStore = compose(
            applyMiddleware(...middleware),
            window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(_createStore);
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = rootReducer;
            store.replaceReducer(nextReducer);
        });
    } else {
        finalCreateStore = applyMiddleware(...middleware)(_createStore);
    }
    const store = finalCreateStore(rootReducer, data);
    return store;
}
