fetch("http://localhost:8000/api/auth", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({}),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
