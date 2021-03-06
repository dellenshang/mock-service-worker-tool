import { setupWorker, rest } from 'msw';
export var createhandlers = function (handlers) {
    return handlers.map(function (handler) { return rest[handler.method](handler.url, handler.func); });
};
export var msw = function (handlers, onUnhandledRequest, workerUrl) {
    if (onUnhandledRequest === void 0) { onUnhandledRequest = 'warn'; }
    if (workerUrl === void 0) { workerUrl = '/mockServiceWorker.js'; }
    var worker = setupWorker.apply(void 0, createhandlers(handlers));
    worker.start({
        quiet: true,
        onUnhandledRequest: onUnhandledRequest,
        serviceWorker: {
            url: workerUrl,
        },
    });
};
