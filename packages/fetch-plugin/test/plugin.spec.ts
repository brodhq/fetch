import { plugin as http } from '@geislabs/http-plugin'
import { Response } from '@geislabs/http'
import { proxy } from '@geislabs/http-proxy'
import { config as createRuntime, PluginObject } from '@geislabs/plugin'
import { plugin } from '../lib'

const mockFn = async (url: string): Promise<Response> => ({
    status: 200,
    // @ts-expect-error
    body: JSON.stringify({
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: true,
    }),
})

const runtime = createRuntime({
    plugins: [
        { plugin: http, options: { fetchFn: mockFn } },
        {
            plugin,
        },
    ],
})

describe('plugin]', () => {
    test.skip('before request', async () => {
        const context = await runtime.load()
        const response = await context.fetch('json://google.com/about')
        expect(response.data.valueOf()).toStrictEqual({
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: true,
        })
    })
})
