import { FetchArg3, FetchArg4, FetchFn } from './api'
import { buildCallback, buildInit, buildAttrs } from './api/apiFactory'
import { header, body } from './config'
import { Fetchable } from './fetchable'
import { FetchConfig } from './fetchConfig'
import { createResponse } from './response'

export class Fetch {
    constructor(public config: FetchConfig) {}
    request: FetchFn = Object.assign(
        <T, TRet>(
            fetchable: Fetchable<T>,
            url: string,
            arg3?: FetchArg3<T, TRet>,
            arg4?: FetchArg4<T, TRet>
        ) => {
            const init = buildInit(arg3)
            const callback = buildCallback(arg3, arg4)
            const attrs = buildAttrs(url, init)
            return createResponse(
                {
                    adapter: this.config.adapter,
                    fetchable,
                },
                attrs
            ).then(callback)
        },
        {
            header,
            body,
        }
    )
}
