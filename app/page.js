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
import { Avatar } from "@/components/ui/avatar";

export default function Home() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#f7f5f5]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none">
                Language Learning with GPT-4
              </h1>
              <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl dark:text-gray-400">
                Enhance your language skills with the 'Fill in the Verbs'
                exercise. Powered by GPT-4, it's fun and interactive.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container px-4 md:px-6 my-16">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <h2 className="text-2xl font-bold">Fill in the Verbs</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">
              Select a language and a situation, then complete the sentences by
              filling in the correct verb form.
            </p>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="language">
                  Language
                </Label>
                <Select className="col-span-3">
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="situation">
                  Situation
                </Label>
                <Input
                  className="col-span-3"
                  placeholder="E.g. At the restaurant, On a vacation, etc."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-4 flex justify-end">
                  <Button className="mx-2 bg-blue-500 text-white">
                    Submit
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="verb">
                  Verb
                </Label>
                <Input
                  className="col-span-3"
                  readOnly
                  value="Dynamically generated verb"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="sentence1">
                  Sentence 1
                </Label>
                <Input
                  className="col-span-3"
                  placeholder="[_______] (Fill in the conjugation)"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="sentence2">
                  Sentence 2
                </Label>
                <Input
                  className="col-span-3"
                  placeholder="[_______] (Fill in the conjugation)"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="sentence3">
                  Sentence 3
                </Label>
                <Input
                  className="col-span-3"
                  placeholder="[_______] (Fill in the conjugation)"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="sentence4">
                  Sentence 4
                </Label>
                <Input
                  className="col-span-3"
                  placeholder="[_______] (Fill in the conjugation)"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="sentence5">
                  Sentence 5
                </Label>
                <Input
                  className="col-span-3"
                  placeholder="[_______] (Fill in the conjugation)"
                />
              </div>
            </div>
          </CardContent>
          <div className="flex justify-center py-4">
            <Button className="mx-2 bg-blue-500 text-white">
              Check Answers
            </Button>
            <Button className="mx-2 bg-red-500 text-white">Clear</Button>
          </div>
        </Card>
      </section>
      <section className="container px-4 md:px-6 my-16">
        <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
        <div className="flex flex-wrap gap-4">
          <Card className="w-full md:w-1/2 lg:w-1/3">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Avatar
                  className="w-10 h-10"
                  src="/placeholder.svg?height=50&width=50"
                />
                <h3 className="text-lg font-bold">GPT-4 Grammar Guide</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">
                Comprehensive guide on [selected language] grammar by GPT-4.
              </p>
            </CardContent>
            <div className="flex justify-end py-4">
              <Button variant="link">Learn more</Button>
            </div>
          </Card>
          <Card className="w-full md:w-1/2 lg:w-1/3">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Avatar
                  className="w-10 h-10"
                  src="/placeholder.svg?height=50&width=50"
                />
                <h3 className="text-lg font-bold">Verb Tense Exercises</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">
                Practice verb tenses with these interactive exercises.
              </p>
            </CardContent>
            <div className="flex justify-end py-4">
              <Button variant="link">Learn more</Button>
            </div>
          </Card>
          <Card className="w-full md:w-1/2 lg:w-1/3">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Avatar
                  className="w-10 h-10"
                  src="/placeholder.svg?height=50&width=50"
                />
                <h3 className="text-lg font-bold">Language Learning Tips</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">
                Find out how to effectively learn a new language.
              </p>
            </CardContent>
            <div className="flex justify-end py-4">
              <Button variant="link">Learn more</Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
