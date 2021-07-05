import { FetchFn } from './api'
import { FetchConfig } from './fetchConfig'
import { fetchProtocol } from './fetchFacade'
import { createHttp } from './http'
import { createProtocol } from './middleware'
import { FetchResponse } from './response'

/**
 * @internal
 */
export function config({
    adapter = createHttp(),
    ...config
}: Partial<FetchConfig> = {}): FetchFn {
    return createProtocol<FetchConfig, FetchResponse>(fetchProtocol, {
        adapter,
        ...config,
    })
}
