import { AnyConfig, header, body } from '../config'
import { Fetchable } from '../fetchable'
import { FetchRequest } from '../request'
import { FetchResponse } from '../response'

export type FetchCallback<T, TRet = unknown> = (
    response: FetchResponse<T>
) => Promise<TRet> | TRet

export type FetchInit = AnyConfig[]

export type FetchArg3<T, TRet = unknown> = FetchInit | FetchCallback<T, TRet>
export type FetchArg4<T, TRet = unknown> = FetchCallback<T, TRet>

export interface FetchFn {
    header: typeof header
    body: typeof body
    <T>(fetchable: Fetchable<T>, url: string): AwaitableFetchRequest<T>
    <T>(
        fetchable: Fetchable<T>,
        url: string,
        init: FetchInit
    ): AwaitableFetchRequest<T>
    <T, TRet>(
        fetchable: Fetchable<T>,
        url: string,
        init: FetchInit,
        callback: FetchCallback<T, TRet>
    ): AwaitableFetchRequest<TRet>
    <T, TRet>(
        fetchable: Fetchable<T>,
        url: string,
        callback: FetchCallback<T, TRet>
    ): AwaitableFetchRequest<TRet>
    <T, TRet>(
        fetchable: Fetchable<T>,
        url: string,
        callback?: FetchCallback<T, TRet>
    ): AwaitableFetchRequest<TRet>
}

export interface AwaitableFetchRequest<T, TRet = unknown>
    extends FetchRequest<T> {
    then(
        onFulfilled?: ((value: T) => any | PromiseLike<TRet>) | undefined | null
    ): Promise<TRet | never>
}
