import Express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import compression from 'compression';
import favicon from 'serve-favicon';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './app/helpers/Html';
import createHistory from 'react-router/lib/createMemoryHistory';
import {
	match,
	RouterContext
} from 'react-router';
import getRoutes from './routes';
import createStore from './app/store/create';
import {
	syncHistoryWithStore
} from 'react-router-redux';
import {
	Provider
} from 'react-redux';
import ApiClient from './app/helpers/ApiClient';
import cookieParser from 'cookie-parser';
import assets from './assets';



const port = process.argv.PORT || 5011;
const targetUrl = 'http://test.fengjr.inc';
const app = new Express();
const server = new http.Server(app);

const proxy = httpProxy.createProxyServer({
	target: targetUrl,
	ws: false
});

app.use(cookieParser());
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
	if (req.url.indexOf('/api/v2') > -1 || req.url.indexOf('/so/api/v2') > -1) {
		proxy.web(req, res)
	} else {
		next();
	}
});


proxy.on('error', (error, req, res) => {
	let json;
	if (error.code !== 'ECONNRESET') {
		console.error('proxy error', error);
	}
	if (!res.headersSent) {
		res.writeHead(500, {
			'content-type': 'application/json'
		});
	}


	json = {
		error: 'proxy_error',
		reason: error.message
	};
	res.end(JSON.stringify(json));
});

app.use((req, res) => {
	const client = new ApiClient(req);
	const memoryHistory = createHistory(req.originalUrl);
	const store = createStore(memoryHistory, client);
	const history = syncHistoryWithStore(memoryHistory, store);
	match({
		history,
		routes: getRoutes(store, res),
		location: req.originalUrl
	}, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			const component = (
				<Provider store={store} key="provider">
                        <RouterContext {...renderProps} />
                    </Provider>
			);
			res.status(200);
			res.send('<!doctype html>\n' +
				ReactDOM.renderToString(<Html assets={assets} component={component}
                                                  store={store}/>));
		} else {
			res.status(404).send('页面没有找到');
		}
	})

});

app.listen(port, '0.0.0.0', () => {

})