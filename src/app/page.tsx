import {Header} from "@/components/Header";
import {Hero} from "@/components/Hero";
import {ProjectStatement} from "@/components/ProjectStatement";
import {Collections} from "@/components/Collections";
import {About} from "@/components/About";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectStatement />
        <Collections />
        <About />
      </main>
    </>
  );
}
