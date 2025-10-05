import { Hono } from "hono";
import { ApiError, ValidationError } from "~/lib";
import { authMiddleware } from "~/middlewares";
import { DocsService } from "~/services";
import { AuthSession } from "~/types";
import { getDocumentParams, listDocumentQuery } from "~/validators";

export const docsRoutes = new Hono<AuthSession>();
const docsService = new DocsService();

docsRoutes.use("*", authMiddleware);

// GET /api/docs/:id - Get document by ID
docsRoutes.get("/:id", async (c) => {
  const params = c.req.param();
  const userId = c.get("user")?._id;

  const { success, data, error } = await getDocumentParams.safeParseAsync(
    params
  );

  if (!success) {
    throw new ValidationError(
      error.issues[0].code,
      error.issues[0].message,
      error.issues[0].path[0] as string
    );
  }

  const { id } = data;

  const result = await docsService.getDocumentById(id, userId!);

  return c.json({ result });
});

// GET /api/docs - List documents
docsRoutes.get("/", async (c) => {
  const userId = c.get("user")?._id;
  const query = c.req.query();
  const { success, data, error } = await listDocumentQuery.safeParseAsync(
    query
  );

  if (!success) {
    throw new ValidationError(
      error.issues[0].code,
      error.issues[0].message,
      error.issues[0].path[0] as string
    );
  }

  const result = await docsService.listDocuments(userId!, data);

  return c.json(result);
});

// POST /api/docs - Upload document
docsRoutes.post("/", async (c) => {
  const body = await c.req.parseBody();
  const file = body.file;
  const userId = c.get("user")?._id;

  if (typeof file === "string") {
    throw new ApiError(400, "NO_FILE_UPLOADED", "No file uploaded");
  }

  const result = await docsService.uploadDocument(file, userId!);

  return c.json(result, 201);
});
