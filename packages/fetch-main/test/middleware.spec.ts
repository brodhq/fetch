import { FetchResponse } from '../lib'
import { FetchConfig } from '../lib/fetchConfig'
import { fetchProtocol } from '../lib/fetchFacade'
import { applyMiddleware, createProtocol } from '../lib/middleware'
import { Json } from './support'
import { proxy, retry } from './support/testFixtures'

const config: FetchConfig = {
    adapter: {
        create: async () => ({
            status: 200,
            body: '{"five":5}',
            headers: {},
        }),
    },
}

const fetch = createProtocol<FetchConfig, FetchResponse>(
    fetchProtocol,
    config,
    applyMiddleware(retry, proxy({ 'google.com': 'localhost:4000' }))
)

describe('middleware', () => {
    test('simple', async () => {
        expect(
            await fetch(Json, {
                url: 'http://google.com',
                method: 'get',
            })
        ).toStrictEqual({
            five: 5,
        })
    })
    test('simple', async () => {
        expect(
            await fetch(
                Json,
                {
                    url: 'http://google.com',
                    method: 'get',
                },
                (data, _index, context) => ({
                    status: context.status,
                    request: context.request,
                    data: { five: data['five'] },
                })
            )
        ).toStrictEqual({
            status: 200,
            data: { five: 5 },
            request: {
                url: 'http://localhost:4000/',
                method: 'get',
                body: null,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        })
    })
})
