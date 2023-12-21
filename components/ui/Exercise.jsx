"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import Check from "../icons/Check";
import Cancel from "../icons/Cancel";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function Exercise() {
  // states
  const [situation, setSituation] = useState("");
  const [language, setLanguage] = useState("DEFAULT");
  const [blanks, setBlanks] = useState([]);
  const [verbs, setVerbs] = useState([]);
  const [selectedVerb, setSelectedVerb] = useState("");
  const [answers, setAnswers] = useState(Array(blanks.length).fill(""));
  const [responses, setResponses] = useState([]);
  const [phase, setPhase] = useState("first");

  useEffect(() => {
    setAnswers(Array(blanks.length).fill(""));
  }, [blanks]);

  // buttons states
  const [generateButton, setGenerateButton] = useState(false);
  const [checkButton, setCheckButton] = useState(false);
  const [verbsButton, setVerbsButton] = useState(false);

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

  // clears inputs
  const clearAnswers = () => {
    setAnswers(Array(blanks.length).fill(""));
  };

  // continue exercise
  const continueExercise = () => {
    setPhase("first");
    setResponses([]);
    setAnswers(Array(blanks.length).fill(""));
    setSelectedVerb("");
  };

  // select verb
  const selectVerb = (v) => {
    setPhase("second");
    setResponses([]);
    setSelectedVerb(v);
    generateBlanks(v);
    console.log(v);
  };

  // API calls
  // calls generate verbs api to generate verbs according to the situation
  const generateVerbs = async () => {
    if (language == "DEFAULT") {
      toast("Please select a language first.", {
        icon: "⚠️",
        style: {
          background: "#fcff9c",
          border: "2px solid #ffac40",
        },
      });
      return;
    }
    setGenerateButton(true);
    try {
      const toastRes = axios.post("/api/chat/generate-verbs", {
        language: language,
        situation: situation,
      });
      toast.promise(toastRes, {
        loading: "Generating verbs...",
        success: "Succesfully generated verbs!",
        error: (e) => {
          console.log(e);
          setGenerateButton(false);
          return "An error occured. Please try again!";
        },
      });
      const res = await toastRes;
      const { data } = res;

      setVerbs(data);
      setGenerateButton(false);
      setPhase("second");
    } catch (error) {
      setGenerateButton(false);
      console.log(error);
    }
  };

  // calls generate chat api to generate verbs and sentences
  const generateBlanks = async (verb) => {
    setVerbsButton(true);
    try {
      const toastRes = axios.post("/api/chat/generate", {
        language: language,
        situation: situation,
        verb: verb,
      });
      toast.promise(toastRes, {
        loading: "Generating...",
        success: "Succesfully generated blanks!",
        error: (e) => {
          console.log(e);
          return "An error occured. Please try again!";
        },
      });
      const res = await toastRes;
      const { data } = res;

      setBlanks(data);
      setPhase("third");
      setVerbsButton(false);
    } catch (error) {
      console.log(error);
      setVerbsButton(false);
    }
  };

  // calls results api and produce explanations
  const checkAnswers = async () => {
    // checks if all blanks filled
    for (const ans of answers) {
      if (ans.length == 0) {
        toast.error("Please fill all the blanks.", {
          style: {
            border: "2px solid red",
          },
        });
        return;
      }
    }
    setCheckButton(true);
    setVerbsButton(true);
    try {
      // convert blanks into complete sentences array
      const filled = [];
      blanks.forEach((s, i) => {
        const trimmedAnswer = answers[i].trim();
        const finalAnswer = s.replace("_", trimmedAnswer);
        filled.push(finalAnswer);
      });

      // calls api to check the anwers
      const toastRes = axios.post("/api/chat/result", { sentences: filled });

      toast.promise(toastRes, {
        loading: "Checking the submitted answers...",
        success: "Succesfully checked!",
        error: (e) => {
          console.log(e);
          setCheckButton(false);
          return "An error occured. Please try again!";
        },
      });

      const res = await toastRes;
      const { data } = res;
      setResponses(data);
      setCheckButton(false);
      setVerbsButton(false);
      setPhase("fourth");
    } catch (error) {
      setCheckButton(false);
      setVerbsButton(false);
      console.log(error);
    }
  };

  return (
    <Card className="mx-auto sm:w-[80%] border-zinc-200 shadow-lg">
      <Toaster position="top-center" reverseOrder={false} />
      <CardHeader>
        <h2 className="text-2xl font-bold">Fill in the Conjugations</h2>
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
            <select
              className="select select-bordered w-full max-w-xs col-start-2 col-span-3 min-h-[2.5rem] h-[2.5rem]"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                Select a language
              </option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="italian">Italian</option>
            </select>
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <Label className="text-left" htmlFor="situation">
              Situation
            </Label>
            <input
              type="text"
              className="col-start-2 col-span-7 focus:outline-none px-3 py-2 border border-zinc-300 rounded-sm text-sm"
              placeholder="Optional (E.g. At the restaurant, On a vacation, etc.)"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
            />
          </div>

          {/* generate button */}
          {phase == "first" && (
            <div className="grid grid-cols-8 items-center gap-4">
              <div className="col-span-8 flex justify-end">
                <Button
                  className="mx-2 bg-blue-500 text-white"
                  onClick={generateVerbs}
                  disabled={generateButton}
                >
                  Generate
                </Button>
              </div>
            </div>
          )}

          {/* second phase */}
          {phase !== "first" && (
            <div className="mt-2">
              <hr className="my-3" />
              <h1 className="font-bold text-lg my-2">Exercise</h1>
              {/* verbs */}
              <div className="flex flex-col gap-4">
                <Label className="text-left" htmlFor="verb">
                  Verbs{" "}
                  <span className="text-zinc-500 font-normal">
                    (Select any one of the following verbs to generate
                    sentences)
                  </span>
                </Label>
                <ul className="flex gap-3">
                  {verbs.map((v) => {
                    return (
                      <li
                        key={v}
                        value={v}
                        className={`border${
                          selectedVerb == v
                            ? "-2 bg-zinc-200 border-zinc-400"
                            : " border-zinc-300"
                        }   px-3 py-1 rounded-md ${
                          !verbsButton ? "cursor-pointer hover:shadow-md" : ""
                        }`}
                        onClick={() => {
                          // phase == "second" ?
                          selectVerb(v);
                          // : copyVerbToClipboard(v);
                        }}
                      >
                        {v}
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* blanks */}
              {phase !== "second" &&
                blanks.map((s, i) => {
                  const splittedSentence = s.split("_");
                  return (
                    <div
                      className="grid grid-cols-8 items-center gap-4 my-8"
                      key={i}
                    >
                      <Label className="text-left" htmlFor="sentence1">
                        Sentence {i}
                      </Label>
                      <div className="flex col-start-2 col-span-7 items-center">
                        <p>{splittedSentence[0]}</p>
                        <input
                          type="text"
                          className="border-b border-zinc-200 focus:outline-none focus:border-blue-300 text-center w-40 mx-2 text-blue-700"
                          maxLength={30}
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
            </div>
          )}
        </div>
        {/* check & clear button */}
        {phase == "third" && (
          <>
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
                onClick={clearAnswers}
                disabled={checkButton}
              >
                Clear
              </Button>
            </div>
          </>
        )}

        {/* results */}
        {phase == "fourth" && (
          <div className="">
            <hr className="mb-4" />
            <h1 className="text-xl font-bold">Results</h1>
            <ul className="flex gap-2 flex-col my-3">
              {responses.map((res, i) => {
                return (
                  <li key={i} className="my-2">
                    <p>
                      <span className="font-semibold">Sentence {i}: </span>{" "}
                      {res.explanation}
                    </p>
                  </li>
                );
              })}
            </ul>
            <Button
              className="mx-2 bg-green-500 text-white hover:bg-green-700"
              onClick={continueExercise}
            >
              Continue
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
