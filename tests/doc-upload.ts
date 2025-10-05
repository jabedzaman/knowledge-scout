// # Upload the generated test PDF
// curl -X POST http://localhost:8000/api/docs \
//   -F "file=./content/@test-document.pdf" \

// x-api-key: 2eabca851c731a41adbc9c3adbc599d2c2a5aadec866786926e608c3498a150468e229d5a970210cbcf05449

import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "tests",
  "content",
  "test-document.pdf"
);

const form = new FormData();
const buffer = fs.readFileSync(filePath);
form.append(
  "file",
  new Blob([buffer], { type: "application/pdf" }),
  "test-document.pdf"
);

fetch("http://localhost:8000/docs", {
  method: "POST",
  body: form,
  headers: {
    "x-api-key":
      "2eabca851c731a41adbc9c3adbc599d2c2a5aadec866786926e608c3498a150468e229d5a970210cbcf05449",
  },
})
  .then((res) => res.json())
  .then((json) => {
    console.log("Upload response:", json);
  })
  .catch((err) => {
    console.error("Error uploading file:", err);
  });
