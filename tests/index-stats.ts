import { BASE_URL, EMAIL, PASSWORD } from "./CONSTS";

fetch(`${BASE_URL}/index/stats`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-authorization": `Basic ${btoa(`${EMAIL}:${PASSWORD}`)}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Index stats response:", data);
  })
  .catch((error) => {
    console.error("Error stats index:", error);
  });
