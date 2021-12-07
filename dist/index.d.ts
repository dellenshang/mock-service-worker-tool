import { DefaultRequestBody, RequestParams, ResponseComposition, RestContext, RestRequest } from 'msw';
export interface MswHandler {
    method: 'head' | 'get' | 'post' | 'delete' | 'patch' | 'options';
    url: string;
    func: (req: RestRequest<DefaultRequestBody, RequestParams>, res: ResponseComposition<any>, ctx: RestContext) => any;
}
export declare const msw: (handlers: MswHandler[], env?: string, workerUrl?: string) => void;
export declare const server: (handlers: MswHandler[]) => void;
