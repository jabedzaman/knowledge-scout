import pdfParse from "pdf-parse";

/**
 * Parse document with page-level text extraction and metadata
 */
export const parseDocument = async (file: File) => {
  const buffer = await file.arrayBuffer();
  console.log("Parsing document:", file.name, file.type, file.size);

  if (file.type === "application/pdf") {
    const pdf = await pdfParse(Buffer.from(buffer));

    // Sort pages by page number
    const sortedPages = pdf.pages.sort((a, b) => a.num - b.num);

    return {
      text: pdf.text,
      pages: sortedPages,
    };
  }

  throw new Error("Unsupported file type");
};
