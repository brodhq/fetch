import { ProtocolFn, ProtocolResponse, Subprotocol } from '@geislabs/protocol'
import { AnyConfig, body, header } from './config'
import { FetchFn } from './fetchConfig'
import { FetchRequest } from './request'
import { FetchResponse } from './response'

export interface FetchSubProtocol<
    TName extends string = string,
    TInit = AnyConfig,
    TSource = any,
    TValue extends ProtocolResponse = ProtocolResponse
> extends Subprotocol<
        TName,
        TInit,
        TSource,
        FetchRequest<TValue>,
        FetchResponse<TValue>,
        FetchFn
    > {}

export interface FetchProtocolFn extends ProtocolFn<any> {
    header: typeof header
    body: typeof body
}
