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

// const request = fetch(
//     Json,
//     (request) => ({
//         url: 'http://google.com',
//         method: 'get',
//         headers: {},
//     }),
//     (response) => ({
//         title1: 1,
//         title2: 1,
//         title3: 1,
//     })
// )
