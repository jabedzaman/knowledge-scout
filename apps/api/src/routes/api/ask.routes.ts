import { Hono } from "hono";
import { ValidationError } from "~/lib";
import { AskService } from "~/services";
import { AuthSession } from "~/types";
import { askSchema } from "~/validators";

export const askRoutes = new Hono<AuthSession>();
const askService = new AskService();

// GET /api/ask - ask a question
askRoutes.post("/", async (c) => {
  const userId = c.get("user")?._id;
  const { success, data, error } = await askSchema.safeParseAsync(
    await c.req.json()
  );

  if (!success) {
    throw new ValidationError(
      error.issues[0].code,
      error.issues[0].message,
      error.issues[0].path[0] as string
    );
  }

  console.log("query received:", data.query, "from user:", userId);
  const answer = await askService.ask(userId!, data);
  return c.json({ answer });
});
