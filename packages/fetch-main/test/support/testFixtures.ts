import { Middleware } from '../../lib/middleware/middlewareTypes'

export const logger: Middleware =
    (api) => (protocol) => async (type, init, callback) => {
        console.log('before', type, init, callback)
        const result = await protocol(type, init, callback)
        console.log('after', result)
        return result
    }
