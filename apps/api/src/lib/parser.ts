import { createRequire } from "module";
// @ts-ignore
const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFParse = require("pdf-parse");

/**
 * Parse document with page-level text extraction and metadata
 */
export const parseDocument = async (file: File) => {
  const buffer = await file.arrayBuffer();
  console.log("Parsing document:", file.name, file.type, file.size);

  if (file.type === "application/pdf") {
    const pdf = await PDFParse(Buffer.from(buffer));

    // Sort pages by page number
    const sortedPages = pdf.pages.sort((a: any, b: any) => a.num - b.num);

    return {
      text: pdf.text,
      pages: sortedPages,
    };
  }

  throw new Error("Unsupported file type");
};
