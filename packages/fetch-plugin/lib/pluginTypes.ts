import type { HttpPlugin } from '@geislabs/http-plugin'
import type { Plugin } from '@geislabs/plugin'
import type { JsonPath } from '@geislabs/json'
import type { FetchAdapter } from '@geislabs/fetch'
import type { FetchConfig } from './pluginConfig'

export interface FetchPlugin
    extends Plugin<'fetch', Partial<FetchConfig>, any, HttpPlugin, any> {}
