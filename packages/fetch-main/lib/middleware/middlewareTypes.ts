import { FetchCallback, FetchFn, FetchInit } from '../api'
import { Fetchable } from '../fetchable'
import { FetchRequest } from '../request'
import {
    ProtocolFn,
    ProtocolCallback,
    ProtocolResult,
} from './middlewareFacade'

export type Protocol<TConf, TVal, TRet> = (
    config: TConf
) => ProtocolFn<TVal, TRet>

export interface Middleware {
    (api: MiddlewareAPI): <T = unknown, TRet = unknown>(
        next: ProtocolFn<T, TRet>
    ) => (
        type: Fetchable,
        init: FetchInit<T>,
        callback: ProtocolCallback<T, TRet>
    ) => ProtocolResult<TRet>
}

export interface MiddlewareAPI {}
