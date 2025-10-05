import { BASE_URL, EMAIL, PASSWORD } from "./CONSTS";

fetch(`${BASE_URL}/auth`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
