import { Fetchable } from '../fetchable'
import { FetchAdapter } from '../fetchAdapter'

export interface ResponseContext<T> {
    adapter: FetchAdapter
    fetchable: Fetchable<T>
}
