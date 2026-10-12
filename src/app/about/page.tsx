
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        <About />
        <Contact />
      </main>
    </>
  );
}
