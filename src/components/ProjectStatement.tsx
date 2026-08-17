const mediaBase = process.env.NEXT_PUBLIC_WP_MEDIA_BASE || "http://photojan.local/wp-content/uploads/2026/02/";

export function ProjectStatement() {
  return (
    <section className="project" id="project">
      <div className="project-bg" style={{backgroundImage:`url(${mediaBase}Rain-and-reflections_03-scaled.jpg)`}} />
      <div className="project-overlay" />
      <div className="project-inner">
        <div className="eyebrow">THE PROJECT</div>
        <div className="project-subtitle">Experiments with perception, colour, reflection and chance.</div>

        <div className="project-columns">
          <div>
            <p>I've always been fond of the abstract world. Its cousin, the mundane, has its merits at times, but doesn't present infinite ways of perception and rendering.</p>
            <p>This of course can sound contradictory. The work of Louis Daguerre (1787–1851) or Saul Leiter (1923–2013) regularly recorded the mundane while the outcome of their work, by accident or design, presented the dreamy world of the abstract.</p>
            <p>My earliest unwitting experiments with abstracts was placing coloured sweet wrappers over each eye while watching black and white TV back in the seventies. The magic of colour TV for me was born.</p>
          </div>
          <div>
            <p>My first ever camera was a Kodak 36 Instamatic and placing the same sweet wrappers over the lens produced questionable results. Exhaling onto the lens produced my earliest, long lost abstracts.</p>
            <p>I love the "no rules" pure experimentation aspects of abstract photography and the surprising results that can be accomplished.</p>
            <p>Every viewing of these images presents some new details or wondrous reinterpretations.</p>
          </div>
        </div>

        <div className="project-sign">photoJan · Abstract Series</div>
      </div>

      <style>{`
        .project{position:relative;background:#050505;padding:clamp(70px,8vw,115px) clamp(24px,6vw,90px);overflow:hidden}
        .project-bg{position:absolute;inset:-3%;background-size:cover;background-position:center;opacity:.035;filter:blur(12px) grayscale(100%)}
        .project-overlay{position:absolute;inset:0;background:rgba(5,5,5,.93)}
        .project-inner{position:relative;z-index:2;max-width:1240px;margin:auto}
        .project-subtitle{max-width:820px;font-size:clamp(28px,3vw,46px);line-height:1.18;letter-spacing:-.045em;font-weight:700;color:rgba(255,255,255,.94);margin:34px 0 70px}
        .project-columns{display:grid;grid-template-columns:1fr 1fr;gap:clamp(48px,7vw,90px);font-size:clamp(18px,1.35vw,22px);line-height:1.85;color:rgba(255,255,255,.68)}
        .project-columns p{margin:0 0 30px}
        .project-sign{margin-top:60px;padding-top:24px;border-top:1px solid rgba(255,255,255,.12);font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.42)}
        @media(max-width:900px){.project-columns{grid-template-columns:1fr;gap:0}.project-subtitle{margin-bottom:42px}}
      `}</style>
    </section>
  );
}
