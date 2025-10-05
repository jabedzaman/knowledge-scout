import { Hono } from "hono";
import { UserService } from "~/services";

export const authRoutes = new Hono();
const userService = new UserService();

// POST /api/auth - Create a new user and return the API key
authRoutes.post("/", async (c) => {
  const user = await userService.createUser();
  // set the api in header and return the user object
  c.header("x-api-key", user.apiKey);
  return c.json({ apiKey: user.apiKey });
});
