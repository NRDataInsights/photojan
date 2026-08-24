import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectStatement } from "@/components/ProjectStatement";
import { Follow } from "@/components/Follow";
import { Collections } from "@/components/Collections";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <ProjectStatement />
        <Follow />
        <Collections />
        <About />
        <Contact />
      </main>
    </>
  );
}