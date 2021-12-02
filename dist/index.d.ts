import { DefaultRequestBody, RequestParams, ResponseComposition, RestContext, RestRequest } from 'msw';
export interface MswHandle {
    method: 'head' | 'get' | 'post' | 'delete' | 'patch' | 'options';
    url: string;
    func: (req: RestRequest<DefaultRequestBody, RequestParams>, res: ResponseComposition<any>, ctx: RestContext) => any;
}
export declare const msw: (handles: MswHandle[], env?: string, workerUrl?: string) => void;