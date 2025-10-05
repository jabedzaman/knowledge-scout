import { API_KEY, BASE_URL, DOCUMENT_ID } from "./CONSTS";

fetch(`${BASE_URL}/docs/${DOCUMENT_ID}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
})
  .then((response) => response.json())
  .then((data) => console.log("with apikey", data))
  .catch((error) => console.error("Error fetching documents:", error));

fetch(`${BASE_URL}/docs/${DOCUMENT_ID}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-share-token": `share_${API_KEY}`,
  },
})
  .then((response) => response.json())
  .then((data) => console.log("with share token", data))
  .catch((error) => console.error("Error fetching documents:", error));
