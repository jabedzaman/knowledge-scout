import { EMAIL, PASSWORD, BASE_URL, SHARE_TOKEN } from "./CONSTS";

const query = "knowledge?";

fetch(`${BASE_URL}/ask`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-authorization": `Basic ${btoa(`${EMAIL}:${PASSWORD}`)}`,
  },
  body: JSON.stringify({ query, k: 3 }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("response with api key:", JSON.stringify(data, null, 2));
  })
  .catch((err) => {
    console.error("Error:", err);
  });

// fetch(`${BASE_URL}/ask`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "x-share-token": SHARE_TOKEN,
//   },
//   body: JSON.stringify({ query, k: 3 }),
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log("response with share token:", data);
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//   });
