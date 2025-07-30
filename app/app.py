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
elif show_demo:
    st.success("📸 Example PRD Loaded (Simulated for screenshot/demo)")

    example_prd = {
        "Document Objective": "This document outlines the requirements for the Smart Meeting Scheduler, an AI-powered tool that streamlines scheduling for remote and hybrid teams by offering intelligent time slot suggestions and calendar integration.",
        "Market Problem": "Remote teams spend hours coordinating meetings manually. Current tools lack intelligent recommendations and fail to resolve time conflicts across time zones effectively.",
        "Market Opportunity": "The collaboration software market is growing at over 10% annually. There is a rising demand for smart productivity tools that reduce friction and automate repetitive tasks like scheduling.",
        "Product Features": "- Google Calendar Integration\n- AI-driven Time Slot Suggestions\n- Smart Reminders\n- Privacy-first, no data retention\n- Simple UI for non-technical users",
        "Success Metrics": "- 60%+ users report time saved\n- 3+ real meetings scheduled per pilot team\n- Positive NPS and feedback from launch users"
    }

    for title in example_prd:
        st.markdown(f"### ✅ {title.upper()}")
        st.write(example_prd[title])

# Export (coming soon)
st.download_button("📥 Download PRD (Coming Soon)", "PRD content will go here.", file_name="SmartMeetingScheduler_PRD.txt")
