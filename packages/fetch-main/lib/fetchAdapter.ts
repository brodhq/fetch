import { FetchRequest } from './request'
import { RawResponse } from './response'

/**
 * @internal
 */
export interface FetchAdapter {
    create(request: FetchRequest): Promise<RawResponse>
}
