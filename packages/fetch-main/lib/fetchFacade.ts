import { buildInit, buildAttrs } from './api/apiFactory'
import { FetchProtocol } from './middleware'
import { createResponse } from './response'

/**
 * @internal
 */
export const fetchProtocol: FetchProtocol =
    (config) => async (type, init, callback) => {
        const parsedinit = buildInit(init)
        const attrs = buildAttrs(parsedinit)
        const response = await createResponse(
            {
                adapter: config.adapter,
                fetchable: type,
            },
            attrs
        )
        return callback!(response.data, 0, response)
    }
