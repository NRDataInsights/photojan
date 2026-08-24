import { client } from "@/sanity/lib/client";

type SiteSettings = {
  siteTitle?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  location?: string;
  contactIntro?: string;
};

async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      siteTitle,
      email,
      instagram,
      facebook,
      location,
      contactIntro
    }`,
    {},
    {
      cache: "no-store",
    }
  );
}

export async function Contact() {
  const settings = await getSiteSettings();

  const siteTitle = settings?.siteTitle || "photoJan";
  const email = settings?.email || "";
  const instagram = settings?.instagram || "";
  const facebook = settings?.facebook || "";
  const location = settings?.location || "Dublin, Ireland";

  const contactIntro =
    settings?.contactIntro ||
    "For commissions, collaborations, editorial work or print enquiries.";

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">

        <div className="contact-kicker">
          CONTACT
        </div>

        <div className="contact-grid">

          <div className="contact-title">
            <h2>
              LET&apos;S
              <br />
              TALK.
            </h2>
          </div>

          <div className="contact-content">

            <p className="contact-lead">
              {contactIntro}
            </p>

            <div className="contact-links">

              {email && (
                <a href={`mailto:${email}`}>
                  <div className="contact-link-text">
                    <span className="contact-link-label">
                      EMAIL
                    </span>

                    <span className="contact-link-value">
                      {email}
                    </span>
                  </div>

                  <span
                    className="contact-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              )}

              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="contact-link-text">
                    <span className="contact-link-label">
                      INSTAGRAM
                    </span>

                    <span className="contact-link-value">
                      View profile
                    </span>
                  </div>

                  <span
                    className="contact-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              )}

              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="contact-link-text">
                    <span className="contact-link-label">
                      FACEBOOK
                    </span>

                    <span className="contact-link-value">
                      View profile
                    </span>
                  </div>

                  <span
                    className="contact-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              )}

            </div>

          </div>

        </div>

        <footer className="contact-footer">
          <span>
            © {new Date().getFullYear()} {siteTitle}
          </span>

          <span>
            {location}
          </span>
        </footer>

      </div>

      <style>{`
        .contact {
          width: 100%;
          background: #050505;
          color: #fff;

          padding:
            clamp(90px, 10vw, 160px)
            clamp(24px, 6vw, 90px)
            40px;

          border-top:
            1px solid rgba(255,255,255,.08);
        }

        .contact-inner {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .contact-kicker {
          margin-bottom: 42px;

          font-size: 12px;
          font-weight: 600;
          letter-spacing: .22em;

          color:
            rgba(255,255,255,.4);
        }

        .contact-grid {
          display: grid;

          grid-template-columns:
            minmax(300px, .8fr)
            minmax(0, 1.2fr);

          gap:
            clamp(50px, 8vw, 120px);

          align-items: start;
        }

        .contact-title h2 {
          margin: 0;

          font-size:
            clamp(72px, 9vw, 140px);

          line-height: .82;

          font-weight: 900;

          letter-spacing:
            -.075em;

          color: #fff;
        }

        .contact-content {
          width: 100%;
          max-width: 760px;
        }

        .contact-lead {
          margin:
            0 0 60px;

          max-width: 650px;

          font-size:
            clamp(25px, 2.4vw, 38px);

          line-height: 1.3;

          letter-spacing:
            -.035em;

          color:
            rgba(255,255,255,.9);
        }

        .contact-links {
          width: 100%;

          border-top:
            1px solid rgba(255,255,255,.15);
        }

        .contact-links a {
          display: flex;

          align-items: center;
          justify-content: space-between;

          width: 100%;

          padding:
            22px 0;

          border-bottom:
            1px solid rgba(255,255,255,.15);

          color: #fff;

          text-decoration: none;

          transition:
            padding-left .2s ease;
        }

        .contact-links a:hover {
          padding-left: 8px;
        }

        .contact-link-text {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .contact-link-label {
          font-size: 11px;
          font-weight: 700;

          letter-spacing: .16em;

          color:
            rgba(255,255,255,.4);
        }

        .contact-link-value {
          font-size:
            clamp(16px, 1.4vw, 21px);

          font-weight: 400;

          letter-spacing: 0;

          color:
            rgba(255,255,255,.88);
        }

        .contact-arrow {
          font-size: 20px;

          color:
            rgba(255,255,255,.65);
        }

        .contact-footer {
          display: flex;

          align-items: center;
          justify-content: space-between;

          margin-top:
            clamp(100px, 14vw, 200px);

          padding-top: 24px;

          border-top:
            1px solid rgba(255,255,255,.1);

          font-size: 11px;

          letter-spacing: .12em;

          text-transform: uppercase;

          color:
            rgba(255,255,255,.35);
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .contact-content {
            max-width: none;
          }
        }

        @media (max-width: 600px) {
          .contact {
            padding:
              70px 22px 30px;
          }

          .contact-title h2 {
            font-size:
              clamp(64px, 22vw, 96px);
          }

          .contact-lead {
            font-size: 24px;
          }

          .contact-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}