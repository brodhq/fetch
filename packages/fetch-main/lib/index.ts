/**
 * A set of functions for working with maps.
 *
 * Many functions for maps, which implement the Enumerable protocol, are found in the Enum module. Additionally, the following functions for maps are found in Kernel:
 *
 * @module
 * @example
 * ```typescript
 * const response = fetch(Json, 'https://example.com/posts/1')
 * response.status
 * // => 200
 * ```
 *
 */
import { config } from './fetchProvider'

/**
 * @internal
 */
export const fetch = config()

export { config } from './fetchProvider'
export { FetchAdapter } from './fetchAdapter'
export { Fetchable } from './fetchable'
export { FetchRequest } from './request'
export { FetchResponse } from './response'
export { FetchFn } from './api'
