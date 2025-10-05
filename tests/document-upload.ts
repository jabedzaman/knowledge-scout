import fs from "fs";
import path from "path";
import { EMAIL, PASSWORD, BASE_URL } from "./CONSTS";

const filePath = path.join(process.cwd(), "test-document.pdf");

const form = new FormData();
const buffer = fs.readFileSync(filePath);
form.append(
  "file",
  new Blob([buffer], { type: "application/pdf" }),
  "test-document.pdf"
);

fetch(`${BASE_URL}/docs`, {
  method: "POST",
  body: form,
  headers: {
    "x-authorization": `Basic ${btoa(`${EMAIL}:${PASSWORD}`)}`,
  },
})
  .then((res) => res.json())
  .then((json) => {
    console.log("Upload response:", json);
  })
  .catch((err) => {
    console.error("Error uploading file:", err);
  });
