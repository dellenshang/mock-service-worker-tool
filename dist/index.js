import { setupWorker, rest } from 'msw';
import { setupServer } from 'msw/node';
var createhandlers = function (handlers) {
    return handlers.map(function (handler) { return rest[handler.method](handler.url, handler.func); });
};
export var msw = function (handlers, workerUrl) {
    if (workerUrl === void 0) { workerUrl = '/mockServiceWorker.js'; }
    var worker = setupWorker.apply(void 0, createhandlers(handlers));
    worker.start({
        quiet: true,
        serviceWorker: {
            url: workerUrl,
        },
    });
};
export var server = function (handlers) {
    setupServer.apply(void 0, createhandlers(handlers));
};
