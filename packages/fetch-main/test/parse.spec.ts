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

describe('parse', () => {
    test('noop', async () => {
        await expect(fetch(Text, 'https://test.com')).resolves.toBe(
            `{"five":5}`
        )
    })
    test('simple', async () => {
        await expect(fetch(Json, 'https://test.com')).resolves.toMatchObject({
            five: 5,
        })
    })
})
