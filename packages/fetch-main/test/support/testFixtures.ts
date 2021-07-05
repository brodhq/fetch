import { URL } from 'url'
import { Middleware } from '../../lib/middleware/middlewareTypes'

export const logger: Middleware =
    (api) => (protocol) => async (type, init, callback) => {
        console.log('before', type, init, callback)
        const result = await protocol(type, init, callback)
        console.log('after', result)
        return result
    }

export const retry: Middleware = (api) => (protocol) => {
    let errors = 0
    return async (type, init, callback) => {
        const internal = async (): Promise<any> => {
            try {
                const result = await protocol(type, init, callback)
                return result
            } catch (error) {
                errors += 1
                if (errors > 3) {
                    throw error
                }
                return internal()
            }
        }
        return internal()
    }
}

export const proxy =
    (config: { [key: string]: string } = {}): Middleware =>
    (api) =>
    (protocol) =>
    async (type, init, callback) => {
        if (typeof init === 'string') {
            return protocol(type, init, callback)
        }
        const url = new URL(init.url)
        const target = config[url.hostname]
        if (target) {
            const [hostname, port] = target.split(':')
            url.hostname = hostname
            url.port = port
            const updated = { ...init, url: url.toString() }
            const result = await protocol(type, updated, callback)
            return result
        }
        return protocol(type, init, callback)
    }
