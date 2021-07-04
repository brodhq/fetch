import { config } from '../lib'
import { FetchConfig } from '../lib/fetchConfig'
import { applyMiddleware, createProtocol } from '../lib/middleware'
import { Json } from './support'
import { logger } from './support/testFixtures'

const fetch = createProtocol<FetchConfig, object, any>(
    (config) => async (type, init, callback) => {
        const response = await (typeof init === 'string'
            ? config.adapter.create({ url: init })
            : config.adapter.create({ url: init.url }))
        return callback({
            ...response,
            body: type.decode(response.body.toString()),
        })
    },
    {
        adapter: {
            create: async () => ({
                status: 200,
                body: '{}',
                headers: {},
            }),
        },
    },
    applyMiddleware(logger)
)

describe('middleware', () => {
    test('simple', async () => {
        expect(
            await fetch(Json, {
                url: 'google.com',
                method: 'get',
            })
        ).toStrictEqual({
            status: 200,
            body: {},
            headers: {},
        })
    })
})
