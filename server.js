const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.options('/api/symptom-check', cors());

app.post('/api/symptom-check', async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    const prompt = `You are a compassionate medical AI assistant for Jeevan Sandhya Old Age Home.
An elderly resident has described their symptoms. Analyze and respond clearly.
The resident may write in English, Hindi, or Gujarati — understand all three languages.

Symptoms: "${symptoms}"

Respond in this exact format:
STATUS: [EMERGENCY / SEE_DOCTOR / SELF_CARE]
TITLE: [A short caring title]
EXPLANATION: [2-3 sentences explaining what might be happening in simple words]
ADVICE: [2-3 specific things they should do right now]
NOTE: [Any important warning or reassurance]

Keep language simple and warm for elderly people. Do not use medical jargon.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    console.log('Gemini response status:', response.status);
    console.log('Gemini data:', JSON.stringify(data).substring(0, 200));
    
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.send('Jeevan Health Assistant API running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
