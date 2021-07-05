/**
 * A set of functions for working with maps.
 *
 * Many functions for maps, which implement the Enumerable protocol, are found in the Enum module. Additionally, the following functions for maps are found in Kernel:
 *
 * @module
 * @example
 * ```typescript
 * import { fetch } from '@brod/fetch'
 * import { Json } from '@brod/json'
 *
 * const url = 'https://jsonplaceholder.typicode.com/todos/1'
 * const response = fetch(Json, url, ({ data }) => ({
 *      id: data['id'].toInteger(),
 *      title: data['title'].toText(),
 *      completed: data['completed'].toBoolean()
 * }))
 * response.data === {
 *      id: 1,
 *      title: 'quis ut nam facilis et officia qui',
 *      completed: true
 * }
 * // => true
 * ```
 *
 */
import { config } from './fetchProvider'
import { impl } from './fetchable'
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

export const Symbol = { impl: impl as typeof impl }
