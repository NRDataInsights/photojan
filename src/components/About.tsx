export function About() {
  return (
    <section className="about section" id="about">
      <div className="container about-inner">
        <span className="eyebrow">About photoJan</span>
        <h2>The city remains the main subject.</h2>
        <p className="about-lead">
          photoJan observes Dublin through architecture, weather, street life and ordinary human traces.
        </p>
        <p>
          The photographer is present, but not as the hero of the project. He notices, records and moves on.
          The city, its weather, its memory and its small unfinished scenes remain at the centre.
        </p>
      </div>
      <style>{`
        .about{background:#080808}
        .about-inner{max-width:1000px}
        .about h2{font-size:clamp(42px,6vw,82px);line-height:.98;letter-spacing:-.06em;margin:20px 0 34px}
        .about-lead{font-size:clamp(22px,2.4vw,32px);line-height:1.35;color:rgba(255,255,255,.9)}
        .about p:not(.about-lead){font-size:18px;line-height:1.8;color:rgba(255,255,255,.66);max-width:760px}
      `}</style>
    </section>
  );
}
