import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 逆の概念 → URL の辞書
const urlMap = {
  "cat": "https://www.youtube.com/watch?v=j5a0jTc9S10",
  "dog": "https://www.youtube.com/watch?v=2Z4m4lnjxkY",
  "light": "https://example.com/light",
  "dark": "https://example.com/dark"
};

export default async function handler(req, res) {
  const { query } = req.body;

  // AIに反対語を生成させる
  const completion = await client.responses.create({
    model: "gpt-4o-mini",
    input: `「${query}」の逆の概念を1語の英語で返してください。`
  });

  const reversed = completion.output_text.trim().toLowerCase();

  const url = urlMap[reversed] || "https://www.wikipedia.org/";

  res.status(200).json({ reversed, url });
}
