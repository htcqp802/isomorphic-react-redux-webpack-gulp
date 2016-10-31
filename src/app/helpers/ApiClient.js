import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    if (__SERVER__) {
        return '10.10.52.180:16742' + adjustedPath;
    }
    return adjustedPath;
}

export default class ApiClient {
    constructor(req) {
        methods.forEach((method) =>
            this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
                const request = superagent[method](formatUrl(path));
                if (params) {
                    request.query(params);
                }
                if (__SERVER__ && req.get('cookie')) {
                    request.set('cookie', req.get('cookie'));
                }
                if (data) {
                    request.send(data);
                }
                request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
            }));
    }
    empty() {}
}
