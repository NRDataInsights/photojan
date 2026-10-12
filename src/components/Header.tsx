const nav = [
  ["HOME", "/"],
  ["PROJECT", "/#project"],
  //["FOLLOW", "/#follow"],
  ["GALLERIES", "/#collections"],
  ["JOURNAL", "/journal"],
  ["ABOUT", "/about"],
  //["CONTACT", "/#contact"],
];

export function Header() {
  return (
    <header className="pj-header">
      <div className="pj-header-inner">
        <a className="pj-brand" href="/">
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
          flex: 0 0 auto;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: lowercase;
          color: rgba(255,255,255,.92);
          text-decoration: none;
          white-space: nowrap;
          transition: color .2s ease;
        }

        .pj-brand:hover {
          color: #fff;
        }

        .pj-nav {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: clamp(16px, 1.8vw, 28px);
        }

        .pj-nav a {
          position: relative;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .12em;
          color: rgba(255,255,255,.60);
          text-decoration: none;
          white-space: nowrap;
          transition: color .2s ease;
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

        @media (max-width: 1050px) {
          .pj-header-inner {
            width: min(100% - 32px, 1400px);
            height: auto;
            padding: 18px 0;
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
          }

          .pj-nav {
            width: 100%;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 14px 18px;
          }
        }

        @media (max-width: 600px) {
          .pj-header-inner {
            width: calc(100% - 28px);
            padding: 16px 0;
          }

          .pj-brand {
            font-size: 14px;
          }

          .pj-nav {
            gap: 12px 15px;
          }

          .pj-nav a {
            font-size: 10px;
            letter-spacing: .1em;
          }
        }
      `}</style>
    </header>
  );
}