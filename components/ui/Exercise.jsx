"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Check from "../icons/Check";
import Cancel from "../icons/Cancel";

export default function Exercise() {
  // Hard-coded data
  // const verb = [
  //   { word: "eat", correct: 2 },
  //   { word: "play", correct: 1 },
  //   { word: "sing", correct: 4 },
  //   { word: "drink", correct: 0 },
  //   { word: "walk", correct: 3 },
  // ];
  // const sentence = [
  //   "I like to _ water",
  //   "She _ tennis regularly.",
  //   "The cat only _ fish.",
  //   "_ is good for health.",
  //   "He _ very well songs.",
  // ];
  // const response = [
  //   {
  //     isVerbCorrect: true,
  //     explanation: "The verb used in this sentence is correct.",
  //   },
  //   {
  //     isVerbCorrect: false,
  //     explanation:
  //       "Incorrect verb form used ('play' should be 'plays' to match the subject 'She').",
  //   },
  //   {
  //     isVerbCorrect: false,
  //     explanation: "Incorrect verb form used ('eating' should be 'eats').",
  //   },
  //   {
  //     isVerbCorrect: true,
  //     explanation: "The verb used in this sentence is correct.",
  //   },
  //   {
  //     isVerbCorrect: false,
  //     explanation: "The verb used in this sentence is correct.",
  //   },
  // ];

  // states
  const [situation, setSituation] = useState("");
  const [language, setLanguage] = useState("english");
  const [blanks, setBlanks] = useState([]);
  const [verbs, setVerbs] = useState([]);
  const [answers, setAnswers] = useState(Array(blanks.length).fill(""));
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    setAnswers(Array(blanks.length).fill(""));
  }, [blanks]);

  // buttons states
  const [generateButton, setGenerateButton] = useState(false);
  const [checkButton, setCheckButton] = useState(false);

  // copies verb
  const copyVerbToClipboard = async (word) => {
    await navigator.clipboard.writeText(word);
  };

  // handles multiple blanks input in a single state
  const handleInputChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  // calls generate chat api to generate verbs and sentences
  const generateBlanks = async () => {
    setGenerateButton(true);
    const res = await axios.post("/api/chat/generate", { language: language });
    const { data } = res;
    console.log(data.verbs);

    const shuffledVerbs = data.verbs
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    console.log(shuffledVerbs);
    setVerbs(shuffledVerbs);
    setBlanks(data.sentences);
    setGenerateButton(false);
    console.log(data);
  };

  // calls results api and produce explanations
  const checkAnswers = async () => {
    // checks if all blanks filled
    for (const ans of answers) {
      if (ans.length == 0) {
        console.log("Please fill all the blanks first.");
        return;
      }
    }
    setCheckButton(true);
    // convert blanks into complete sentences array
    const filled = [];
    blanks.forEach((s, i) => {
      const finalAnswer = s.replace("_", answers[i]);
      filled.push(finalAnswer);
    });

    // console.log(filled);
    // calls api to check the anwers
    const res = await axios.post("/api/chat/result", { sentences: filled });
    const { data } = res;
    setResponses(data);
    setCheckButton(false);
    console.log(data);
  };

  return (
    <Card className="mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Fill in the Verbs</h2>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 dark:text-gray-400">
          Select a language and a situation, then click on Generate button.
        </p>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-8 items-center gap-4">
            <Label className="text-left" htmlFor="language">
              Language
            </Label>
            <Select className="col-start-2 col-span-7">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <Label className="text-left" htmlFor="situation">
              Situation
            </Label>
            <Input
              className="col-start-2 col-span-7"
              placeholder="E.g. At the restaurant, On a vacation, etc."
            />
          </div>
          {/* generate button */}
          <div className="grid grid-cols-8 items-center gap-4">
            <div className="col-span-8 flex justify-end">
              <Button
                className="mx-2 bg-blue-500 text-white"
                onClick={generateBlanks}
                disabled={generateButton}
              >
                Generate
              </Button>
            </div>
          </div>

          {/* verbs */}
          {verbs.length > 0 && (
            <div className="grid grid-cols-8 items-center gap-4">
              <Label className="text-left" htmlFor="verb">
                Verbs
              </Label>
              <ul className="flex gap-3 col-start-2 col-span-7">
                {verbs.map((v) => {
                  const { word, correct } = v;
                  return (
                    <li
                      key={correct}
                      value={correct}
                      className="border border-zinc-300 px-3 py-1 rounded-md cursor-pointer hover:shadow-md"
                      onClick={() => copyVerbToClipboard(word)}
                    >
                      {word}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {/* blanks */}
          {blanks.length > 0 && (
            <>
              {blanks.map((s, i) => {
                const splittedSentence = s.split("_");
                return (
                  <div
                    className="grid grid-cols-8 items-center gap-4 my-1"
                    key={i}
                  >
                    <Label className="text-left" htmlFor="sentence1">
                      Sentence {i}
                    </Label>
                    <div className="flex col-start-2 col-span-7 items-center">
                      <p>{splittedSentence[0]}</p>
                      <input
                        type="text"
                        className="border-b border-zinc-200 focus:outline-none focus:border-blue-300 text-center w-24 mx-2 text-blue-700"
                        maxLength={11}
                        value={answers[i]}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <p>{splittedSentence[1]}</p>
                      {responses[i] &&
                        (responses[i].isVerbCorrect ? <Check /> : <Cancel />)}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        {/* check & clear button */}
        {blanks.length > 0 && (
          <>
            <hr className="mx-10" />
            <div className="flex justify-center py-4">
              <Button
                className="mx-2 bg-blue-500 text-white"
                onClick={checkAnswers}
                disabled={checkButton}
              >
                Check Answers
              </Button>
              <Button
                className="mx-2 bg-red-500 text-white"
                onClick={() => console.log(verbs, "\n", blanks)}
              >
                Clear
              </Button>
            </div>
          </>
        )}
        {/* results */}
        {responses.length > 0 && (
          <div className="">
            <h1 className="text-xl font-bold">Results</h1>
            <ul className="flex gap-2 flex-col my-3">
              {responses.map((res, i) => {
                return (
                  <li>
                    <p>
                      <span className="font-semibold">Sentence {i}: </span>{" "}
                      {res.explanation}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
