
# Simulated GPT-4o behavior for summarization and action extraction
def summarize_transcript(transcript: str) -> str:
    return (
        "The team agreed to launch the product on August 15. "
        "Marketing and dev teams will finalize tasks by July 31. "
        "Open questions around pricing remain."
    )

def extract_action_items(transcript: str) -> list:
    return [
        "Confirm final launch date with all stakeholders.",
        "Dev team to complete integration by July 31.",
        "Marketing to prepare launch assets by August 5.",
        "Product team to finalize pricing strategy."
    ]
