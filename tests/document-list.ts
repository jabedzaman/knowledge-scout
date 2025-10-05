import { EMAIL, BASE_URL, LIMIT, OFFSET, PASSWORD } from "./CONSTS";

fetch(`${BASE_URL}/docs?limit=${LIMIT}&offset=${OFFSET}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-authorization": `Basic ${btoa(`${EMAIL}:${PASSWORD}`)}`,
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching documents:", error));
