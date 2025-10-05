import { User } from "@knowledgescout/schemas";
import * as crypto from "node:crypto";

export class UserService {
  // generate a new user
  async createUser() {
    const user = new User();
    const apiKey = await this.generateApiKey(user._id.toString());
    user.apiKey = apiKey;
    user.shareToken = `share_${apiKey}`;
    await user.save();
    return user;
  }

  // generate a new api key for a user with the given userId
  // use the userId as part of the api key generation to ensure uniqueness
  async generateApiKey(userId: string) {
    const apiKey = crypto.randomBytes(32).toString("hex") + userId;
    return apiKey;
  }
}
