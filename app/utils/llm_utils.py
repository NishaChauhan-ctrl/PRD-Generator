import os
from openai import OpenAI, RateLimitError

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def generate_prd_section(section_title: str, mrd_text: str, product_name: str) -> str:
    try:
        prompt = (
            f"You are a product manager generating a PRD. Based on the following MRD and product name '{product_name}', "
            f"write a concise and clear PRD section titled '{section_title}'. Avoid repetition and explain only the key ideas.\n\n"
            f"MRD Content:\n{mrd_text}"
        )

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # or gpt-4o if enabled
            messages=[
                {"role": "system", "content": "You are a professional product document writer."},
                {"role": "user", "content": prompt}
            ]
        )

        return response.choices[0].message.content.strip()

    except RateLimitError:
        return "⚠️ Rate limit exceeded. Please try again later."
