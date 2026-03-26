import { NextRequest, NextResponse } from "next/server";

const translations: Array<{ pattern: RegExp; translation: string; literal: string }> = [
  {
    pattern: /i'm fine\.?/i,
    translation: "I am absolutely NOT fine. Something is wrong and you should know what it is.",
    literal: "I'm fine.",
  },
  {
    pattern: /it's fine\.?/i,
    translation: "It is NOT fine. This is far from fine. Proceed with extreme caution.",
    literal: "It's fine.",
  },
  {
    pattern: /whatever\.?/i,
    translation: "I have given up trying to explain this to you. You have failed the conversation.",
    literal: "Whatever.",
  },
  {
    pattern: /nothing\.? i don't want to talk about it\.?/i,
    translation: "Something is very wrong. You need to ask more questions and show more concern immediately.",
    literal: "Nothing. I don't want to talk about it.",
  },
  {
    pattern: /nothing\.?/i,
    translation: "Something is very wrong. You need to figure out what it is.",
    literal: "Nothing.",
  },
  {
    pattern: /do whatever you want\.?/i,
    translation: "Please do NOT do whatever you want. The correct answer is what I want.",
    literal: "Do whatever you want.",
  },
  {
    pattern: /i don't care\.?/i,
    translation: "I care deeply. Please make the right choice — the one I'm thinking of right now.",
    literal: "I don't care.",
  },
  {
    pattern: /you're so sweet\.?/i,
    translation: "You did something nice but I'm still keeping score on everything else.",
    literal: "You're so sweet.",
  },
  {
    pattern: /we need to talk\.?/i,
    translation: "You have done something wrong. Prepare for a serious conversation. Think back over the last 72 hours.",
    literal: "We need to talk.",
  },
  {
    pattern: /sure, go ahead\.?/i,
    translation: "I want you to stay. If you leave, I will remember this forever.",
    literal: "Sure, go ahead.",
  },
  {
    pattern: /i'm not angry\.?/i,
    translation: "I am furious. The level of anger is inversely proportional to the calmness of this statement.",
    literal: "I'm not angry.",
  },
  {
    pattern: /i'm tired\.?/i,
    translation: "I am emotionally exhausted. Stop what you're doing and ask me how I'm doing.",
    literal: "I'm tired.",
  },
  {
    pattern: /no, it's okay\.?/i,
    translation: "It is not okay. Apologize again, and this time mean it.",
    literal: "No, it's okay.",
  },
  {
    pattern: /i just want you to be happy\.?/i,
    translation: "I am not happy right now. Please ask why.",
    literal: "I just want you to be happy.",
  },
  {
    pattern: /maybe\.?/i,
    translation: "No, but I'm giving you a chance to convince me otherwise with effort.",
    literal: "Maybe.",
  },
  {
    pattern: /you never listen\.?/i,
    translation: "You have not been listening to me. This has been going on for a while. This is serious.",
    literal: "You never listen.",
  },
  {
    pattern: /you always do this\.?/i,
    translation: "You have done this specific thing repeatedly and I have been keeping track the entire time.",
    literal: "You always do this.",
  },
  {
    pattern: /forget it\.?/i,
    translation: "I will not forget it. Please ask what's wrong and do not give up after the first 'no'.",
    literal: "Forget it.",
  },
  {
    pattern: /i'm not in the mood\.?/i,
    translation: "You have done something (or not done something) that has directly caused this mood.",
    literal: "I'm not in the mood.",
  },
  {
    pattern: /i just need some space\.?/i,
    translation: "I want you to chase me a little bit. Do not actually give me space right now.",
    literal: "I just need some space.",
  },
  {
    pattern: /do you think she's pretty\??/i,
    translation: "There is no correct answer to this question. Proceed carefully. The word 'no' is your only option.",
    literal: "Do you think she's pretty?",
  },
  {
    pattern: /does this look okay on me\??/i,
    translation: "Tell me I look amazing. Any hesitation will be noted and prosecuted.",
    literal: "Does this look okay on me?",
  },
  {
    pattern: /you decide\.?/i,
    translation: "I already know what I want. You have one chance to guess correctly.",
    literal: "You decide.",
  },
  {
    pattern: /i'm not mad at you\.?/i,
    translation: "I am disappointed in you, which is worse than being mad.",
    literal: "I'm not mad at you.",
  },
  {
    pattern: /it doesn't matter\.?/i,
    translation: "It matters enormously. This will be brought up again at a later date.",
    literal: "It doesn't matter.",
  },
];

function translate(input: string): { translation: string; matched: boolean; matchedPhrase?: string } {
  const trimmed = input.trim();

  for (const entry of translations) {
    if (entry.pattern.test(trimmed)) {
      return {
        translation: entry.translation,
        matched: true,
        matchedPhrase: entry.literal,
      };
    }
  }

  // Generic fallback translation
  const lower = trimmed.toLowerCase();
  if (lower.includes("fine") || lower.includes("okay") || lower.includes("ok")) {
    return {
      translation: "This is almost certainly not fine or okay. Investigate further.",
      matched: true,
    };
  }

  if (lower.includes("nothing")) {
    return {
      translation: "It is definitely not nothing. Something is wrong.",
      matched: true,
    };
  }

  if (lower.endsWith("?")) {
    return {
      translation: `This question has a hidden agenda. The real question is: 'Do you care about me enough to figure out what I really mean?'`,
      matched: false,
    };
  }

  return {
    translation: `Translation unclear — but safe to assume emotions are involved and your full attention is required.`,
    matched: false,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body as { text: string };

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text field" }, { status: 400 });
    }

    if (text.length > 500) {
      return NextResponse.json({ error: "Text too long (max 500 characters)" }, { status: 400 });
    }

    const result = translate(text);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
