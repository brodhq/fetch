import { FetchRequest } from './request'
import { RawResponse } from './response'

export interface FetchAdapter {
    create(request: FetchRequest): Promise<RawResponse>
}
