# README

## Interfaces

- [FetchAdapter](#fetchadapter)
- [FetchConfig](#fetchconfig)
- [FetchRequest](#fetchrequest)
- [FetchResponse](#fetchresponse)
- [Fetchable](#fetchable)

## Functions

### config

▸ **config**(`__namedParameters?`): `FetchFn`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Partial`<[`FetchConfig`](#fetchconfig)\> |

#### Returns

`FetchFn`

# Interfaces

## Fetchable

## Type parameters

| Name | Type |
| :------ | :------ |
| `TVal` | `any` |

## Properties

### decode

• **decode**: (`raw`: `string`) => `TVal`

#### Type declaration

▸ (`raw`): `TVal`

##### Parameters

| Name | Type |
| :------ | :------ |
| `raw` | `string` |

##### Returns

`TVal`

___

### encode

• **encode**: (`value`: `TVal`) => `string`

#### Type declaration

▸ (`value`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `TVal` |

##### Returns

`string`

___

### headers

• `Optional` **headers**: `object`

## Fetchadapter

## Methods

### create

▸ **create**(`request`): `Promise`<`RawResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`FetchRequest`](#fetchrequest)<`unknown`\> |

#### Returns

`Promise`<`RawResponse`\>

## Fetchconfig

## Properties

### adapter

• **adapter**: [`FetchAdapter`](#fetchadapter)

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
