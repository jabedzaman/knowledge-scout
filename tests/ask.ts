import { API_KEY, BASE_URL, SHARE_TOKEN } from "./CONSTS";

fetch(`${BASE_URL}/ask`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
  body: JSON.stringify({ query: "honojs", k: 3 }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("response with api key:", data);
  })
  .catch((err) => {
    console.error("Error:", err);
  });

fetch(`${BASE_URL}/ask`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-share-token": SHARE_TOKEN,
  },
  body: JSON.stringify({ query: "honojs", k: 3 }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("response with share token:", data);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
