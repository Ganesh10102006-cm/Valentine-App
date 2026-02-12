
# 💖 Valentine Game Generator

A Node.js application that uses a local Ollama AI model to generate custom, romantic HTML mini-games for Valentine's Day.

## 🚀 Setup

### Prequisites
1. **Node.js**: Ensure Node.js (v18+) is installed.
2. **Ollama**: You need [Ollama](https://ollama.com/) running locally.
   - Install Ollama.
   - Pull the `llama3` model:
     ```bash
     ollama pull llama3
     ```
   - Start the Ollama server (usually runs automatically, or run `ollama serve`).

### Installation
1. Navigate to the project folder:
   ```bash
   cd valentine-generator
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Generator
1. Start the server:
   ```bash
   node server.js
   ```
2. Open your browser and go to:
   ```
   http://localhost:3000
   ```
3. Enter your name, your Valentine's name, and choose a game idea.
4. Click **Generate Game**. The AI will craft a unique HTML game for you!

## 🛠 Manual API Usage (Curl)

You can also generate a game via API:

```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "Alex",
    "valentineName": "Sam",
    "gameIdea": "moving heart click challenge"
  }' \
  --output valentine-game.html
```

## 📝 Features
- **Local AI Generation**: Uses your local Ollama instance (no API keys needed, privacy-friendly).
- **Single File Output**: Generates a self-contained HTML file with inline CSS/JS.
- **Customizable**: Incorporates names and game mechanics into the prompt.
- **Mobile Responsive**: Generated games work on phones.
