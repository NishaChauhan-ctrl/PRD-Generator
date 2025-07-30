import streamlit as st
from utils.file_utils import extract_text_from_file
from utils.llm_utils import generate_prd_section

st.set_page_config(page_title="AI PRD Generator", layout="wide")
st.markdown("<h1 style='font-size: 2.5rem;'>AI PRD Generator</h1>", unsafe_allow_html=True)

# Input Fields
product_name = st.text_input("Product Name", "Smart Meeting Scheduler", label_visibility="collapsed")
mrd_file = st.file_uploader("Upload Market Requirements Document (MRD)", type=["txt", "pdf", "docx"])
additional_context = st.text_area("Additional Notes or Context", height=100)

# Button row
col1, col2 = st.columns([1, 1])
generate_gpt = col1.button("Generate PRD with GPT", use_container_width=True)
show_demo = col2.button("Preview Example PRD", use_container_width=True)

# GPT-Generated PRD
if generate_gpt:
    if not mrd_file:
        st.warning("Please upload an MRD file to continue.")
    else:
        with st.spinner("Processing MRD..."):
            mrd_text = extract_text_from_file(mrd_file)
            full_context = mrd_text + "\n\n" + additional_context

        for title in [
            "Document Objective",
            "Market Problem",
            "Market Opportunity",
            "Product Features",
            "Success Metrics"
        ]:
            st.markdown(f"## {title}")
            with st.spinner(f"Generating {title}..."):
                output = generate_prd_section(title, full_context, product_name)
                st.markdown(output)

# Example PRD Demo View
elif show_demo:
    st.markdown("### Example PRD for Smart Meeting Scheduler")

    example_prd = {
        "Document Objective": "This document outlines the requirements for the Smart Meeting Scheduler, an AI-powered tool that streamlines scheduling for remote and hybrid teams by offering intelligent time slot suggestions and calendar integration.",
        "Market Problem": "Remote teams spend hours coordinating meetings manually. Current tools lack intelligent recommendations and fail to resolve time conflicts across time zones effectively.",
        "Market Opportunity": "The collaboration software market is growing at over 10% annually. There is a rising demand for smart productivity tools that reduce friction and automate repetitive tasks like scheduling.",
        "Product Features": "- Google Calendar Integration\n- AI-driven Time Slot Suggestions\n- Smart Reminders\n- Privacy-first, no data retention\n- Simple UI for non-technical users",
        "Success Metrics": "- 60%+ users report time saved\n- 3+ real meetings scheduled per pilot team\n- Positive NPS and feedback from launch users"
    }

    for title, content in example_prd.items():
        st.markdown(f"## {title}")
        st.markdown(content)

# Optional download placeholder
st.markdown("---")
st.download_button("Download PRD (Coming Soon)", "Generated PRD content will be added here.", file_name="SmartMeetingScheduler_PRD.txt")
