import { EMAIL, PASSWORD, BASE_URL, DOCUMENT_ID, SHARE_TOKEN } from "./CONSTS";

fetch(`${BASE_URL}/docs/${DOCUMENT_ID}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-authorization": `Basic ${btoa(`${EMAIL}:${PASSWORD}`)}`,
  },
})
  .then((response) => response.json())
  .then((data) => console.log("with apikey", data))
  .catch((error) => console.error("Error fetching documents:", error));

fetch(`${BASE_URL}/docs/${DOCUMENT_ID}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-share-token": SHARE_TOKEN,
  },
})
  .then((response) => response.json())
  .then((data) => console.log("with share token", data))
  .catch((error) => console.error("Error fetching documents:", error));
