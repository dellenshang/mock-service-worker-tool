import { setupWorker, } from 'msw';
import { rest } from 'msw';
var createhandles = function (handles) {
    return handles.map(function (handle) { return rest[handle.method](handle.url, handle.func); });
};
export var msw = function (handles, env, workerUrl) {
    if (env === void 0) { env = 'development'; }
    if (workerUrl === void 0) { workerUrl = '/mockServiceWorker.js'; }
    if (process.env.NODE_ENV === env) {
        var worker = setupWorker.apply(void 0, createhandles(handles));
        worker.start({
            quiet: true,
            serviceWorker: {
                url: workerUrl,
            },
        });
    }
};
