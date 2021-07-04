# README

A set of functions for working with maps.

Many functions for maps, which implement the Enumerable protocol, are found in the Enum module. Additionally, the following functions for maps are found in Kernel:

**Examples**

```typescript
const response = fetch(Json, 'https://example.com/posts/1')
response.status
// => 200
```

# Interfaces

## Fetchfn

▸ **FetchFn**(`fetchable`, `init`): `AwaitableFetchRequest`

Fetch data at url as JSON

**Examples**

```typescript
const response = fetch(Json, 'https://example.com/posts/1')
response.status
// => 200
```

▸ **FetchFn**(`fetchable`, `init`, `callback`): `AwaitableFetchRequest`

Fetch data at url as JSON and parse response in callback

**Examples**

```typescript
const response = fetch(Json, 'https://example.com/posts/1', response => ({
     title: response.data['title'].toString(),
     content: response.data['content'].toString(),
     postedAt: response.data['date'].toDate()
}))
response.title
// => 'my post'
```
