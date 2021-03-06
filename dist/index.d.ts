import { DefaultRequestBody, MockedRequest, RequestParams, ResponseComposition, RestContext, RestHandler, RestRequest } from 'msw';
declare type onUnhandledRequest = 'bypass' | 'warn' | 'error';
export interface MswHandler {
    method: 'head' | 'get' | 'post' | 'delete' | 'patch' | 'options';
    url: string;
    func: (req: RestRequest<DefaultRequestBody, RequestParams>, res: ResponseComposition<any>, ctx: RestContext) => any;
}
export declare const createhandlers: (handlers: MswHandler[]) => RestHandler<MockedRequest<DefaultRequestBody>>[];
export declare const msw: (handlers: MswHandler[], onUnhandledRequest?: onUnhandledRequest, workerUrl?: string) => void;
export {};
