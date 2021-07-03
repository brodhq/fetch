import { config } from '../lib'
import { Text } from './support'

const fetch = config({
    adapter: {
        create: async () => ({
            status: 200,
            body: JSON.stringify({ five: 5 }),
            headers: {},
        }),
    },
})

describe('promise', () => {
    test('simple', async () => {
        await expect(fetch(Text, 'https://test.com')).resolves.toMatchObject({
            data: `{"five":5}`,
        })
    })
})
