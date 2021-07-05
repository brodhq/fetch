import {
    Middleware,
    MiddlewareAPI,
    Protocol,
    ProtocolEnhancer,
    ProtocolFn,
} from './middlewareTypes'

export const createProtocol = <TConf, TCon = unknown>(
    definition: Protocol<TConf, TCon>,
    config: TConf,
    enhancer?: ProtocolEnhancer
): ProtocolFn<TCon> => {
    if (enhancer) {
        // @ts-expect-error
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
