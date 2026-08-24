const mediaBase =
  process.env.NEXT_PUBLIC_WP_MEDIA_BASE ||
  "http://photojan.local/wp-content/uploads/2026/02/";

export function ProjectStatement() {
  return (
    <section className="project" id="project">
      <div
        className="project-bg"
        style={{
          backgroundImage: `url(${mediaBase}Rain-and-reflections_03-scaled.jpg)`,
        }}
      />

      <div className="project-overlay" />

      <div className="project-inner">
        <div className="eyebrow">THE PROJECT</div>

        <div className="project-subtitle">
          Experiments with perception, colour, reflection and chance.
        </div>

        <div className="project-columns">
          <div>
            <p>
              I've always been fond of the abstract world. Its cousin, the
              mundane, has its merits at times, but doesn't present infinite
              ways of perception and rendering.
            </p>

            <p>
              This of course can sound contradictory. The work of Louis
              Daguerre (1787–1851) or Saul Leiter (1923–2013) regularly
              recorded the mundane while the outcome of their work, by
              accident or design, presented the dreamy world of the abstract.
            </p>

            <p>
              My earliest unwitting experiments with abstracts was placing
              coloured sweet wrappers over each eye while watching black and
              white TV back in the seventies. The magic of colour TV for me
              was born.
            </p>
          </div>

          <div>
            <p>
              My first ever camera was a Kodak 36 Instamatic and placing the
              same sweet wrappers over the lens produced questionable results.
              Exhaling onto the lens produced my earliest, long lost abstracts.
            </p>

            <p>
              I love the "no rules" pure experimentation aspects of abstract
              photography and the surprising results that can be accomplished.
            </p>

            <p>
              Every viewing of these images presents some new details or
              wondrous reinterpretations.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .project {
          position: relative;
          overflow: hidden;
          background: #050505;
          padding:
            clamp(70px, 7vw, 100px)
            clamp(24px, 6vw, 90px)
            clamp(55px, 6vw, 80px);
        }

        .project-bg {
          position: absolute;
          inset: -3%;
          background-size: cover;
          background-position: center;
          opacity: .03;
          filter: blur(12px) grayscale(100%);
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(5,5,5,.94);
        }

        .project-inner {
          position: relative;
          z-index: 2;
          max-width: 1240px;
          margin: 0 auto;
        }

        .eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .22em;
          color: rgba(255,255,255,.38);
        }

        .project-subtitle {
          max-width: 820px;
          margin: 30px 0 52px;

          font-size: clamp(28px, 3vw, 44px);
          line-height: 1.18;

          letter-spacing: -.045em;
          font-weight: 700;

          color: rgba(255,255,255,.94);
        }

        .project-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;

          gap: clamp(42px, 6vw, 82px);

          font-size: clamp(17px, 1.25vw, 21px);
          line-height: 1.78;

          color: rgba(255,255,255,.68);
        }

        .project-columns p {
          margin: 0 0 26px;
        }

        .project-columns p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 900px) {
          .project-columns {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .project-subtitle {
            margin-bottom: 38px;
          }

          .project {
            padding-bottom: 56px;
          }
        }

        @media (max-width: 600px) {
          .project {
            padding:
              56px 22px
              48px;
          }

          .project-subtitle {
            font-size: 28px;
          }

          .project-columns {
            font-size: 17px;
            line-height: 1.7;
          }
        }
      `}</style>
    </section>
  );
}