import {
  DefaultRequestBody,
  MockedRequest,
  RequestParams,
  ResponseComposition,
  RestContext,
  RestHandler,
  RestRequest,
  setupWorker,
  rest
} from 'msw'

type onUnhandledRequest = 'bypass' | 'warn' | 'error'

export interface MswHandler {
  method: 'head' | 'get' | 'post' | 'delete' | 'patch' | 'options'
  url: string
  func: (req: RestRequest<DefaultRequestBody, RequestParams>, res: ResponseComposition<any>, ctx: RestContext) => any
}
export const createhandlers = (handlers: MswHandler[]): RestHandler<MockedRequest<DefaultRequestBody>>[] =>
  handlers.map((handler: MswHandler) => rest[handler.method](handler.url, handler.func)) as any

export const msw = (handlers: MswHandler[], onUnhandledRequest: onUnhandledRequest = 'warn', workerUrl = '/mockServiceWorker.js') => {
  const worker = setupWorker(...createhandlers(handlers))
  worker.start({
    quiet: true,
    onUnhandledRequest,
    serviceWorker: {
      url: workerUrl,
    },
  })
}
