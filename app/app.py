import streamlit as st
from utils.file_utils import extract_text_from_file
from utils.llm_utils import generate_prd_section

st.set_page_config(page_title="AI PRD Generator", layout="wide")
st.title("📄 AI PRD Generator")

# Inputs
product_name = st.text_input("Product Name", "Smart Meeting Scheduler")
mrd_file = st.file_uploader("Upload MRD", type=["txt", "pdf", "docx"])
additional_context = st.text_area("Optional Notes or Context", height=100)

# Buttons
col1, col2 = st.columns(2)
generate_gpt = col1.button("🚀 Generate PRD with GPT")
show_demo = col2.button("📸 Show Example PRD")

# GPT-Powered Generation
if generate_gpt:
    if not mrd_file:
        st.warning("Please upload an MRD to continue.")
    else:
        with st.spinner("Reading MRD..."):
            mrd_text = extract_text_from_file(mrd_file)
            full_context = mrd_text + "\n\n" + additional_context

        for title in [
            "Document Objective",
            "Market Problem",
            "Market Opportunity",
            "Product Features",
            "Success Metrics"
        ]:
            st.markdown(f"### ✅ {title.upper()}")
            with st.spinner(f"Generating {title}..."):
                output = generate_prd_section(title, full_context, product_name)
                st.write(output)

# Example PRD View for Screenshot
elif show_demo:_
