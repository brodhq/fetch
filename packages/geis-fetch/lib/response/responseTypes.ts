import { ProtocolResponse } from '@geislabs/protocol'
import { FetchRequest } from '../request'

export interface FetchResponse<T> {
    data: T
    request: FetchRequest<T>
}
