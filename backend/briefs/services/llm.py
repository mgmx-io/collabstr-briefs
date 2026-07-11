import json

from anthropic import Anthropic

MODEL = "claude-haiku-4-5"
MAX_TOKENS = 1024

SYSTEM_PROMPT = (
    "You are a marketing strategist writing influencer campaign briefs for brands. "
    "Write in clear, concrete language with no filler, emojis, or hashtags. "
    "The brief must be 4 to 6 sentences. "
    "Provide exactly 3 content angles and exactly 3 creator selection criteria, "
    "each a single short sentence. "
    "Tailor everything to the given platform, goal, and tone."
)

BRIEF_FORMAT = {
    "type": "json_schema",
    "schema": {
        "type": "object",
        "properties": {
            "brief": {"type": "string"},
            "angles": {"type": "array", "items": {"type": "string"}},
            "criteria": {"type": "array", "items": {"type": "string"}},
        },
        "required": ["brief", "angles", "criteria"],
        "additionalProperties": False,
    },
}

client = Anthropic()


def generate_brief(brand_name, platform, goal, tone):
    user_prompt = (
        f"Brand: {brand_name}\nPlatform: {platform}\nGoal: {goal}\nTone: {tone}"
    )

    response = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
        output_config={"format": BRIEF_FORMAT},
    )
    return json.loads(response.content[0].text)
