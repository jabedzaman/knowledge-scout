import { BASE_URL, EMAIL, PASSWORD } from "./CONSTS";

fetch(`${BASE_URL}/user`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-authorization": `Basic ${btoa(`${EMAIL}:${PASSWORD}`)}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("User data:", data);
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
  });
