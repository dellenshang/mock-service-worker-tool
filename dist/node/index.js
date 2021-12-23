import { createhandlers } from '../index';
import { setupServer } from 'msw/node';
export var server = function (handlers) {
    setupServer.apply(void 0, createhandlers(handlers));
};
