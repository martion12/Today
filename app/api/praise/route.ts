import { NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = 'force-dynamic';

// OpenRouter client setup
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  defaultHeaders: {
    "HTTP-Referer": "https://todayyoureamazing.com",
    "X-Title": "Today You're Amazing",
  },
});

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Invalid content provided" },
        { status: 400 }
      );
    }

    // Prepare the prompt for the AI
    const systemPrompt = `你是一个专业的夸奖师，擅长针对用户的具体行为给予积极、真诚、具体的夸奖。
请根据用户分享的内容，给予一句鼓励性的夸奖，要求：
1. 具体描述用户做了什么，避免笼统的表扬
2. 关注用户的进步，而非完美结果
3. 使用鼓励性语言，如"你做得很好，这说明你有能力做到更好"
4. 避免任何批评或否定
5. 让用户感受到行动是可控且有方向的
6. 夸奖内容控制在1-2句话内，简洁有力
7. 语气温暖真诚`;

    // Call the AI model
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const praise = completion.choices[0]?.message?.content || "你真的太棒了！";

    return NextResponse.json({ praise });
  } catch (error) {
    console.error("Error generating praise:", error);
    return NextResponse.json(
      { error: "Failed to generate praise" },
      { status: 500 }
    );
  }
}