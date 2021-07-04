import { createFetch as createJson } from '@geislabs/json-fetch'
import { plugin as httpPlugin } from '@geislabs/http'
import { config } from '@geislabs/fetch'
import { FetchPlugin } from './pluginTypes'

export const plugin: FetchPlugin = {
    name: 'fetch',
    depends: [httpPlugin],
    register({ http }, {}) {
        // @ts-expect-error
        return config(http.request)([createJson()])
    },
}
