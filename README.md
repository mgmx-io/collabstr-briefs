# AI Brief Generator

Expo (React Native) app + Django API that generates influencer campaign briefs with Claude.

**Demo:**

https://github.com/user-attachments/assets/db007004-8f60-4d4d-8e63-a22ff5ddddbb

**Try it now:** install [Expo Go](https://expo.dev/go) and scan

<img src="./qr.png" width="220" alt="Expo Go QR" />

## Run

API:

```sh
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # set ANTHROPIC_API_KEY
python manage.py migrate && python manage.py runserver
```

App:

```sh
cd mobile
npm install
echo "EXPO_PUBLIC_API_URL=http://localhost:8000" > .env
npm start
```

## Notes

- **Why Expo:** no custom native modules in this scope, so Expo is the fastest path from clone to running on a device — bare would only add build time.
- **Prompt design:** short fixed system prompt with exact constraints (4–6 sentences, exactly 3 angles/criteria, no filler/emojis) steers determinism at the prompt level; inputs go as a compact key-value user prompt; output format is enforced by structured outputs (`output_config.format`), not text parsing.
- **Guardrails:** Pydantic validation with `Literal` allowlists (400), LLM rejection branch in the output schema for gibberish/offensive brand names (422), 10 req/min per-IP rate limit (429), `max_tokens=1024`, API key from env only.
- **Tokens & latency:** `time.monotonic()` around `messages.create` + `response.usage` input/output tokens, returned in the `metrics` field and shown on the result screen.
