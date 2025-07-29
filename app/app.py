
import streamlit as st
from app.utils.file_utils import read_transcript
from app.utils.llm_utils import summarize_transcript, extract_action_items

st.set_page_config(page_title="AI Meeting Summary Generator", layout="wide")

st.title("🧠 AI Meeting Summary + Action Item Generator")
st.write("Upload a transcript to generate summaries and actionable tasks.")

uploaded_file = st.file_uploader("Upload Meeting Transcript (.txt)", type=["txt"])
if uploaded_file:
    transcript = read_transcript(uploaded_file)
    st.subheader("📄 Raw Transcript")
    st.text_area("Transcript", transcript, height=300)

    if st.button("🔍 Generate Summary & Action Items"):
        with st.spinner("Analyzing with GPT-4o..."):
            summary = summarize_transcript(transcript)
            actions = extract_action_items(transcript)

        st.subheader("📝 Meeting Summary")
        st.write(summary)

        st.subheader("✅ Action Items")
        for idx, item in enumerate(actions, 1):
            st.markdown(f"**{idx}.** {item}")
