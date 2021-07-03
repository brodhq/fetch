import { AnyConfig, header, body } from '../config'
import { Fetchable } from '../fetchable'
import { FetchRequest } from '../request'
import { CreateRequestAttrs } from '../request/requestAttrs'
import { FetchResponse } from '../response'

export type FetchCallback<T, TRet = unknown> = (
    response: FetchResponse<T>
) => Promise<TRet> | TRet

export type FetchUrlInit = string
export type FetchObjectInit<T = unknown> = Pick<CreateRequestAttrs<T>, 'url'> &
    Partial<CreateRequestAttrs<T>>
export type FetchInit<T> = FetchUrlInit | FetchObjectInit<T>

export type FetchArg2<T> = FetchInit<T>
export type FetchArg3<T, TRet = unknown> = FetchCallback<T, TRet>

export interface FetchFn {
    header: typeof header
    body: typeof body
    <T, TRet>(
        fetchable: Fetchable<T>,
        init: FetchInit<T>,
        callback?: FetchCallback<T, TRet>
    ): AwaitableFetchRequest<T, TRet>
}

export interface AwaitableFetchRequest<T, TRet = unknown>
    extends FetchRequest<T> {
    then(
        onFulfilled?: ((value: T) => any | PromiseLike<TRet>) | undefined | null
    ): Promise<TRet | never>
}
