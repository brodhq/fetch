import { FetchFn } from './api/apiTypes'
import { FetchConfig } from './fetchConfig'
import { Fetch } from './fetchFacade'
import { createHttp } from './http'

export function config({
    adapter = createHttp(),
    ...config
}: Partial<FetchConfig> = {}): FetchFn {
    const instance = new Fetch({ adapter, ...config })
    return instance.request
}
