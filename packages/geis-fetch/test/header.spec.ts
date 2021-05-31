import { config } from '../lib'
import { jsonImpl, textImpl } from './support'

describe('header', () => {
    test('init', async () => {
        const fetch = config(
            async (request) => {
                expect(request.headers).toStrictEqual({
                    'Content-Type': 'application/json',
                })
                return {
                    body: JSON.stringify({ value: 10 }),
                }
            },
            [textImpl]
        )
        expect.hasAssertions()
        await fetch('text://google.com', [
            fetch.header('Content-Type', 'application/json'),
        ])
    })
    test('adapter', async () => {
        const fetch = config(
            async (request) => {
                expect(request.headers).toStrictEqual({
                    'Content-Type': 'application/json',
                })
                return {
                    body: JSON.stringify({ value: 10 }),
                }
            },
            [jsonImpl]
        )
        expect.hasAssertions()
        await fetch('json://google.com', [])
    })
})
