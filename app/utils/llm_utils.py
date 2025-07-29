import openai
import os

openai.api_key = os.environ.get("OPENAI_API_KEY")

def summarize_transcript(transcript: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are an expert product manager assistant that summarizes meeting transcripts into a concise executive summary."},
            {"role": "user", "content": f"Summarize the following meeting transcript:\n\n{transcript}"}
        ]
    )
    return response.choices[0].message.content.strip()

def extract_action_items(transcript: str) -> list:
    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that extracts actionable items from meeting transcripts. Respond with a bullet list of clear action items."},
            {"role": "user", "content": f"Extract all action items from the following meeting transcript:\n\n{transcript}"}
        ]
    )
    items = response.choices[0].message.content.strip()
    return [item.strip("-• ") for item in items.splitlines() if item.strip()]
