import { impl } from '../fetchable'
import { buildRequest } from '../request/requestFactory'
import { CreateResponseAttrs } from './responseAttrs'
import { ResponseContext } from './responseContext'
import { rawToString } from './responseHelpers'
import { FetchResponse } from './responseTypes'

export async function createResponse<T>(
    context: ResponseContext<T>,
    attrs: CreateResponseAttrs<T>
): Promise<FetchResponse> {
    const { headers = {}, encode, decode } = context.fetchable[impl]
    const encoded = attrs.request.body ? encode(attrs.request.body) : null
    const request = buildRequest({
        ...attrs.request,
        body: encoded,
        headers: {
            ...attrs.request.headers,
            ...headers,
        },
    })
    const raw = await context.adapter.create(request)
    const rawstring = await rawToString(raw.body)
    const decoded = decode(rawstring)
    return { status: raw.status, request, data: decoded }
}
