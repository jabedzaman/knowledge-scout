> skillion hackathon submission by [jabedzaman](https://jabed.dev) reg no: 12211810

## Problem Statement 5 — **KnowledgeScout** (Doc Q&A)

**Objective:** Upload docs, embed them, and answer queries with snippet sources and valid page references.

### Architecture

1. **Document Upload & Embedding:**
   - Users can upload documents (PDF only).
   - Extract text and generate embeddings using `Xenova/all-MiniLM-L6-v2` model.
   - Store embeddings and metadata in mongoDB.
   - Use `vector-search` index by mongoDB to enable efficient similarity search.
2. **Query Handling:**
   - Accept user queries and generate embeddings.
   - Generate a queryHash and check if it exists in the cache.
   - If exists, return cached answer.
   - If not, perform similarity search in mongoDB to find relevant document snippets.
3. **Authentication:**
   - Implement basic authentication for user management.
   - Use `x-shared-token` for sharedToken based authentication.
4. **Rate Limiting & Pagination:**
   - Implement rate limiting to prevent abuse. Use the `x-rate-limit` header to inform users of their rate limit status. For simplicity, create a map to track request counts per user.
   - Support pagination for listing documents and queries.
5. **Schema Design:**
   - Design efficient schemas for users, documents, chunks, and query cache.
   - Document schema includes metadata and references to chunks. The document schema defines a pdf that has been uploaded by a user.
   - Chunk schema includes text snippets, embeddings, and references to the parent document.
   - QueryCache schema stores query hashes and their corresponding answers for caching purposes.
   - User schema includes user credentials and metadata.

---

### Tech Stack

- **Backend:** Node.js with Hono
- **Database:** MongoDB Atlas with Vector Search
- **Embedding Model:** `Xenova/all-MiniLM-L6-v2` via `@xenova/transformers`
- **PDF Text Extraction:** `pdf-parse`

### Authentication

Test Credentials:

- **email:** admin@mail.com
- **password:** admin@123

> can pass `x-shared-token` header instead of Basic Auth to impersonate the user.

Basic Auth is implemented for simplicity. Use the above credentials to access the endpoints.

### Pagination, Idempotency, Rate Limits

List endpoints support pagination via `limit` and `offset` query parameters. Default values are set to `limit=10` and `offset=0`.

Idempotency is ensured for user creation and document upload endpoints.

Rate limiting is implemented to allow a maximum of 60 requests per minute per user.

---

### Endpoints

- `POST /api/auth` - Create a user, Accepts `email` and `password` in body, returns the userId and shareToken
- `GET /api/user` - Get user details, Requires Basic Auth
- `POST /api/docs` - Upload a PDF document, Requires Basic Auth, Accepts `file` (PDF) in form-data, returns the documentId
- `GET /api/docs?limit=&offset=` - List all uploaded documents, Requires Basic Auth, supports pagination with `limit` and `offset`
- `GET /api/docs/:id` - Get details of a specific document, Requires Basic Auth
- `POST /api/ask` - Ask a question and get answers with sources, Requires Basic Auth, Accepts `question` in body, returns answers with sources
- `POST /api/index/rebuild` - Rebuild the vector search index, Requires Basic Auth
- `GET /api/index/stats` - Get statistics of the vector search index, Requires Basic Auth
- `GET /api/health` - Health check endpoint
- `GET /api/_meta` - Meta information about the API
- `GET /.well-known/hackathon.json` - Hackathon project metadata

### Testing the Application

Test code has been added in the `tests` folder. You can run the tests using:

```bash
pnpm dlx tsx tests/<test-file>.ts
```

**Available Test Files:**

1. `user-create` - Create a user (POST)
2. `user-get` - Get user details (GET)
3. `document-upload` - Upload a PDF document (POST)
4. `document-list` - List all uploaded documents (GET)
5. `document-get` - Get details of a specific document (GET)
6. `index-rebuild` - Rebuild the vector search index (POST)
7. `index-stats` - Get statistics of the vector search index (GET)
8. `ask` - Ask a question and get answers with sources (POST)

---

### MongoDB Vector Search Index Configuration

To be added on `chunk` collection:

```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 384,
      "similarity": "cosine"
    },
    {
      "type": "filter",
      "path": "docId"
    }
  ]
}
```
