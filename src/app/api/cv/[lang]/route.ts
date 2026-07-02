import { renderToBuffer } from "@react-pdf/renderer";
import { createElement, type ReactElement } from "react";
import type { DocumentProps } from "@react-pdf/renderer";
import CvDocument, { type CvLang } from "@/lib/cv-document";

export async function GET(
  _req: Request,
  { params }: { params: { lang: string } }
) {
  const lang: CvLang = params.lang === "en" ? "en" : "es";
  const filename = `Felipe_Perez_CV_${lang.toUpperCase()}.pdf`;

  const element = createElement(CvDocument, { lang }) as ReactElement<DocumentProps>;
  const buffer = await renderToBuffer(element);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
