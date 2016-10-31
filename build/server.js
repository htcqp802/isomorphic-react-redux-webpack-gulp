require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _express = __webpack_require__(1);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _http = __webpack_require__(2);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _httpProxy = __webpack_require__(3);
	
	var _httpProxy2 = _interopRequireDefault(_httpProxy);
	
	var _compression = __webpack_require__(4);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _serveFavicon = __webpack_require__(5);
	
	var _serveFavicon2 = _interopRequireDefault(_serveFavicon);
	
	var _path = __webpack_require__(6);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(8);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _Html = __webpack_require__(9);
	
	var _Html2 = _interopRequireDefault(_Html);
	
	var _createMemoryHistory = __webpack_require__(11);
	
	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
	
	var _reactRouter = __webpack_require__(12);
	
	var _routes = __webpack_require__(13);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _create = __webpack_require__(30);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _reactRouterRedux = __webpack_require__(33);
	
	var _reactRedux = __webpack_require__(35);
	
	var _ApiClient = __webpack_require__(36);
	
	var _ApiClient2 = _interopRequireDefault(_ApiClient);
	
	var _cookieParser = __webpack_require__(38);
	
	var _cookieParser2 = _interopRequireDefault(_cookieParser);
	
	var _assets = __webpack_require__(39);
	
	var _assets2 = _interopRequireDefault(_assets);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var port = process.argv.PORT || 5011;
	var targetUrl = 'http://test.fengjr.inc';
	var app = new _express2.default();
	var server = new _http2.default.Server(app);
	
	var proxy = _httpProxy2.default.createProxyServer({
		target: targetUrl,
		ws: false
	});
	
	app.use((0, _cookieParser2.default)());
	app.use((0, _compression2.default)());
	app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, '..', 'favicon.ico')));
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
	app.use(function (req, res, next) {
		if (req.url.indexOf('/api/v2') > -1 || req.url.indexOf('/so/api/v2') > -1) {
			proxy.web(req, res);
		} else {
			next();
		}
	});
	
	proxy.on('error', function (error, req, res) {
		var json = void 0;
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
	
	app.use(function (req, res) {
		var client = new _ApiClient2.default(req);
		var memoryHistory = (0, _createMemoryHistory2.default)(req.originalUrl);
		var store = (0, _create2.default)(memoryHistory, client);
		var history = (0, _reactRouterRedux.syncHistoryWithStore)(memoryHistory, store);
		(0, _reactRouter.match)({
			history: history,
			routes: (0, _routes2.default)(store, res),
			location: req.originalUrl
		}, function (error, redirectLocation, renderProps) {
			if (error) {
				res.status(500).send(error.message);
			} else if (redirectLocation) {
				res.redirect(302, redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				var component = _react2.default.createElement(
					_reactRedux.Provider,
					{ store: store, key: 'provider' },
					_react2.default.createElement(_reactRouter.RouterContext, renderProps)
				);
				res.status(200);
				res.send('<!doctype html>\n' + _server2.default.renderToString(_react2.default.createElement(_Html2.default, { assets: _assets2.default, component: component,
					store: store })));
			} else {
				res.status(404).send('页面没有找到');
			}
		});
	});
	
	app.listen(port, '0.0.0.0', function () {});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("http-proxy");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(8);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _serializeJavascript = __webpack_require__(10);
	
	var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Html = (_temp = _class = function (_Component) {
	    _inherits(Html, _Component);
	
	    function Html() {
	        _classCallCheck(this, Html);
	
	        return _possibleConstructorReturn(this, (Html.__proto__ || Object.getPrototypeOf(Html)).apply(this, arguments));
	    }
	
	    _createClass(Html, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var component = _props.component;
	            var store = _props.store;
	            var assets = _props.assets;
	
	            var content = component ? _server2.default.renderToString(component) : '';
	            return _react2.default.createElement(
	                'html',
	                null,
	                _react2.default.createElement(
	                    'head',
	                    null,
	                    _react2.default.createElement('meta', { charset: 'utf-8' }),
	                    _react2.default.createElement(
	                        'title',
	                        null,
	                        '\u51E4\u51F0\u91D1\u878D\u6570\u636E\u7EDF\u8BA1'
	                    ),
	                    _react2.default.createElement('meta', { name: 'description', content: '' }),
	                    _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width' }),
	                    _react2.default.createElement('link', { rel: 'icon', type: 'image/png', href: 'https://m.fengjr.com/favicon.ico' })
	                ),
	                _react2.default.createElement(
	                    'body',
	                    null,
	                    _react2.default.createElement('div', { id: 'root', dangerouslySetInnerHTML: { __html: content } }),
	                    _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: 'window.__data=' + (0, _serializeJavascript2.default)(store.getState()) + ';' },
	                        charSet: 'UTF-8' }),
	                    _react2.default.createElement('script', { src: assets.main.js })
	                )
	            );
	        }
	    }]);
	
	    return Html;
	}(_react.Component), _class.propTypes = {
	    component: _react.PropTypes.node,
	    assets: _react.PropTypes.object,
	    store: _react.PropTypes.object
	}, _temp);
	exports.default = Html;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("serialize-javascript");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("react-router/lib/createMemoryHistory");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(12);
	
	var _containers = __webpack_require__(14);
	
	__webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (store, res) {
		return _react2.default.createElement(
			_reactRouter.Route,
			null,
			_react2.default.createElement(_reactRouter.Route, { path: '/', component: _containers.App })
		);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DevTools = exports.App = undefined;
	
	var _App2 = __webpack_require__(15);
	
	var _App3 = _interopRequireDefault(_App2);
	
	var _DevTools2 = __webpack_require__(21);
	
	var _DevTools3 = _interopRequireDefault(_DevTools2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.App = _App3.default;
	exports.DevTools = _DevTools3.default;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _MuiThemeProvider = __webpack_require__(16);
	
	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);
	
	var _components = __webpack_require__(17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var App = function (_Component) {
	  _inherits(App, _Component);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	  }
	
	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _MuiThemeProvider2.default,
	        null,
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(_components.Nav, null),
	          'hello'
	        )
	      );
	    }
	  }]);
	
	  return App;
	}(_react.Component);
	
	exports.default = App;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Nav = undefined;
	
	var _Nav2 = __webpack_require__(18);
	
	var _Nav3 = _interopRequireDefault(_Nav2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Nav = _Nav3.default;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(12);
	
	var _materialUi = __webpack_require__(19);
	
	var _close = __webpack_require__(20);
	
	var _close2 = _interopRequireDefault(_close);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Nav = function (_Component) {
	    _inherits(Nav, _Component);
	
	    function Nav(props) {
	        _classCallCheck(this, Nav);
	
	        var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));
	
	        _this.handleToggle = function () {
	            return _this.setState({ open: !_this.state.open });
	        };
	
	        _this.handleClose = function () {
	            return _this.setState({ open: false });
	        };
	
	        _this.state = { open: false };
	        return _this;
	    }
	
	    _createClass(Nav, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_materialUi.AppBar, {
	                    onTouchTap: this.handleToggle
	                }),
	                _react2.default.createElement(
	                    _materialUi.Drawer,
	                    {
	                        docked: false,
	                        width: 200,
	                        open: this.state.open,
	                        onRequestChange: function onRequestChange(open) {
	                            return _this2.setState({ open: open });
	                        }
	                    },
	                    _react2.default.createElement(_materialUi.AppBar, {
	                        iconElementLeft: _react2.default.createElement(
	                            _materialUi.IconButton,
	                            { onTouchTap: this.handleClose },
	                            _react2.default.createElement(_close2.default, null)
	                        )
	                    }),
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: '/', onTouchTap: this.handleClose },
	                        _react2.default.createElement(
	                            _materialUi.MenuItem,
	                            null,
	                            '\u7EFC\u5408\u7EDF\u8BA1'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: '/newUsers', onTouchTap: this.handleClose },
	                        _react2.default.createElement(
	                            _materialUi.MenuItem,
	                            null,
	                            '\u65B0\u7528\u6237\u7EDF\u8BA1'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: '/remainingAmount', onTouchTap: this.handleClose },
	                        _react2.default.createElement(
	                            _materialUi.MenuItem,
	                            null,
	                            '\u5E73\u53F0\u5269\u4F59\u8D44\u91D1\u7EDF\u8BA1'
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return Nav;
	}(_react.Component);
	
	exports.default = Nav;

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("material-ui");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/navigation/close");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxDevtools = __webpack_require__(22);
	
	var _reduxDevtoolsLogMonitor = __webpack_require__(23);
	
	var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);
	
	var _reduxDevtoolsDockMonitor = __webpack_require__(24);
	
	var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);
	
	var _reduxSliderMonitor = __webpack_require__(25);
	
	var _reduxSliderMonitor2 = _interopRequireDefault(_reduxSliderMonitor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _reduxDevtools.createDevTools)(_react2.default.createElement(
	  _reduxDevtoolsDockMonitor2.default,
	  { toggleVisibilityKey: 'ctrl-h',
	    changePositionKey: 'ctrl-q',
	    changeMonitorKey: 'ctrl-m' },
	  _react2.default.createElement(_reduxDevtoolsLogMonitor2.default, null),
	  _react2.default.createElement(_reduxSliderMonitor2.default, null)
	));

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-log-monitor");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-dock-monitor");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("redux-slider-monitor");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(29)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./common.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./common.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, "*{\n    margin: 0;\n    padding: 0;\n}\na{\n    text-decoration: none !important;\n}", ""]);
	
	// exports


