// services/pdfService.ts
import axios from "axios";
import pdfParse from "pdf-parse";

export async function extractTextByPage(url: string): Promise<{ page: number; content: string }[]> {
  const response = await axios.get<ArrayBuffer>(url, { responseType: "arraybuffer" });

  const buffer = Buffer.from(response.data);
  const data = await pdfParse(buffer);

  const pages = data.text.split(/\f|\n\s*\n/);
  return pages
    .map((content, index) => ({
      page: index,
      content: content.replace(/\s+/g, " ").trim(),
    }))
    .filter((p) => p.content.length > 0);
}
