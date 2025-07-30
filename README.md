# AI-Powered PRD Generator

A lightweight app to generate structured Product Requirements Documents (PRDs) from MRDs, meeting notes, or raw product context using GPT.

This tool helps product managers and early-stage teams save time by automating document structure and content generation.

---

## Features

- Section-by-section PRD generation (Objective, Problem, Features, Metrics)
- Upload MRDs in `.pdf`, `.docx`, or `.txt`
- Two modes:
  - Generate PRD with GPT
  - Preview example PRD (screenshot/demo ready)
- Minimal, clean UI optimized for reading and sharing
- Fallback logic to avoid GPT rate limit issues
- Export-ready layout (download coming soon)

---

## Tech Stack

- Streamlit (UI framework)
- OpenAI GPT-3.5 API (content generation)
- PyMuPDF, docx2txt (file parsing)
- Python (backend logic)

---

## Getting Started
Clone the repo and run the app locally:

#Demo link for Streamlit
- Use the MRD docx for example generation.
- https://prd-generator-vwvgul5avrym3a2wyqkyiz.streamlit.app/


```bash
git clone https://github.com/yourusername/prd-generator
cd prd-generator
pip install -r requirements.txt
streamlit run app/app.py
