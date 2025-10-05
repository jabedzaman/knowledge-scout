```js
db.chunks.createSearchIndex({
  name: "vector_index",
  type: "vectorSearch",
  definition: {
    fields: [
      {
        type: "vector",
        path: "embedding",
        numDimensions: 384,
        similarity: "cosine",
      },
      {
        type: "filter",
        path: "docId",
      },
    ],
  },
});
```
