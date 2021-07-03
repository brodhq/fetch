import { CreateRequestAttrs } from '../request/requestAttrs'

export interface CreateResponseAttrs<T> {
    request: CreateRequestAttrs<T>
}
