import streamlit as st
from utils.file_utils import extract_text_from_file
from utils.llm_utils import generate_prd_section

st.set_page_config(page_title="AI PRD Generator", layout="wide")

st.title("📄 PRD Generator")
st.markdown("Upload an MRD and generate structured PRD sections using GPT.")

# Input fields
product_name = st.text_input("What type of product is this PRD for?", "Smart Meeting Scheduler")
mrd_file = st.file_uploader("Upload MRD File", type=["txt", "pdf", "docx"])
additional_context = st.text_area("Additional Context (optional)", height=100)

# Button to trigger generation
if st.button("🚀 Generate PRD"):
    if not mrd_file:
        st.warning("Please upload an MRD file to proceed.")
    else:
        with st.spinner("Reading and analyzing your MRD..."):
            mrd_text = extract_text_from_file(mrd_file)
            full_context = mrd_text + "\n\n" + additional_context

        # Section 1: Document Objective
        st.markdown("### ✅ 1.1 DOCUMENT OBJECTIVE")
        with st.spinner("Generating section..."):
            objective = generate_prd_section("Document Objective", full_context, product_name)
            st.write(objective)

        # Section 2: Market Problem
        st.markdown("### ✅ 1.2 MARKET PROBLEM")
        with st.spinner("Generating section..."):
            market_problem = generate_prd_section("Market Problem", full_context, product_name)
            st.write(market_problem)

        # Section 3: Market Opportunity
        st.markdown("### ✅ 1.3 MARKET OPPORTUNITY")
        with st.spinner("Generating section..."):
            market_opportunity = generate_prd_section("Market Opportunity", full_context, product_name)
            st.write(market_opportunity)

        # Placeholder for download
        st.download_button("📥 Download PRD (Coming Soon)", "Generated PRD content will go here.", file_name="prd.txt")
