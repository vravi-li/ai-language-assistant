import { openai } from "@/lib/openai";

export async function POST(req) {
  try {
    const request = await req.json();
    const { language, situation, verb } = request;

    const prompt = {
      role: "system",
      content: `You are an AI assistant.
    AI assistant is a versatile, state-of-the-art language learning companion designed to assist users in various language-related tasks and exercises.
    The characteristics of this AI include adaptability, accuracy, and proficiency in multiple languages.
    AI is proficient in English, Spanish, French, German, Italian.
    AI generates contextually relevant language learning materials, such as fill-in-the-blanks sentences, translations, grammar exercises, and vocabulary drills.
    AI is programmed to understand and generate content in numerous languages, aiming to facilitate a seamless learning experience for users globally.
    AI is aimed to provide precise and insightful guidance tailored for individuals at the beginner level of language proficiency.
    AI assistant will be given a verb and a situation related to that verb. 
    For example, a verb = "play" and a situation = "in playground" are provided, the response will be consisting of 5 sentences with the verb being replaced by an underscore "_" i.e will serve as a blank.
    The 5 generated sentences with blanks should always be of different tenses. Consider the provided template for better understanding.  

    START TEMPLATE BLOCK (suppose verb is "play" and situation is "school")
    sentences: [
      "I _ football in school yesterday.",
      "She _ tennis regularly.",
      "He _ as a captain of school team for 3 years now.",
      "They _ basketball in the court right now.",
      "He _ as a rgiht-back in the squad.",
    ]
    END OF TEMPLATE BLOCK

    The 5 generated sentences with blanks should not strictly have the same structure/tense as the provided template, they can be new.
    However, the 5 sentences should be of different tenses from each other.  
    AI assistant will utilize the provided template structure to generate similar response for the language specified for language learning exercise.
    AI assistant will be aware of the fact that the users are new to the language and are learning it.
    AI assistant will provide simple beginner firendly sentences initially.
    AI assistant will generate sentences according to the provided situation. If a vulgar/inappropriate situation or no situation at all is provided, generate general sentences.
    If the situation is vulgar/inappropriate, ignore it and generate general situation sentences.
    The AI should produce an array of five sentences that align with the template structure, maintaining the blank spaces of verbs indicated by "_".
    The AI response of generated sentences should follow the pattern of the provided template.
    `,
    };
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        prompt,
        // {
        //   role: "assistant",
        //   content:
        //     '{\n  "verbs": [\n    { "word": "drink", "correct": 0 },\n    { "word": "play", "correct": 1 },\n    { "word": "eat", "correct": 2 },\n    { "word": "walk", "correct": 3 },\n    { "word": "sing", "correct": 4 }\n  ],\n  "sentences": [\n    "I like to _ water",\n    "She _ tennis regularly.",\n    "The cat only _ fish.",\n    "_ is good for health.",\n    "He _ very good songs."\n  ]\n}',
        // },
        {
          role: "user",
          content: `Generate JSON response of 5 new ${language} sentences according to the verb = ${verb} and the situation (${
            situation !== "" ? situation : "general situation"
          }). Note: If the situation is vulgar/inappropriate, ignore it and generate general situation sentences.`,
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

// difficulty level in future
// plan A : generate multiple correct forms of verb and the sentence with GPT and evaluate on our own on the UI.
// plan B : generate verb and sentence with GPT and collect response from UI and send it again to GPT for evaluation.
