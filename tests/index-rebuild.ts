import { BASE_URL, EMAIL, PASSWORD } from "./CONSTS";

fetch(`${BASE_URL}/index/rebuild`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-authorization": `Basic ${btoa(`${EMAIL}:${PASSWORD}`)}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Index rebuild response:", data);
  })
  .catch((error) => {
    console.error("Error rebuilding index:", error);
  });
