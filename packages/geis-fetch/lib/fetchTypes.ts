import { ProtocolFn, ProtocolResponse, Subprotocol } from '@geislabs/protocol'
import { AnyConfig, body, header } from './config'
import { FetchAdapter } from './fetchAdapter'
import { FetchFn } from './fetchConfig'
import { FetchRequest } from './request'
import { FetchResponse } from './response'

export interface FetchSubProtocol<
    TName extends string = string,
    TInit = AnyConfig,
    TSource = any,
    TValue = any
> extends Subprotocol<
        TName,
        TInit,
        TSource,
        FetchRequest<TValue>,
        FetchResponse<TValue>,
        FetchFn
    > {}

export interface FetchProtocolFn<
    TAdapter extends FetchAdapter
> extends ProtocolFn<
        {
            [P in TAdapter['name']]: Extract<
                TAdapter,
                { name: P }
            > extends FetchAdapter<any, infer TVal>
                ? FetchSubProtocol<P, any, any, TVal>
                : any
        }
    > {
    header: typeof header
    body: typeof body
}
