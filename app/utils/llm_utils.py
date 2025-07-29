from openai import OpenAI, RateLimitError
import os

# Initialize OpenAI client with API key from environment
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def summarize_transcript(transcript: str) -> str:
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert product manager assistant that summarizes meeting transcripts into a concise executive summary."
                },
                {
                    "role": "user",
                    "content": f"Summarize the following meeting transcript:\n\n{transcript}"
                }
            ]
        )
        return response.choices[0].message.content.strip()
    except RateLimitError:
        return "⚠️ Rate limit exceeded. Please wait a few seconds and try again."

def extract_action_items(transcript: str) -> list:
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that extracts actionable items from meeting transcripts. Respond with a bullet list of clear action items."
                },
                {
                    "role": "user",
                    "content": f"Extract all action items from the following meeting transcript:\n\n{transcript}"
                }
            ]
        )
        items = response.choices[0].message.content.strip()
        return [item.strip("-• ") for item in items.splitlines() if item.strip()]
    except RateLimitError:
        return ["⚠️ Rate limit exceeded. Please try again shortly."]
