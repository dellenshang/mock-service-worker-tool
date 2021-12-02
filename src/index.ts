import {
  DefaultRequestBody,
  MockedRequest,
  RequestParams,
  ResponseComposition,
  RestContext,
  RestHandler,
  RestRequest,
  setupWorker,
} from 'msw'
import { rest } from 'msw'

export interface MswHandle {
  method: 'head' | 'get' | 'post' | 'delete' | 'patch' | 'options'
  url: string
  func: (req: RestRequest<DefaultRequestBody, RequestParams>, res: ResponseComposition<any>, ctx: RestContext) => any
}
const createhandles = (handles: MswHandle[]): RestHandler<MockedRequest<DefaultRequestBody>>[] =>
  handles.map((handle: MswHandle) => rest[handle.method](handle.url, handle.func)) as any

export const msw = (handles: MswHandle[], env = 'development', workerUrl = '/mockServiceWorker.js') => {
  if (process.env.NODE_ENV === env) {
    const worker = setupWorker(...createhandles(handles))
    worker.start({
      quiet: true,
      serviceWorker: {
        url: workerUrl,
      },
    })
  }
}
