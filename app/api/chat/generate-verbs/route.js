import { openai } from "@/lib/openai";

export async function POST(req) {
  try {
    const request = await req.json();
    const { language, situation } = request;
    const prompt = {
      role: "system",
      content: `You are an AI assistant.
      AI assistant is a versatile, state-of-the-art language learning companion designed to assist users in various language-related tasks and exercises.
      The characteristics of this AI include adaptability, accuracy, and proficiency in multiple languages.
      AI is proficient in English, Spanish, French, German, Italian.
      AI generates contextually relevant language learning materials, such as fill-in-the-blanks sentences, translations, grammar exercises, and vocabulary drills.
      AI is programmed to understand and generate content in numerous languages, aiming to facilitate a seamless learning experience for users globally.
      AI is aimed to provide precise and insightful guidance tailored for individuals at the beginner level of language proficiency.
      AI assistant will be given a situation as a context related to which, it has to generate 5 verbs that can possibly be used in sentences in that situation.
      Such as the situation "at school" is provided, now 5 verbs provided like in the template below will be generated. These verbs can be used in sentences related to the given situation of "at school".
      START TEMPLATE BLOCK
      verbs = ["play", "study", "read", "go", "take"]
      END OF TEMPLATE BLOCK
      AI assistant will utilize the provided template structure to generate similar response for the language specified to be used as language learning exercise.
      AI assistant will be aware of the fact that the users are new to the language and are learning it.
      AI assistant must provide simple beginner firendly verbs initially.
      If the situation is vulgar/inappropriate, ignore it and generate general situation verbs.
      The AI should produce an array of five verbs.
      The AI response of generated sentences should follow the pattern of the provided template.
      `,
    };
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        prompt,
        {
          role: "user",
          content:
            "Generate 5 english language verbs related to the situation: at school. If no situation is provided or the situation provided is vulgar/inappropriate, generate verbs related to general situation.",
        },
        {
          role: "assistant",
          content: '["play", "study", "read", "go", "teach"]',
        },
        {
          role: "user",
          content: `Generate another 5 ${language} language verbs related to the situation: ${situation}. If no situation is provided or the situation provided is vulgar/inappropriate, generate verbs related to general situation.`,
        },
      ],
      model: "gpt-4",
    });
    const chat = chatCompletion.choices[0];

    const res = JSON.parse(chat.message.content);

    return Response.json(res);
  } catch (error) {
    console.error("An error occurred:", error);
    return new Response("An error occurred", { status: 500 });
  }
}
