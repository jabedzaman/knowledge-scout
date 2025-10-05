import { ask } from "./ask";

// 60 requests per minute per user

// crash by sending 61 requests within 30 seconds
for (let i = 0; i < 61; i++) {
  setTimeout(() => {
    ask();
  }, i * 500); // 500ms interval between requests
}
