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
    /**
     * Fetch data at url as JSON
     *
     * @param fetchable - Data type
     * @param init - A URL string or request object
     * @example
     * ```typescript
     * const response = fetch(Json, 'https://example.com/posts/1')
     * response.status
     * // => 200
     * ```
     */
    <T, TRet>(
        fetchable: Fetchable<T>,
        init: FetchInit<T>
    ): AwaitableFetchRequest<T, TRet>
    /**
     * Fetch data at url as JSON and parse response in callback
     *
     * @param fetchable - Data type
     * @param init - A URL string or request object
     * @example
     * ```typescript
     * const response = fetch(Json, 'https://example.com/posts/1', response => ({
     *      title: response.data['title'].toString(),
     *      content: response.data['content'].toString(),
     *      postedAt: response.data['date'].toDate()
     * }))
     * response.title
     * // => 'my post'
     * ```
     */
    <T, TRet>(
        fetchable: Fetchable<T>,
        init: FetchInit<T>,
        callback: FetchCallback<T, TRet>
    ): AwaitableFetchRequest<T, TRet>
    /**
     * @internal
     */
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
