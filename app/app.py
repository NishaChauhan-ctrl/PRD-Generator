import streamlit as st
from utils.llm_utils import summarize_transcript  # reuse GPT later for section generation

st.set_page_config(page_title="AI PRD Generator", layout="wide")

st.title("📄 AI-Powered PRD Generator")
st.markdown("Upload your MRD and generate editable PRD sections powered by GPT.")

# Placeholder PRD sections (can later be populated from GPT or MRD)
sections = {
    "Overview": "This product aims to streamline workflow X for target users by solving pain point Y.",
    "Goals": "1. Improve user onboarding by 30%\n2. Reduce support tickets by 20%",
    "Features": "• Real-time collaboration\n• Notification system\n• Mobile optimization",
    "Timeline": "Q1 - Research\nQ2 - MVP\nQ3 - Beta Launch\nQ4 - GA Release",
    "Success Metrics": "• NPS > 50\n• DAU/MAU > 40%\n• Avg. task completion time < 2 mins"
}

# UI layout for each section
for section, default_text in sections.items():
    st.subheader(f"✏️ {section}")
    
    col1, col2 = st.columns([0.85, 0.15])
    with col1:
        content = st.text_area(f"Edit {section}", default_text, key=section)
    with col2:
        if st.button(f"🔄 Regenerate {section}", key=f"regen_{section}"):
            st.info(f"(Simulated GPT) Regenerated {section} section.")
            # In future: Replace this with GPT call to re-generate content

    st.markdown("---")

# Final export placeholder
st.download_button(
    "📥 Download PRD (Coming Soon)",
    "This is where the final PRD content will go.",
    file_name="PRD.txt"
)
