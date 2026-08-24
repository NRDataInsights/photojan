import {Header} from "@/components/Header";
import {Hero} from "@/components/Hero";
import {ProjectStatement} from "@/components/ProjectStatement";
import {Follow} from "@/components/Follow";
import {Collections} from "@/components/Collections";
import {About} from "@/components/About";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <ProjectStatement />
        <Follow />
        <Collections />
        <div
  style={{
    background: "red",
    color: "white",
    padding: "80px",
    fontSize: "50px",
  }}
>
  ABOUT TEST
</div>

<About />
        <About />
      </main>
    </>
  );
}