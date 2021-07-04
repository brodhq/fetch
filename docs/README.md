# README

## Interfaces

- [FetchFn](#fetchfn)
- [FetchRequest](#fetchrequest)
- [FetchResponse](#fetchresponse)

## Functions

### config

▸ **config**(`__namedParameters?`): [`FetchFn`](#fetchfn)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Partial`<`FetchConfig`\> |

#### Returns

[`FetchFn`](#fetchfn)

# Interfaces

## Fetchfn

## Callable

### FetchFn

▸ **FetchFn**<`T`, `TRet`\>(`fetchable`, `init`): `AwaitableFetchRequest`<`T`, `TRet`\>

Fetch data at url as JSON

**`example`**
```typescript
const response = fetch(Json, 'https://example.com/posts/1')
response.status
// => 200
```

#### Type parameters

| Name |
| :------ |
| `T` |
| `TRet` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fetchable` | `Fetchable`<`T`\> | Data type |
| `init` | `FetchInit`<`T`\> | A URL string or request object |

#### Returns

`AwaitableFetchRequest`<`T`, `TRet`\>

### FetchFn

▸ **FetchFn**<`T`, `TRet`\>(`fetchable`, `init`, `callback`): `AwaitableFetchRequest`<`T`, `TRet`\>

Fetch data at url as JSON and parse response in callback

**`example`**
```typescript
const response = fetch(Json, 'https://example.com/posts/1', response => ({
     title: response.data['title'].toString(),
     content: response.data['content'].toString(),
     postedAt: response.data['date'].toDate()
}))
response.title
// => 'my post'
```

#### Type parameters

| Name |
| :------ |
| `T` |
| `TRet` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fetchable` | `Fetchable`<`T`\> | Data type |
| `init` | `FetchInit`<`T`\> | A URL string or request object |
| `callback` | `FetchCallback`<`T`, `TRet`\> | - |

#### Returns

`AwaitableFetchRequest`<`T`, `TRet`\>

### FetchFn

▸ **FetchFn**<`T`, `TRet`\>(`fetchable`, `init`, `callback?`): `AwaitableFetchRequest`<`T`, `TRet`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `TRet` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fetchable` | `Fetchable`<`T`\> |
| `init` | `FetchInit`<`T`\> |
| `callback?` | `FetchCallback`<`T`, `TRet`\> |

#### Returns

`AwaitableFetchRequest`<`T`, `TRet`\>

## Fetchrequest

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Hierarchy

- `Pick`<`RequestInit`, ``"headers"`` \| ``"method"``\>

  ↳ **`FetchRequest`**

## Properties

### body

• `Optional` **body**: `T`

___

### headers

• `Optional` **headers**: `HeadersInit`

#### Inherited from

Pick.headers

___

### method

• `Optional` **method**: `string`

#### Inherited from

Pick.method

___

### url

• **url**: `string`

## Fetchresponse

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Properties

### data

• **data**: `T`

___

### request

• **request**: [`FetchRequest`](#fetchrequest)<`unknown`\>

___

### status

• **status**: `number`
