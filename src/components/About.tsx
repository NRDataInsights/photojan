export function About() {
  return (
    <section
      id="about"
      style={{
        width: "100%",
        background: "#080808",
        color: "#ffffff",
        padding: "100px 6vw",
        boxSizing: "border-box",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.42)",
            marginBottom: "42px",
          }}
        >
          ABOUT
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(300px, 0.8fr) minmax(0, 1.2fr)",
            gap: "clamp(50px, 8vw, 120px)",
            alignItems: "start",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(72px, 9vw, 140px)",
                lineHeight: 0.82,
                fontWeight: 900,
                letterSpacing: "-0.075em",
              }}
            >
              IAN
              <br />
              DAVIS
            </h2>
          </div>

          <div
            style={{
              maxWidth: "760px",
            }}
          >
            <p
              style={{
                margin: "0 0 28px",
                fontSize: "clamp(24px, 2.4vw, 36px)",
                lineHeight: 1.28,
                letterSpacing: "-0.035em",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              Ian Davis is a Dublin-based photographer interested in
              architecture, street life, weather, movement and the quiet
              details that often disappear into the background of everyday life.
            </p>

            <p
              style={{
                margin: "0 0 38px",
                maxWidth: "650px",
                fontSize: "18px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.62)",
              }}
            >
              His work moves between observation and abstraction, looking at
              how ordinary streets, reflections, surfaces and human traces can
              become visually unexpected through colour, framing and chance.
            </p>

            <a
              href="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "26px",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.32)",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textDecoration: "none",
              }}
            >
              READ MORE
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}