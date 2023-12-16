import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const request = await req.json();
  const { language } = request;
  // difficulty level in future
  // const template = {
  //   verbs: [
  //     { word: "eat", correct: 2 },
  //     { word: "play", correct: 1 },
  //     { word: "sing", correct: 4 },
  //     { word: "drink", correct: 0 },
  //     { word: "walk", correct: 3 },
  //   ],
  //   sentences: [
  //     "I like to _ water",
  //     "She _ tennis regularly.",
  //     "The cat only _ fish.",
  //     "_ is good for health.",
  //     "He _ very good songs.",
  //   ],
  // };
  const prompt = {
    role: "system",
    content: `You are an AI assistant.
    AI assistant is a versatile, state-of-the-art language learning companion designed to assist users in various language-related tasks and exercises.
    The characteristics of this AI include adaptability, accuracy, and proficiency in multiple languages.
    AI is proficient in English, Spanish, French, German, Italian.
    AI generates contextually relevant language learning materials, such as fill-in-the-blanks sentences, translations, grammar exercises, and vocabulary drills.
    AI is programmed to understand and generate content in numerous languages, aiming to facilitate a seamless learning experience for users globally.
    AI is aimed to provide precise and insightful guidance tailored for individuals at the beginner level of language proficiency.
    START TEMPLATE BLOCK
    {
      verbs: [
        { word: "drink", correct: 0 },
        { word: "play", correct: 1 },
        { word: "eat", correct: 2 },
        { word: "walk", correct: 3 },
        { word: "sing", correct: 4 },
      ],
      sentences: [
        "I like to _ water",
        "She _ tennis regularly.",
        "The cat only _ fish.",
        "_ is good for health.",
        "He _ very good songs.",
      ],
    }
    END OF TEMPLATE BLOCK
    AI assistant will utilize the provided template structure to generate similar template for the language specified for language learning exercise.
    AI assistant will be aware of the fact that the users are new to the language and are learning it.
    AI assistant will provide simple beginner firendly sentences/verbs initially.
    The AI should produce an array of five sentences that align with the template structure, incorporating verbs appropriately into the sentences while maintaining the blank spaces indicated by "_".
    AI should provide an array of the corresponding verbs that will be filled in the _ blanks following this structure: { word: "eat", correct: 2 }. Where "word" is the general base form of verb and "correctWord" is the correct form of verb that will complete the sentence in the sentence array. And "correct" is the index of corresponding sentence in the sentence array.
    AI should ensure that the "correct" property in the verbs array should be the index of corresponding sentence.
    The AI response of generated sentences should follow the pattern of the provided template.
    `,
  };
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      prompt,
      {
        role: "assistant",
        content:
          '{\n  "verbs": [\n    { "word": "drink", "correct": 0 },\n    { "word": "play", "correct": 1 },\n    { "word": "eat", "correct": 2 },\n    { "word": "walk", "correct": 3 },\n    { "word": "sing", "correct": 4 }\n  ],\n  "sentences": [\n    "I like to _ water",\n    "She _ tennis regularly.",\n    "The cat only _ fish.",\n    "_ is good for health.",\n    "He _ very good songs."\n  ]\n}',
      },
      {
        role: "user",
        content: `Generate JSON response of other new 5 ${language} sentences and their corresponding verbs (general verb and correct form of verb) strictly following this template:
        {
          verbs: [
            { word: "drink", correct: 0 },
            { word: "play", correct: 1 },
            { word: "eat", correct: 2 },
            { word: "walk", correct: 3 },
            { word: "sing", correct: 4 },
          ],
          sentences: [
            "I like to _ water",
            "She _ tennis regularly.",
            "The cat only _ fish.",
            "_ is good for health.",
            "He _ very good songs.",
          ],
        }`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const chat = chatCompletion.choices[0];

  const res = JSON.parse(chat.message.content);

  return Response.json(res);
}

// plan A : generate multiple correct forms of verb and the sentence with GPT and evaluate on our own on the UI.
// plan B : generate verb and sentence with GPT and collect response from UI and send it again to GPT for evaluation.
