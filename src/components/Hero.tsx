export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <div className="hero-arrow" aria-hidden="true" />

        <h1>
          URBAN
          <br />
          DUBLIN
          <br />
          LANDSCAPES
        </h1>

        <p className="hero-lead">
          I photograph Dublin as it is built and lived: streets, facades,
          junctions, and quiet in-between spaces.
        </p>

        <p className="hero-small">
          Urban landscape shaped by architecture, weather, and rhythm.
        </p>

        <span className="hero-sign">photoJan</span>
      </div>

      <div className="hero-image">
        <img
          src="/images/Land_01.jpg"
          alt="Dublin urban landscape"
        />
      </div>

      <style>{`
        .hero {
          display: grid;
          grid-template-columns: minmax(470px, 36vw) 1fr;
          min-height: calc(100vh - 72px);
          background: #000;
          overflow: hidden;
        }

        .hero-copy {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          padding: 48px;
          background: #000;
          z-index: 2;
        }

        .hero-arrow {
          width: 34px;
          height: 34px;
          margin-bottom: 46px;
          border-left: 3px solid #fff;
          border-bottom: 3px solid #fff;
          transform: rotate(-45deg);
        }

        .hero h1 {
          margin: 0 0 34px;
          font-size: clamp(44px, 4.3vw, 68px);
          line-height: 0.94;
          letter-spacing: -0.055em;
          font-weight: 900;
          color: #fff;
          white-space: nowrap;
        }

        .hero-lead {
          max-width: 35ch;
          margin: 0;
          font-size: 17px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.88);
        }

        .hero-small {
          max-width: 35ch;
          margin: 34px 0 0;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.56);
        }

        .hero-sign {
          position: absolute;
          left: 48px;
          bottom: 28px;
          font-size: 13px;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.42);
        }

        .hero-image {
          position: relative;
          min-width: 0;
          min-height: calc(100vh - 72px);
          overflow: hidden;
          background: #111;
        }

        .hero-image img {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 1050px) {
          .hero {
            grid-template-columns: minmax(410px, 42vw) 1fr;
          }

          .hero-copy {
            padding: 40px;
          }

          .hero h1 {
            font-size: clamp(42px, 5vw, 60px);
          }

          .hero-sign {
            left: 40px;
          }
        }

        @media (max-width: 820px) {
          .hero {
            display: flex;
            flex-direction: column;
            min-height: auto;
          }

          .hero-copy {
            min-height: 620px;
            padding: 48px 28px 70px;
          }

          .hero h1 {
            font-size: clamp(44px, 12vw, 68px);
            white-space: normal;
          }

          .hero-image {
            min-height: 65vh;
            height: 65vh;
          }

          .hero-sign {
            left: 28px;
            bottom: 24px;
          }
        }

        @media (max-width: 520px) {
          .hero-copy {
            min-height: 560px;
            padding: 38px 22px 64px;
          }

          .hero-arrow {
            width: 28px;
            height: 28px;
            margin-bottom: 38px;
          }

          .hero h1 {
            font-size: clamp(40px, 13vw, 58px);
            margin-bottom: 28px;
          }

          .hero-lead {
            font-size: 16px;
          }

          .hero-small {
            margin-top: 26px;
            font-size: 13px;
          }

          .hero-sign {
            left: 22px;
          }
        }
      `}</style>
    </section>
  );
}