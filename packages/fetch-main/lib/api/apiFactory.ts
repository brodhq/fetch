import { isHeader } from '../config'
import { CreateResponseAttrs } from '../response/responseAttrs'
import {
    FetchArg2,
    FetchArg3,
    FetchCallback,
    FetchInit,
    FetchObjectInit,
} from './apiTypes'

export function buildCallback<T, TRet>(
    arg3?: FetchArg2<T>,
    arg4?: FetchArg3<T, TRet>
): FetchCallback<T, TRet> | null {
    if (typeof arg3 === 'function') {
        return arg3
    }
    return arg4 ?? null
}

export function buildInit<T>(arg3: FetchArg2<T>): FetchObjectInit<T> {
    if (typeof arg3 === 'string') {
        return { url: arg3 }
    }
    return arg3
}

export function buildAttrs<T>(
    init: FetchObjectInit<T>
): CreateResponseAttrs<T> {
    return {
        request: init,
    }
}
