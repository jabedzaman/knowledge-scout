//  query, k = 5

fetch("http://localhost:8000/ask", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key":
      "2eabca851c731a41adbc9c3adbc599d2c2a5aadec866786926e608c3498a150468e229d5a970210cbcf05449",
  },
  body: JSON.stringify({
    query: "honojs",
    k: 3,
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("Response:", data);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
