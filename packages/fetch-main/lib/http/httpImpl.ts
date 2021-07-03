import https from 'https'
import { FetchAdapter } from '../fetchAdapter'
import { FetchRequest } from '../request'
import { RawResponse } from '../response'

export class HttpImpl implements FetchAdapter {
    async create(request: FetchRequest): Promise<RawResponse> {
        return new Promise(async (resolve, reject) => {
            const client = https.request(
                request.url,
                {
                    method: request.method,
                },
                (response) => {
                    let body = ''
                    response.on('data', (chunk) => (body += chunk.toString()))
                    response.on('error', reject)
                    response.on('end', () => {
                        if (
                            response.statusCode! >= 200 &&
                            response.statusCode! <= 299
                        ) {
                            resolve({
                                status: response.statusCode!,
                                headers: response.headers,
                                body: body,
                            })
                        } else {
                            reject(
                                'Request failed. status: ' +
                                    response.statusCode +
                                    ', body: ' +
                                    body
                            )
                        }
                    })
                }
            )
            client.on('error', reject)
            // client.write(request.body, 'binary')
            client.end()
        })
    }
}
