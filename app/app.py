import streamlit as st
from utils.file_utils import read_transcript
from utils.llm_utils import summarize_transcript, extract_action_items

st.set_page_config(page_title="AI Meeting Summary Generator", layout="wide")

st.title("🧠 Meeting Summary + Action Items")

uploaded_file = st.file_uploader("Upload Meeting Transcript (.txt)", type=["txt"])

if uploaded_file:
    transcript = read_transcript(uploaded_file)
    st.subheader("📄 Transcript")
    st.text_area("Full Transcript", transcript, height=300)

    # Show Local Summary First
    st.subheader("🧠 Basic Local Summary")
    st.markdown("This is a placeholder summary based on keyword rules.")
    
    if "launch" in transcript.lower():
        st.markdown("- The meeting discussed a product launch.")
    if "QA" in transcript or "quality" in transcript.lower():
        st.markdown("- QA timelines were mentioned.")
    if "marketing" in transcript.lower():
        st.markdown("- Marketing dependencies and deadlines discussed.")
    if "bug" in transcript.lower() or "issue" in transcript.lower():
        st.markdown("- Bugs or issues were brought up by the team.")
    if "assets" in transcript.lower():
        st.markdown("- Final product assets were requested.")
    if "thanks" in transcript.lower() or "follow up" in transcript.lower():
        st.markdown("- The PM mentioned sending follow-ups or notes.")

    st.markdown("---")

    # GPT-based option
    use_gpt = st.checkbox("✨ Use GPT for Smart Summary and Action Items")

    if use_gpt:
        st.info("This will use GPT-3.5 via OpenAI API and may take a few seconds.")
        if st.button("Generate with GPT"):
            with st.spinner("Calling GPT-3.5..."):
                summary = summarize_transcript(transcript)
                actions = extract_action_items(transcript)

            st.subheader("📝 GPT-Powered Summary")
            st.write(summary)

            st.subheader("✅ GPT-Powered Action Items")
            for idx, item in enumerate(actions, 1):
                st.markdown(f"**{idx}.** {item}")
