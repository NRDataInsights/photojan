"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Unable to sign in");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="login-page">

      <section className="login-box">

        <div className="brand">
          photoJan
        </div>

        <div className="kicker">
          CONTENT EDITOR
        </div>

        <h1>
          Welcome
          <br />
          back.
        </h1>

        <p className="intro">
          Sign in to manage photographs and journal entries.
        </p>

        <form onSubmit={handleSubmit}>

          <label>
            EMAIL

            <input
              type="email"
              name="email"
              autoComplete="email"
              required
            />
          </label>

          <label>
            PASSWORD

            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>

        </form>

      </section>

      <style>{`
        .login-page {
          min-height: 100vh;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #f3f3ef;
          color: #111;

          padding: 40px 24px;

          font-family:
            Inter,
            system-ui,
            sans-serif;
        }

        .login-box {
          width: 100%;
          max-width: 560px;
        }

        .brand {
          margin-bottom: 70px;

          font-size: 14px;
          font-weight: 700;

          letter-spacing: .14em;
        }

        .kicker {
          margin-bottom: 25px;

          font-size: 11px;
          font-weight: 700;

          letter-spacing: .2em;

          color: #777;
        }

        h1 {
          margin: 0;

          font-size:
            clamp(64px, 10vw, 105px);

          line-height: .84;

          letter-spacing: -.075em;

          font-weight: 900;
        }

        .intro {
          max-width: 430px;

          margin:
            42px 0 45px;

          font-size: 18px;
          line-height: 1.55;

          color: #666;
        }

        form {
          display: grid;
          gap: 24px;
        }

        label {
          display: grid;
          gap: 9px;

          font-size: 11px;
          font-weight: 700;

          letter-spacing: .13em;
        }

        input {
          width: 100%;

          box-sizing: border-box;

          padding: 15px 16px;

          border:
            1px solid #c8c8c2;

          background: #fff;

          color: #111;

          font: inherit;
          font-size: 16px;

          outline: none;
        }

        input:focus {
          border-color: #111;
        }

        button {
          justify-self: start;

          margin-top: 8px;

          padding:
            15px 25px;

          border: 0;

          background: #111;
          color: #fff;

          font: inherit;

          font-size: 12px;
          font-weight: 700;

          letter-spacing: .12em;

          cursor: pointer;
        }

        button:disabled {
          opacity: .5;
          cursor: wait;
        }

        .error {
          color: #9b1c1c;

          font-size: 14px;
          line-height: 1.4;
        }
      `}</style>

    </main>
  );
}