import { BASE_URL, API_KEY } from "./CONSTS";

fetch(`${BASE_URL}/index/stats`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Index stats response:", data);
  })
  .catch((error) => {
    console.error("Error stats index:", error);
  });
