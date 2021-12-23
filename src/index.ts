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
import { setupServer } from 'msw/node'

export interface MswHandler {
  method: 'head' | 'get' | 'post' | 'delete' | 'patch' | 'options'
  url: string
  func: (req: RestRequest<DefaultRequestBody, RequestParams>, res: ResponseComposition<any>, ctx: RestContext) => any
}
const createhandlers = (handlers: MswHandler[]): RestHandler<MockedRequest<DefaultRequestBody>>[] =>
  handlers.map((handler: MswHandler) => rest[handler.method](handler.url, handler.func)) as any

export const msw = (handlers: MswHandler[], workerUrl = '/mockServiceWorker.js') => {
  const worker = setupWorker(...createhandlers(handlers))
  worker.start({
    quiet: true,
    serviceWorker: {
      url: workerUrl,
    },
  })
}

export const server = (handlers: MswHandler[]) => {
  setupServer(...createhandlers(handlers))
}
