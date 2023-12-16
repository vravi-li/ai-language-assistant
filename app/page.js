import Hero from "@/components/ui/hero";
import Footer from "@/components/ui/footer";
import Exercise from "@/components/ui/exercise";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="px-4 md:px-6 my-16">
        <Exercise />
      </section>
      <Footer />
    </>
  );
}
