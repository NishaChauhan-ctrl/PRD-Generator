import fitz  # PyMuPDF
import docx2txt

def extract_text_from_file(file) -> str:
    file_type = file.type
    file_name = file.name.lower()

    if file_type == "text/plain" or file_name.endswith(".txt"):
        return file.read().decode("utf-8")

    elif file_name.endswith(".pdf"):
        return extract_text_from_pdf(file)

    elif file_name.endswith(".docx"):
        return docx2txt.process(file)

    else:
        return "Unsupported file type."

def extract_text_from_pdf(file) -> str:
    text = ""
    with fitz.open(stream=file.read(), filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text
