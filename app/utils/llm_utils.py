import os
from openai import OpenAI, RateLimitError

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def generate_prd_section(section_title: str, mrd_text: str, product_name: str) -> str:
    prompt = (
        f"You are a product manager generating a PRD. Based on the following MRD and product name '{product_name}', "
        f"write a concise and clear PRD section titled '{section_title}'. Avoid repetition and explain only the key ideas.\n\n"
        f"MRD Content:\n{mrd_text}"
    )

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a professional product document writer."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content.strip()

    except Exception as e:
        # fallback: return dummy content
        return f"(Simulated) PRD section for **{section_title}**: This is placeholder content because the real model was unavailable."
