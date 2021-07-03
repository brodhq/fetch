import { config } from '../lib'
import { Json } from './support'

const fetch = config({
    adapter: {
        create: async () => ({
            status: 200,
            body: '{}',
            headers: {},
        }),
    },
})

describe('callback', () => {
    test('simple', async () => {
        await expect(
            fetch(Json, 'https://test.com', (response) => ({
                status: response.status + 5,
            }))
        ).resolves.toStrictEqual({
            status: 205,
        })
    })
})
