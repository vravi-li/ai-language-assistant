const verb = [
  { word: "eat", correct: 2 },
  { word: "play", correct: 1 },
  { word: "sing", correct: 4 },
  { word: "drink", correct: 0 },
  { word: "walk", correct: 3 },
];
const sentence = [
  "I like to _ water",
  "She _ tennis regularly.",
  "The cat only _ fish.",
  "_ is good for health.",
  "He _ very well songs.",
];
const response = [
  {
    isVerbCorrect: true,
    explanation: "The verb used in this sentence is correct.",
  },
  {
    isVerbCorrect: false,
    explanation:
      "Incorrect verb form used ('play' should be 'plays' to match the subject 'She').",
  },
  {
    isVerbCorrect: false,
    explanation: "Incorrect verb form used ('eating' should be 'eats').",
  },
  {
    isVerbCorrect: true,
    explanation: "The verb used in this sentence is correct.",
  },
  {
    isVerbCorrect: false,
    explanation: "The verb used in this sentence is correct.",
  },
];
export default { verb, response, sentence };
