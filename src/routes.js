import React from 'react';
import {
	IndexRoute,
	Route
} from 'react-router';
import {
	App
} from './app/containers';
import './app/theme/common.less';

export default (store, res) => {
	return (
		<Route>
            <Route path="/" component={App} />
        </Route>
	)
}