import { BASE_URL, API_KEY } from "./CONSTS";

fetch(`${BASE_URL}/index/rebuild`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Index rebuild response:", data);
  })
  .catch((error) => {
    console.error("Error rebuilding index:", error);
  });
