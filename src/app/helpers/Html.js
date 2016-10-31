import React, {
    Component,
    PropTypes
} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class Html extends Component {
    static propTypes = {
        component: PropTypes.node,
        assets: PropTypes.object,
        store: PropTypes.object
    }

    render() {
        const {
            component,
            store,
            assets
        } = this.props;
        const content = component ? ReactDOM.renderToString(component) : '';
        return (
            <html>
            <head>
                <meta charset="utf-8"/>
                <title>凤凰金融数据统计</title>
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width"/>
                <link rel="icon" type="image/png" href="https://m.fengjr.com/favicon.ico"/>
            </head>
            <body>
            <div id="root" dangerouslySetInnerHTML={{__html: content}}></div>
            <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}}
                    charSet="UTF-8"/>
                    <script src={assets.main.js}></script>
            </body>
            </html>
        )
    }
}