/***/ },
/* 28 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = createStore;
	
	var _redux = __webpack_require__(31);
	
	var _index = __webpack_require__(32);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _clientMiddleware = __webpack_require__(34);
	
	var _clientMiddleware2 = _interopRequireDefault(_clientMiddleware);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createStore(history, client, data) {
	    var middleware = [(0, _clientMiddleware2.default)(client)];
	    var finalCreateStore = void 0;
	    if (false) {
	        var _require = require('redux-devtools');
	
	        var persistState = _require.persistState;
	
	        var DevTools = require('../containers/DevTools');
	        finalCreateStore = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware), window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(), persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)))(_redux.createStore);
	        // Enable Webpack hot module replacement for reducers
	        module.hot.accept('../reducers', function () {
	            var nextReducer = _index2.default;
	            store.replaceReducer(nextReducer);
	        });
	    } else {
	        finalCreateStore = _redux.applyMiddleware.apply(undefined, middleware)(_redux.createStore);
	    }
	    var store = finalCreateStore(_index2.default, data);
	    return store;
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _redux = __webpack_require__(31);
	
	var _reactRouterRedux = __webpack_require__(33);
	
	exports.default = (0, _redux.combineReducers)({
		routing: _reactRouterRedux.routerReducer
	});

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("react-router-redux");

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = clientMiddleware;
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function clientMiddleware(client) {
	    return function (_ref) {
	        var dispatch = _ref.dispatch;
	        var getState = _ref.getState;
	
	        return function (next) {
	            return function (action) {
	                if (typeof action === 'function') {
	                    return action(dispatch, getState);
	                }
	                var promise = action.promise;
	                var types = action.types;
	
	                var rest = _objectWithoutProperties(action, ['promise', 'types']);
	
	                if (!promise) {
	                    return next(action);
	                }
	
	                var _types = _slicedToArray(types, 3);
	
	                var REQUEST = _types[0];
	                var SUCCESS = _types[1];
	                var FAILURE = _types[2];
	
	                next(_extends({}, rest, { type: REQUEST }));
	                var actionPromise = promise(client);
	                actionPromise.then(function (result) {
	                    return next(_extends({}, rest, { result: result, type: SUCCESS }));
	                }).catch(function (error) {
	                    return next(_extends({}, rest, { error: error, type: FAILURE }));
	                });
	                return actionPromise;
	            };
	        };
	    };
	}

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _superagent = __webpack_require__(37);
	
	var _superagent2 = _interopRequireDefault(_superagent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var methods = ['get', 'post', 'put', 'patch', 'del'];
	
	function formatUrl(path) {
	    var adjustedPath = path[0] !== '/' ? '/' + path : path;
	    if (__SERVER__) {
	        return '10.10.52.180:16742' + adjustedPath;
	    }
	    return adjustedPath;
	}
	
	var ApiClient = function () {
	    function ApiClient(req) {
	        var _this = this;
	
	        _classCallCheck(this, ApiClient);
	
	        methods.forEach(function (method) {
	            return _this[method] = function (path) {
	                var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	                var params = _ref.params;
	                var data = _ref.data;
	                return new Promise(function (resolve, reject) {
	                    var request = _superagent2.default[method](formatUrl(path));
	                    if (params) {
	                        request.query(params);
	                    }
	                    if (__SERVER__ && req.get('cookie')) {
	                        request.set('cookie', req.get('cookie'));
	                    }
	                    if (data) {
	                        request.send(data);
	                    }
	                    request.end(function (err) {
	                        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	                        var body = _ref2.body;
	                        return err ? reject(body || err) : resolve(body);
	                    });
	                });
	            };
	        });
	    }
	
	    _createClass(ApiClient, [{
	        key: 'empty',
	        value: function empty() {}
	    }]);
	
	    return ApiClient;
	}();
	
	exports.default = ApiClient;

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("superagent");

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("./assets");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map