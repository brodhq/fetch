import { FetchCallback, FetchInit } from '../api'
import { Fetchable } from '../fetchable'
import { Middleware, MiddlewareAPI, Protocol } from './middlewareTypes'

export type ProtocolCallback<T, TRet = unknown> = (
    response: T
) => Promise<TRet> | TRet

export type ProtocolFn<T, TRet = unknown> = (
    type: Fetchable<T>,
    init: FetchInit<T>,
    callback?: ProtocolCallback<T, TRet>
) => ProtocolResult<TRet>

export interface ProtocolResult<T> extends Promise<T> {}

export type ProtocolCreator = <TConf, TVal, TRet>(
    protocol: Protocol<TConf, TVal, TRet>,
    config: TConf,
    enhancer?: ProtocolEnhancer
) => ProtocolFn<TVal, TRet>
export type ProtocolEnhancer = (next: ProtocolCreator) => ProtocolCreator
export type ProtocolEnhancerProtocolCreator = <TVal, TRet>(
    app: ProtocolFn<TVal, TRet>
) => ProtocolFn<TVal, TRet>

export const createProtocol = <TConf, TVal, TRet>(
    definition: Protocol<TConf, TVal, TRet>,
    config: TConf,
    enhancer?: ProtocolEnhancer
): ProtocolFn<TVal, TRet> => {
    if (enhancer) {
        return enhancer(createProtocol)(definition, config)
    }
    return async (
        type,
        init,
        // @ts-expect-error
        callback = (value) => value
    ) => definition(config)(type, init, callback)
}

export function applyMiddleware(
    ...middlewares: Middleware[]
): ProtocolEnhancer {
    return (createProtocol) => (definition, config) => {
        const api: MiddlewareAPI = {}
        const instance = createProtocol(definition, config)
        const chain = middlewares.map((middleware) => middleware(api))
        const run = compose(...chain)(instance)
        return run
    }
}

export function compose(...funcs: Function[]) {
    if (funcs.length === 0) {
        // infer the argument type so it is usable in inference down the line
        return <T>(arg: T) => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce(
        (a, b) =>
            (...args: any) =>
                a(b(...args))
    )
}
