import { config } from '../lib'

const fetch = config(async () => ({
    body: JSON.stringify({ value: 10 }),
}))

describe.skip('provider', () => {
    test('callback', async () => {
        await expect(
            fetch('json://google.com', async (response) => response).then(
                // @ts-expect-error
                (response) => response.data.toObject()
            )
        ).resolves.toMatchObject({
            value: 10,
        })
    })
    test('promise', async () => {
        await expect(
            fetch('json://google.com').then((response) =>
                // @ts-expect-error
                response.data.toObject()
            )
        ).resolves.toMatchObject({
            value: 10,
        })
    })
})
