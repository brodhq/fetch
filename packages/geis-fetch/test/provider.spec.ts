import { config } from '../lib'
import { jsonImpl, textImpl } from './support'

const fetch = config(
    async () => ({
        body: 'hello',
    }),
    [textImpl, jsonImpl]
)

describe('provider', () => {
    test('callback', async () => {
        await expect(
            fetch('text://google.com', async (response) => response).then(
                (response) => response.data
            )
        ).resolves.toBe('hello')
    })
    test('promise', async () => {
        await expect(
            fetch('text://google.com').then((response) => response.data)
        ).resolves.toBe('hello')
    })
})
