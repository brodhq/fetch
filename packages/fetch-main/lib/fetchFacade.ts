import { AwaitableFetchRequest, FetchArg2, FetchArg3, FetchFn } from './api'
import { buildCallback, buildInit, buildAttrs } from './api/apiFactory'
import { Fetchable } from './fetchable'
import { FetchConfig } from './fetchConfig'
import { createResponse } from './response'

export class Fetch {
    constructor(public config: FetchConfig) {}
    request: FetchFn = <T, TRet>(
        fetchable: Fetchable<T>,
        arg2: FetchArg2<T>,
        arg3?: FetchArg3<T, TRet>
    ) => {
        const init = buildInit(arg2)
        const callback = buildCallback(arg2, arg3)
        const attrs = buildAttrs(init)
        return {
            ...attrs.request,
            then: (onFulfilled) =>
                createResponse(
                    {
                        adapter: this.config.adapter,
                        fetchable,
                    },
                    attrs
                )
                    .then(callback)
                    // @ts-expect-error
                    .then(onFulfilled),
        } as AwaitableFetchRequest<T, TRet>
    }
}
