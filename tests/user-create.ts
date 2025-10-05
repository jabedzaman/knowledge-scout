import { BASE_URL, EMAIL, PASSWORD } from "./CONSTS";

fetch(`${BASE_URL}/auth`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // "Idempotency-Key": "e140bd62-49d8-48a8-9a00-dbfd3cb32093",
  },
  body: JSON.stringify({
    email: EMAIL,
    password: PASSWORD,
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
