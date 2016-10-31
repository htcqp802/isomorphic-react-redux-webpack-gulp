import React from 'react';
import {
	render
} from 'react-dom'
import {
	Provider
} from 'react-redux';
import createStore from './app/store/create';
import {
	Router,
	browserHistory
} from 'react-router';
import DevTools from './app/containers/DevTools';
import getRoutes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ApiClient from './app/helpers/ApiClient';
import {
	syncHistoryWithStore
} from 'react-router-redux';

injectTapEventPlugin();

const client = new ApiClient();
const store = createStore(browserHistory, client, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
	<Router history={history} >
  {getRoutes(store)}
  </Router>
)
if (module.hot && !window.devToolsExtension) {
	render(
		<Provider store={store}>
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
		document.getElementById('root')
	);
} else {
	render(
		<Provider store={store}>
      {component}
    </Provider>,
		document.getElementById('root')
	);
}