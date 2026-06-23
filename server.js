const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

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

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500
      })
    });

    const data = await response.json();
    console.log('Mistral status:', response.status);
    console.log('Mistral data:', JSON.stringify(data).substring(0, 300));

    const text = data.choices?.[0]?.message?.content || '';
    res.json({ text });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.send('Jeevan Health Assistant API running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
