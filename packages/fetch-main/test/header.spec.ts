import { config } from '../lib'
import { Text, Json } from './support'

const dummyResponse = {
    status: 200,
    body: JSON.stringify({ five: 5 }),
    headers: {},
}

describe('header', () => {
    test('no headers', async () => {
        expect.hasAssertions()
        const fetch = config({
            adapter: {
                create: async (request) => {
                    expect(request.headers).toStrictEqual({})
                    return dummyResponse
                },
            },
        })
        await fetch(Text, 'google.com')
    })
    test('init', async () => {
        expect.hasAssertions()
        const fetch = config({
            adapter: {
                create: async (request) => {
                    expect(request.headers).toStrictEqual({
                        'header-1': '123',
                        'header-2': '345',
                    })
                    return dummyResponse
                },
            },
        })
        await fetch(Text, 'google.com', [
            fetch.header('header-1', '123'),
            fetch.header('header-2', '345'),
        ])
    })
    test('encoder', async () => {
        expect.hasAssertions()
        const fetch = config({
            adapter: {
                create: async (request) => {
                    expect(request.headers).toStrictEqual({
                        'Content-Type': 'application/json',
                    })
                    return dummyResponse
                },
            },
        })
        await fetch(Json, 'google.com')
    })
})
