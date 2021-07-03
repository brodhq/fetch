import { config } from '../lib'
import { Text, Json } from './support'

const fetch = config({
    adapter: {
        create: async () => ({
            status: 200,
            body: JSON.stringify({ five: 5 }),
            headers: {},
        }),
    },
})

describe('parser', () => {
    test('noop', async () => {
        await expect(fetch(Text, 'https://test.com')).resolves.toMatchObject({
            data: `{"five":5}`,
            request: {
                url: 'https://test.com',
                method: 'get',
                body: undefined,
                headers: {},
            },
        })
    })
    test('simple', async () => {
        await expect(fetch(Json, 'https://test.com')).resolves.toMatchObject({
            data: {
                five: 5,
            },
            request: {
                url: 'https://test.com',
                method: 'get',
                body: undefined,
                headers: {},
            },
        })
    })
})
