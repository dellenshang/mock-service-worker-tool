import { setupWorker, rest } from 'msw';
import { setupServer } from 'msw/node';
var createhandlers = function (handlers) {
    return handlers.map(function (handler) { return rest[handler.method](handler.url, handler.func); });
};
export var msw = function (handlers, env, workerUrl) {
    if (env === void 0) { env = 'development'; }
    if (workerUrl === void 0) { workerUrl = '/mockServiceWorker.js'; }
    if (process.env.NODE_ENV === env) {
        var worker = setupWorker.apply(void 0, createhandlers(handlers));
        worker.start({
            quiet: true,
            serviceWorker: {
                url: workerUrl,
            },
        });
    }
};
export var server = function (handlers) {
    setupServer.apply(void 0, createhandlers(handlers));
};
