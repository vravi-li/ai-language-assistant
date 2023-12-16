import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const request = await req.json();
  const { sentences } = request;

  // const sentences = [
  //   "They goes to the park every Sunday.",
  //   "The dog barks loudly at night.",
  //   "We swimming in the pool yesterday.",
  //   "She reads books every evening.",
  //   "He play football with his friends.",
  // ];

  const prompt = {
    role: "system",
    content: `You are an AI assistant.
    AI assistant is a versatile, state-of-the-art language learning companion designed to assist users in various language-related tasks and exercises.
    The characteristics of this AI include adaptability, accuracy, and proficiency in multiple languages.
    AI is proficient in English, Spanish, French, German, Italian.
    AI generates contextually relevant language learning materials, such as fill-in-the-blanks sentences, translations, grammar exercises, and vocabulary drills.
    AI is programmed to understand and generate content in numerous languages, aiming to facilitate a seamless learning experience for users globally.
    AI is aimed to provide precise and insightful guidance tailored for individuals at the beginner level of language proficiency.
    AI assistant will analyze the provided sentences from the sentences array and only check if the verb used in the sentences are correct.
    START INPUT BLOCK
    [
      "I like to drink water",
      "She play tennis regularly.",
      "The cat only eating fish.",
      "Walking is good for health.",
      "He sings very well songs.",
    ]
    END OF INPUT BLOCK
    If the verbs used in the sentences are not grammatically correct, then point out the mistake and provide the correct verb form.
    For example, after analyzing the input block, you will generate response in the below given Output block form in which "isCorrect" property shows if the verb (with its form) is correct or not and the "explanation" property simply explains what is wrong/right in only one line.
    START OUTPUT BLOCK
    [
      { "isVerbCorrect": true, "explanation": "The verb used in this sentence is correct." },
      { "isVerbCorrect": false, "explanation": "Incorrect verb form used ('play' should be 'plays' to match the subject 'She')." },
      { "isVerbCorrect": false, "explanation": "Incorrect verb form used ('eating' should be 'eats')." },
      { "isVerbCorrect": true, "explanation": "The verb used in this sentence is correct." },
      { "isVerbCorrect": false, "explanation": "The verb used in this sentence is correct." }
    ]
    END OF OUTPUT BLOCK
    AI assistant will generate response in the provided template structure of OUTPUT BLOCK.
    AI assistant will be aware of the fact that the users are new to the language and are learning it.
    The AI should produce an array of five objects consisting of "isVerbCorrect" and "explanation" properties that align with the template structure.
    AI should ensure that the "explanation", in case of wrong verb, should be simple and straightforward.
    The AI response of generated sentences should follow the pattern of the provided template.
    `,
  };
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      prompt,
      {
        role: "user",
        content: `Generate JSON response by analyzing these sentences (general verb and correct form of verb) strictly following the defined Output Block template (return array with objects of corresponding sentences containing "isVerbCorrect" and "explanation" properties).
        Sentences Input block:
        [
          "They goes to the park every Sunday.",
          "The dog barks loudly at night.",
          "We swimming in the pool yesterday.",
          "She reads books every evening.",
          "He play football with his friends.",
        ]`,
      },
      {
        role: "assistant",
        content:
          '[\n  { "isVerbCorrect": false, "explanation": "Incorrect verb form used (\'goes\' should be \'go\' to match the subject \'They\')." },\n  { "isVerbCorrect": true, "explanation": "The verb used in this sentence is correct." },\n  { "isVerbCorrect": false, "explanation": "Incorrect verb form used (\'swimming\' should be \'swam\')." },\n  { "isVerbCorrect": true, "explanation": "The verb used in this sentence is correct." },\n  { "isVerbCorrect": false, "explanation": "Incorrect verb form used (\'play\' should be \'plays\' to match the subject \'He\')." }\n]',
      },
      {
        role: "user",
        content: `Great. Now similarly, generate JSON response by analyzing these sentences (general verb and correct form of verb) strictly following the defined Output Block template (return array with objects of corresponding sentences containing "isVerbCorrect" and "explanation" properties).
        Sentences Input block:
        ${sentences}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const chat = chatCompletion.choices[0];

  const response = JSON.parse(chat.message.content);

  return Response.json(response);
}
