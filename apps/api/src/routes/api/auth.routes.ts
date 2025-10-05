import { Hono } from "hono";
import { ValidationError } from "~/lib";
import { UserService } from "~/services";
import { createUserSchema } from "~/validators";

export const authRoutes = new Hono();
const userService = new UserService();

// POST /api/auth - Create a new user and return the API key
authRoutes.post("/", async (c) => {
  const json = await c.req.json();
  const { success, data, error } = await createUserSchema.safeParseAsync(json);

  if (!success) {
    throw new ValidationError(
      error.issues[0].code,
      error.issues[0].message,
      error.issues[0].path[0] as string
    );
  }

  const user = await userService.createUser(data);
  // set the api in header and return the user object
  return c.json(user);
});
