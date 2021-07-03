import { config } from '../lib'
import { Json } from './support'

const dummyResponse = {
    status: 200,
    body: JSON.stringify({ five: 5 }),
    headers: {},
}

describe('lazy', () => {
    test('simple', async () => {
        const mock = jest.fn(async () => dummyResponse)
        const fetch = config({
            adapter: {
                create: mock,
            },
        })
        const request = fetch(Json, 'google.com')
        expect(mock).not.toHaveBeenCalled()
        await request
        expect(mock).toHaveBeenCalled()
    })
})
