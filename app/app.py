import streamlit as st
from utils.file_utils import extract_text_from_file
from utils.llm_utils import generate_prd_section

st.set_page_config(page_title="AI PRD Generator", layout="wide")

st.title("📄 AI PRD Generator")
st.markdown("Upload an MRD and generate structured PRD sections using GPT.")

# Input fields
product_name = st.text_input("What type of product is this PRD for?", "Smart Meeting Scheduler")
mrd_file = st.file_uploader("Upload MRD File", type=["txt", "pdf", "docx"])
additional_context = st.text_area("Additional Context (optional)", height=100)

if st.button("🚀 Generate PRD"):
    if not mrd_file:
        st.warning("Please upload an MRD file to proceed.")
    else:
        with st.spinner("Reading and analyzing your MRD..."):
            mrd_text = extract_text_from_file(mrd_file)
            full_context = mrd_text + "\n\n" + additional_context

        # 1. Document Objective
        st.markdown("### ✅ 1.1 DOCUMENT OBJECTIVE")
        with st.spinner("Generating section..."):
            objective = generate_prd_section("Document Objective", full_context, product_name)
            st.write(objective)

        # 2. Market Problem
        st.markdown("### ✅ 1.2 MARKET PROBLEM")
        with st.spinner("Generating section..."):
            problem = generate_prd_section("Market Problem", full_context, product_name)
            st.write(problem)

        # 3. Market Opportunity
        st.markdown("### ✅ 1.3 MARKET OPPORTUNITY")
        with st.spinner("Generating section..."):
            opportunity = generate_prd_section("Market Opportunity", full_context, product_name)
            st.write(opportunity)

        # 4. Product Features
        st.markdown("### ✅ 1.4 PRODUCT FEATURES")
        with st.spinner("Generating section..."):
            features = generate_prd_section("Product Features", full_context, product_name)
            st.write(features)

        # 5. Success Metrics
        st.markdown("### ✅ 1.5 SUCCESS METRICS")
        with st.spinner("Generating section..."):
            metrics = generate_prd_section("Success Metrics", full_context, product_name)
            st.write(metrics)

        # Download Placeholder
        st.download_button("📥 Download PRD (Coming Soon)", "Full PRD content will be here.", file_name="SmartMeetingScheduler_PRD.txt")
