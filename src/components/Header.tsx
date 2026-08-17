const nav = [
  ["HOME", "#home"],
  ["PROJECT", "#project"],
  ["COLLECTIONS", "#collections"],
  ["NOTES", "#notes"],
  ["ARCHIVE", "#archive"],
  ["ABOUT", "#about"],
  ["CONTACT", "#contact"],
];

export function Header() {
  return (
    <header className="pj-header">
      <div className="pj-header-inner">

        <a className="pj-brand" href="#home">
          photojan
        </a>

        <nav className="pj-nav" aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

      </div>

      <style>{`
        .pj-header {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          background: rgba(5, 5, 5, 0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .pj-header-inner {
          width: min(1400px, calc(100% - 48px));
          height: 74px;
          margin: 0 auto;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 32px;
        }

        .pj-brand {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: lowercase;
          color: rgba(255,255,255,.92);
          white-space: nowrap;
        }

        .pj-nav {
          display: flex;
          align-items: center;
          gap: clamp(18px, 2vw, 30px);
        }

        .pj-nav a {
          position: relative;

          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;

          color: rgba(255,255,255,.60);

          transition:
            color .2s ease,
            opacity .2s ease;
        }

        .pj-nav a:hover {
          color: #fff;
        }

        .pj-nav a::after {
          content: "";
          position: absolute;

          left: 0;
          right: 100%;
          bottom: -8px;

          height: 1px;
          background: rgba(255,255,255,.75);

          transition: right .22s ease;
        }

        .pj-nav a:hover::after {
          right: 0;
        }

        @media (max-width: 980px) {
          .pj-header-inner {
            width: min(100% - 32px, 1400px);
            height: auto;
            padding: 18px 0;

            align-items: flex-start;
            flex-direction: column;
          }

          .pj-nav {
            width: 100%;
            flex-wrap: wrap;
            gap: 14px 18px;
          }
        }

        @media (max-width: 600px) {
          .pj-brand {
            font-size: 14px;
          }

          .pj-nav a {
            font-size: 11px;
          }
        }
      `}</style>
    </header>
  );
}