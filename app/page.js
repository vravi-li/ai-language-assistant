import Hero from "@/components/ui/Hero";
import Footer from "@/components/ui/Footer";
import Exercise from "@/components/ui/Exercise";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="px-4 md:px-6 my-16">
        <Exercise />
      </section>
    </>
  );
}
