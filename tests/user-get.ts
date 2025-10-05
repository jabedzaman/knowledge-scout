const API_KEY =
  "924361b65f0d6fbdd858cf31817119abe7b7b75f15f567f87924c884f89900ad68e24d1fb063d713196ba56a";

fetch("http://localhost:8000/api/user", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
