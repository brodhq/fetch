import { createProtocol } from '@geislabs/protocol'
import { header, body } from './config'
import { FetchFn } from './fetchConfig'
import { FetchProtocolFn } from './fetchTypes'
import { nodeFetch } from './node/nodeFacade'

/**
 * Create fetch API
 * @param adapter
 * @returns
 */
export const config = (adapter: FetchFn = nodeFetch): FetchProtocolFn =>
    Object.assign(createProtocol({}), {
        header,
        body,
    })

/**
 * Fetch resources
 */
export const fetch: FetchProtocolFn = config(nodeFetch)
