export default async function handler(req, res) {
module.exports = async function handler(req, res) {
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' });
}

const { question, sensorContext } = req.body;

  if (!question || !sensorContext) {
    return res.status(400).json({ error: 'Missing question or sensorContext' });
  }

try {
const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        'Authorization': 'Bearer ' + process.env.GROQ_API_KEY
},
body: JSON.stringify({
model: 'openai/gpt-oss-120b',
@@ -23,9 +27,17 @@ export default async function handler(req, res) {
});

const data = await groqRes.json();

    if (data.error) {
      console.error('Groq error:', data.error);
      return res.status(500).json({ error: data.error.message });
    }

const text = data.choices?.[0]?.message?.content || 'Maaf, ada gangguan. Coba lagi ya!';
    res.status(200).json({ text });
    return res.status(200).json({ text });

} catch (err) {
    res.status(500).json({ error: 'Server error' });
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Server error: ' + err.message });
}
}
