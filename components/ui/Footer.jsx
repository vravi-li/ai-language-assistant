import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "./card";
import { Button } from "./button";

export default function Footer() {
  return (
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
  );
}
