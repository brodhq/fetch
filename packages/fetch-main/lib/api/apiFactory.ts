import { isHeader } from '../config'
import { CreateResponseAttrs } from '../response/responseAttrs'
import { FetchArg3, FetchArg4, FetchCallback, FetchInit } from './apiTypes'

export function buildCallback<T, TRet>(
    arg3?: FetchArg3<T, TRet>,
    arg4?: FetchArg4<T, TRet>
): FetchCallback<T, TRet> | null {
    if (typeof arg3 === 'function') {
        return arg3
    }
    return arg4 ?? null
}

export function buildInit<T, TRet>(arg3?: FetchArg3<T, TRet>): FetchInit {
    if (Array.isArray(arg3)) {
        return arg3
    }
    return []
}

export function buildAttrs<T>(
    url: string,
    init: FetchInit
): CreateResponseAttrs<T> {
    return {
        request: {
            url,
            headers: init
                .filter(isHeader)
                .reduce(
                    (acc, config) => ({ ...acc, [config.name]: config.value }),
                    {}
                ),
        },
    }
}
