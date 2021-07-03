export interface CreateRequestAttrs<T> {
    url: string
    headers?: object
    method?: string
    body?: T
}
