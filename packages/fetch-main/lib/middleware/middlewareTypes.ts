import { FetchCallback, FetchFn, FetchInit } from '../api'
import { Fetchable } from '../fetchable'
import { FetchConfig } from '../fetchConfig'
import { FetchResponse } from '../response'

export interface FetchProtocol extends Protocol<FetchConfig, FetchResponse> {}

export type ProtocolCallback<T, TRet = unknown, TCon = unknown> = (
    response: T,
    index: number,
    context: TCon
) => Promise<TRet> | TRet

export type ProtocolFn<TCon = unknown> = <T, TRet = unknown>(
    type: Fetchable<T>,
    init: FetchInit<T>,
    callback?: ProtocolCallback<T, TRet, TCon>
) => ProtocolResult<TRet>

export interface ProtocolResult<T> extends Promise<T> {}

export type ProtocolCreator = <TConf, TCon>(
    protocol: Protocol<TConf, TCon>,
    config: TConf,
    enhancer?: ProtocolEnhancer
) => ProtocolFn
export type ProtocolEnhancer = (next: ProtocolCreator) => ProtocolCreator
export type ProtocolEnhancerProtocolCreator = <TVal, TRet>(
    app: ProtocolFn
) => ProtocolFn

export type Protocol<TConf, TCon = unknown> = (
    config: TConf
) => ProtocolFn<TCon>

export interface Middleware {
    (api: MiddlewareAPI): <T = unknown, TRet = unknown>(
        next: ProtocolFn
    ) => (
        type: Fetchable,
        init: FetchInit<T>,
        callback: ProtocolCallback<T, TRet>
    ) => ProtocolResult<TRet>
}

export interface MiddlewareAPI {}
