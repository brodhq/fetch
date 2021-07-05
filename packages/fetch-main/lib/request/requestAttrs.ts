export interface CreateRequestAttrs<T> {
    /**
     * URL
     */
    url: string
    /**
     * Object containging HTTP headers
     */
    headers?: object
    /**
     * HTTP method
     */
    method?: string
    /**
     * Raw body
     */
    body?: T
}
