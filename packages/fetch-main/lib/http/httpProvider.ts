import { HttpImpl } from './httpImpl'

export function createHttp() {
    return new HttpImpl()
}
