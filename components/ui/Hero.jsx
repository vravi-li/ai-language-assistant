export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-zinc-200">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none">
              Language Learning with GPT
            </h1>
            <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl dark:text-gray-400">
              Enhance your language skills with the 'Fill in the Conjugations'
              exercise. Powered by GPT, it's fun and interactive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
