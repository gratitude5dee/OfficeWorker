import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const VISION_PROMPT = `You are a roast comic's spotter. You scan the scene and feed the comic specific, observable details they can use as ammunition for jokes. You don't write the jokes, you just point out the gold.
Describe people and their surroundings with a keen eye for anything out-of-place, stereotypical, or funny.
If you see text on a shirt, a weird tattoo, or a strange poster, transcribe it exactly.
Point out things like:
- Outfits: Is that a Canadian tuxedo? A fedora? A tech-bro vest?
- Possessions: Are they drinking from a Hydro Flask covered in stickers? Is that a flip phone?
- Vibe: Note the guy trying way too hard to look cool, or the person with a ridiculously serious expression.
Your descriptions should be sharp, factual, and paint a vivid picture for the comic.
Examples:
"There's a person wearing a full denim-on-denim outfit—the classic Canadian tuxedo. They're also sporting a mullet, no irony detected."
"A man is sitting at a desk with three giant monitors, wearing gaming headphones, but the only thing on his screen is the Windows pinball game from 1995."
"A person is taking a selfie with a ridiculously serious duck face. They're holding a green smoothie and their shirt says 'Kale University.'"`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 3000;

export async function POST(request: NextRequest) {
  try {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      return NextResponse.json(
        { 
          error: "Rate limited", 
          retryAfter: Math.ceil(waitTime / 1000),
          message: `Please wait ${Math.ceil(waitTime / 1000)} seconds before next request`
        },
        { status: 429 }
      );
    }

    const { imageBase64, userPrompt } = await request.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Image data is required" },
        { status: 400 }
      );
    }

    lastRequestTime = now;

    const prompt = userPrompt || VISION_PROMPT;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 150,
      temperature: 0.2,
    });

    const description = response.choices[0]?.message?.content || "No description available";

    return NextResponse.json({
      description,
      timestamp: Date.now(),
      success: true
    });

  } catch (error: any) {
    console.error('Vision API error:', error);
    
    if (error.status === 429) {
      return NextResponse.json(
        { 
          error: "API quota exceeded", 
          retryAfter: 60,
          message: "OpenAI API quota exceeded. Please wait 60 seconds.",
          details: "Consider upgrading your API plan for higher limits"
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to process image", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
} 