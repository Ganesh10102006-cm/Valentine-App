// server.js
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
    const { userName, valentineName, gameIdea } = req.body;

    if (!userName || !valentineName || !gameIdea) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Constructing specific prompt based on user input and master requirements
    const aiPrompt = `
    Generate a complete, single-file HTML game for a Valentine's Day surprise.
    
    User Name: ${userName}
    Valentine/Partner Name: ${valentineName}
    Game Concept: ${gameIdea}

    REQUIREMENTS:
    1. Output MUST be a SINGLE VALID HTML FILE starting with <!DOCTYPE html>.
    2. Include ALL CSS (in <style>) and JS (in <script>) internally. No external links.
    3. Visuals: Romantic theme, soft pink/red colors, floating heart background animation (CSS/JS), confetti effect on win/end.
    4. Responsiveness: Must work perfectly on mobile and desktop.
    
    GAMEPLAY RULES:

    - The game must be themed around love and Valentine’s Day.
    - The visual design should include soft romantic colors (pink, red, purple).
    - Use floating hearts, subtle glowing effects, and romantic typography.
    - Background should feel dreamy and love-themed.

    - The game must feel skill-based but be extremely difficult (approx 5% win rate).


    - If the player loses:
    Show a soft, indirect Valentine-themed romantic reveal message involving the user’s name.
    The message must be playful, confident, and not desperate.
    Avoid directly saying “Will you be my girlfriend?”

    - If the player wins (rare case):
    Show a bold but classy Valentine surprise message with romantic animations and confetti.

    
    EMOTIONAL OUTCOME:
    - LOSE CONDITION (Most common): Show a "Game Over" screen but with a sweet, indirect romantic reveal from ${userName}. 
      * Message example tone: "Okay, that was impossible... just like imagining my life without you." or "You couldn't catch the heart, but you already caught mine."
      * Do NOT say "Will you be my girlfriend?" here. Be playful and confident.
    - WIN CONDITION (Rare): Show a "You Won!" screen with confetti and a BOLD surprise proposal: "Will you be my Valentine?"
    
    Start strictly with <!DOCTYPE html> and end with </html>. Do not include markdown blocks like \`\`\`html.
  `;

    console.log('Sending prompt to Gemini...');

    try {
        // Using gemini-pro which is stable and widely available
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(aiPrompt);
        const response = await result.response;
        let generatedHtml = response.text();

        // Cleanup: Remove markdown code blocks if present
        if (generatedHtml.includes('```html')) {
            generatedHtml = generatedHtml.replace(/```html/g, '').replace(/```/g, '');
        } else if (generatedHtml.includes('```')) {
            generatedHtml = generatedHtml.replace(/```/g, '');
        }

        // Ensure it looks like HTML
        if (!generatedHtml.trim().startsWith('<!DOCTYPE html>')) {
            const start = generatedHtml.indexOf('<!DOCTYPE html>');
            if (start !== -1) {
                generatedHtml = generatedHtml.substring(start);
            } else {
                // Fallback if model just outputted body or something weird, wrap it (though unlikely with strict prompt)
                generatedHtml = `<!DOCTYPE html><html><body>${generatedHtml}</body></html>`;
            }
        }

        console.log('HTML generated successfully.');

        res.setHeader('Content-Disposition', 'attachment; filename="valentine-game.html"');
        res.setHeader('Content-Type', 'text/html');
        res.send(generatedHtml);

    } catch (error) {
        console.error('Generation Error:', error);

        let errorMessage = 'Failed to generate game. Ensure Gemini API key is correct.';
        if (error.status === 429) {
            errorMessage = 'Contact 9420954029 for support. Please wait a moment and try again.';
        } else if (error.status === 503) {
            errorMessage = 'Model is overloaded. Please try again in a few seconds.';
        }

        res.status(error.status || 500).json({
            error: errorMessage,
            details: error.message
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
