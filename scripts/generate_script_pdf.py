#!/usr/bin/env python3
"""Convert script.md to a printable PDF (docs/presentation-script.pdf)."""

from __future__ import annotations

import sys
from pathlib import Path

import markdown
from weasyprint import HTML

ROOT = Path(__file__).resolve().parents[1]
SCRIPT_MD = ROOT / "script.md"
OUTPUT_PDF = ROOT / "docs" / "presentation-script.pdf"

STYLES = """
@page {
  size: A4;
  margin: 1.8cm 2cm;
  @bottom-center {
    content: counter(page);
    font-size: 9pt;
    color: #64748b;
  }
}
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 10.5pt;
  line-height: 1.55;
  color: #0f172a;
}
h1 {
  font-size: 19pt;
  color: #0d9488;
  border-bottom: 2px solid #0d9488;
  padding-bottom: 0.3em;
  margin-top: 0.6em;
  page-break-before: always;
}
h1:first-of-type {
  page-break-before: avoid;
}
h2 {
  font-size: 13pt;
  color: #134e4a;
  margin-top: 1.4em;
  page-break-after: avoid;
}
h3 {
  font-size: 11.5pt;
  color: #115e59;
  margin-top: 1.1em;
  page-break-after: avoid;
}
blockquote {
  margin: 0.8em 0;
  padding: 0.5em 1em;
  border-left: 4px solid #0d9488;
  background: #f0fdfa;
  color: #334155;
  font-size: 9.5pt;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
  font-size: 9.5pt;
  page-break-inside: avoid;
}
th, td {
  border: 1px solid #cbd5e1;
  padding: 0.35em 0.55em;
  text-align: left;
  vertical-align: top;
}
th {
  background: #0d9488;
  color: white;
  font-weight: 600;
}
tr:nth-child(even) td {
  background: #f8fafc;
}
code {
  font-family: "Menlo", "Consolas", monospace;
  font-size: 9pt;
  background: #f1f5f9;
  padding: 0.1em 0.35em;
  border-radius: 3px;
}
pre {
  background: #f1f5f9;
  padding: 0.75em 1em;
  border-radius: 6px;
  font-size: 8.5pt;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}
hr {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 1.5em 0;
}
strong {
  color: #0f766e;
}
em {
  color: #334155;
}
ul, ol {
  margin: 0.45em 0;
  padding-left: 1.45em;
}
li {
  margin: 0.25em 0;
}
"""


def main() -> int:
    if not SCRIPT_MD.is_file():
        print(f"Missing {SCRIPT_MD}", file=sys.stderr)
        return 1

    md_text = SCRIPT_MD.read_text(encoding="utf-8")
    body_html = markdown.markdown(
        md_text,
        extensions=["tables", "fenced_code", "nl2br", "sane_lists"],
    )
    full_html = (
        "<!DOCTYPE html><html lang=\"en\"><head>"
        "<meta charset=\"utf-8\"/>"
        "<title>Presentation Script — AI in FinTech</title>"
        f"<style>{STYLES}</style>"
        "</head><body>"
        f"{body_html}"
        "</body></html>"
    )

    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    HTML(string=full_html, base_url=str(ROOT)).write_pdf(str(OUTPUT_PDF))
    print(f"Wrote {OUTPUT_PDF} ({OUTPUT_PDF.stat().st_size:,} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
