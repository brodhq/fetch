import { createProtocol, Protocol } from '@geislabs/protocol'
import { URL } from 'url'
import { header, body, isHeader, isBody } from './config'
import { FetchAdapter } from './fetchAdapter'
import { FetchFn } from './fetchConfig'
import { FetchProtocolFn } from './fetchTypes'
import { nodeFetch } from './node/nodeFacade'
import { buildRequest } from './request/requestFactory'

/**
 * Create fetch API
 * @param fetchFn
 * @returns
 */
export const config =
    (fetchFn: FetchFn = nodeFetch) =>
    <TAdapter extends FetchAdapter>(
        adapters: TAdapter[] = []
    ): FetchProtocolFn<TAdapter> =>
        // @ts-expect-error
        Object.assign(
            createProtocol(
                adapters.reduce(
                    (acc, adapter): Protocol => ({
                        ...acc,
                        [adapter.name]: {
                            name: '',
                            init: async () => fetchFn,
                            parse: async (location, init) => {
                                const url = new URL(`https://${location}`)
                                const headers = init.filter(isHeader)
                                const [body] = init.filter(isBody)
                                if (
                                    body?.value !== undefined &&
                                    typeof body.value !== 'object'
                                ) {
                                    throw new Error('body is not object')
                                }
                                return buildRequest({
                                    url: url.toString(),
                                    headers: headers.reduce(
                                        (acc, config) => ({
                                            ...acc,
                                            [config.name]: config.value,
                                        }),
                                        adapter.headers
                                    ),
                                    body: body
                                        ? adapter.encode(body.value)
                                        : undefined,
                                })
                            },
                            eval: async function* (request) {
                                const response = await fetchFn(request)
                                const raw =
                                    typeof response.body === 'string'
                                        ? response.body
                                        : await getStream(response.body)
                                const data = adapter.decode(raw)
                                yield {
                                    data,
                                    request,
                                    parse: data.parse,
                                    [Symbol.iterator]: data[Symbol.iterator],
                                }
                            },
                            dispose: async () => undefined,
                        },
                    }),
                    {}
                )
            ),
            {
                header,
                body,
            }
        )

/**
 * Fetch resources
 */
// @ts-expect-error
export const fetch: FetchProtocolFn = config(nodeFetch)([])

function getStream(stream: NodeJS.ReadableStream): Promise<string> {
    return new Promise((resolve) => {
        const chunks: any[] = []
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
        stream.on('end', () => resolve(Buffer.concat(chunks).toString()))
    })
}
