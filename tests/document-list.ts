import { API_KEY, BASE_URL, LIMIT, OFFSET } from "./CONSTS";

fetch(`${BASE_URL}/docs?limit=${LIMIT}&offset=${OFFSET}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching documents:", error));
