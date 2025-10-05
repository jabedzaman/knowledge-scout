const LIMIT = 10;
const OFFSET = 0;

fetch(`http://localhost:8000/api/docs?limit=${LIMIT}&offset=${OFFSET}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-api-key":
      "2eabca851c731a41adbc9c3adbc599d2c2a5aadec866786926e608c3498a150468e229d5a970210cbcf05449",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching documents:", error));
