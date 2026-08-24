"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="editor">
      <header>
        <div>
          <div className="brand">photoJan</div>
          <div className="label">CONTENT EDITOR</div>
        </div>

        <button onClick={logout}>
          SIGN OUT
        </button>
      </header>

      <section className="hero">
        <h1>Editor</h1>

        <p>
          Manage photographs and journal entries.
        </p>
      </section>

      <section className="modules">
        <Link
          href="/admin/photos"
          className="module"
        >
          <span>01</span>

          <h2>Photographs</h2>

          <p>
            Add, edit and organise photographs.
          </p>

          <div className="module-arrow">
            OPEN →
          </div>
        </Link>

        <div className="module">
          <span>02</span>

          <h2>Journal</h2>

          <p>
            Create and edit journal articles.
          </p>
        </div>
      </section>

      <style>{`
        .editor {
          min-height: 100vh;
          background: #f3f3ef;
          color: #111;

          padding:
            35px
            clamp(24px, 6vw, 90px)
            100px;

          font-family:
            Inter,
            system-ui,
            sans-serif;
        }

        header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          padding-bottom: 60px;

          border-bottom:
            1px solid #d0d0ca;
        }

        .brand {
          margin-bottom: 8px;

          font-size: 14px;
          font-weight: 700;

          letter-spacing: 0.14em;
        }

        .label {
          font-size: 10px;
          font-weight: 700;

          letter-spacing: 0.18em;

          color: #888;
        }

        header button {
          border: 0;
          background: transparent;

          font-size: 11px;
          font-weight: 700;

          letter-spacing: 0.14em;

          cursor: pointer;
        }

        .hero {
          padding:
            clamp(80px, 10vw, 150px)
            0;
        }

        .hero h1 {
          margin: 0;

          font-size:
            clamp(90px, 16vw, 220px);

          line-height: 0.75;
          letter-spacing: -0.08em;

          font-weight: 900;
        }

        .hero p {
          margin: 55px 0 0;

          font-size:
            clamp(19px, 2vw, 28px);

          color: #666;
        }

        .modules {
          display: grid;
          grid-template-columns: 1fr 1fr;

          border-top:
            1px solid #d0d0ca;
        }

        .module {
          padding: 45px 0;

          border-bottom:
            1px solid #d0d0ca;

          color: inherit;
          text-decoration: none;

          cursor: pointer;

          transition:
            opacity 0.2s ease;
        }

        .module:hover {
          opacity: 0.55;
        }

        .module:first-child {
          padding-right: 50px;

          border-right:
            1px solid #d0d0ca;
        }

        .module:last-child {
          padding-left: 50px;
        }

        .module > span {
          font-size: 11px;
          color: #999;
        }

        .module h2 {
          margin: 35px 0 18px;

          font-size:
            clamp(34px, 4vw, 60px);

          letter-spacing: -0.05em;
        }

        .module p {
          max-width: 300px;

          font-size: 16px;
          line-height: 1.6;

          color: #666;
        }

        .module-arrow {
          margin-top: 35px;

          font-size: 10px;
          font-weight: 700;

          letter-spacing: 0.14em;
        }

        @media (max-width: 700px) {
          .modules {
            grid-template-columns: 1fr;
          }

          .module:first-child {
            padding-right: 0;
            border-right: 0;
          }

          .module:last-child {
            padding-left: 0;
          }
        }
      `}</style>
    </main>
  );
}