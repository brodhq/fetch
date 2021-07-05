import { FetchFn } from './api'
import { FetchConfig } from './fetchConfig'
import { Fetch } from './fetchFacade'
import { createHttp } from './http'
import { createProtocol } from './middleware'

/**
 * @internal
 */
export function config({
    adapter = createHttp(),
    ...config
}: Partial<FetchConfig> = {}): FetchFn {
    return createProtocol(Fetch, {
        adapter,
        ...config,
    })
}
