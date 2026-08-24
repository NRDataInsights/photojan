import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type JournalPost = {
  _id: string;
  title: string;
  slug?: {
    current?: string;
  };
  category?: string;
  publishedAt?: string;
  excerpt?: string;
  coverImage?: any;
};

async function getPosts(): Promise<JournalPost[]> {
  return client.fetch(
    `*[_type == "note"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      category,
      publishedAt,
      excerpt,
      coverImage
    }`,
    {},
    {
      cache: "no-store",
    }
  );
}

function formatDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(new Date(date))
    .toUpperCase();
}

export default async function JournalPage() {
  const posts = await getPosts();

  return (
    <main className="journal-page">
      <section className="journal-header">
        <div className="journal-kicker">
          PHOTOJAN / JOURNAL
        </div>

        <h1>JOURNAL</h1>

        <p>
          Photography, Dublin, observation
          <br />
          and the process of noticing.
        </p>
      </section>

      <section className="posts">

        {posts.length === 0 && (
          <div className="empty">
            No journal entries yet.
          </div>
        )}

        {posts.map((post, index) => {
          const imageUrl = post.coverImage
            ? urlFor(post.coverImage)
                .width(1400)
                .height(900)
                .fit("crop")
                .url()
            : null;

          return (
            <article
              className="post"
              key={post._id}
            >
              <div className="post-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="post-image">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={
                      post.coverImage?.alt ||
                      post.title
                    }
                  />
                ) : (
                  <div className="image-placeholder">
                    NO IMAGE
                  </div>
                )}
              </div>

              <div className="post-content">

                <div className="post-meta">
                  {post.category || "JOURNAL"}

                  {post.publishedAt &&
                    ` · ${formatDate(
                      post.publishedAt
                    )}`}
                </div>

                <h2>{post.title}</h2>

                {post.excerpt && (
                  <p>{post.excerpt}</p>
                )}

                {post.slug?.current && (
                  <Link
                    href={`/journal/${post.slug.current}`}
                    className="read-article"
                  >
                    <span>
                      READ ARTICLE
                    </span>

                    <span>→</span>
                  </Link>
                )}

              </div>
            </article>
          );
        })}

      </section>

      <footer className="journal-footer">
        <span>photoJan</span>
        <span>
          Dublin · Photography · Journal
        </span>
      </footer>

      <style>{`
        .journal-page {
          min-height: 100vh;
          background: #050505;
          color: #fff;
          font-family: Inter, system-ui, sans-serif;
        }

        .journal-header {
          min-height: 62vh;

          display: flex;
          flex-direction: column;
          justify-content: flex-end;

          padding:
            80px
            clamp(24px, 6vw, 90px);

          border-bottom:
            1px solid rgba(255,255,255,.12);
        }

        .journal-kicker {
          margin-bottom: 26px;

          font-size: 12px;
          font-weight: 600;

          letter-spacing: .22em;

          color:
            rgba(255,255,255,.4);
        }

        .journal-header h1 {
          margin: 0;

          font-size:
            clamp(90px, 15vw, 230px);

          line-height: .75;

          letter-spacing: -.08em;

          font-weight: 900;
        }

        .journal-header p {
          margin: 50px 0 0;

          max-width: 550px;

          font-size:
            clamp(18px, 1.6vw, 25px);

          line-height: 1.5;

          color:
            rgba(255,255,255,.65);
        }

        .posts {
          max-width: 1500px;

          margin: 0 auto;

          padding:
            40px
            clamp(24px, 5vw, 72px)
            120px;
        }

        .post {
          display: grid;

          grid-template-columns:
            60px
            minmax(300px, 1.2fr)
            minmax(300px, .8fr);

          gap:
            clamp(25px, 4vw, 65px);

          align-items: center;

          padding: 50px 0;

          border-bottom:
            1px solid rgba(255,255,255,.12);
        }

        .post-number {
          align-self: start;

          padding-top: 5px;

          font-size: 12px;

          letter-spacing: .12em;

          color:
            rgba(255,255,255,.3);
        }

        .post-image {
          aspect-ratio: 16 / 10;

          overflow: hidden;

          background: #111;
        }

        .post-image img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;

          transition:
            transform .7s ease;
        }

        .post:hover .post-image img {
          transform: scale(1.025);
        }

        .image-placeholder {
          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #111;

          font-size: 11px;
          letter-spacing: .15em;

          color:
            rgba(255,255,255,.2);
        }

        .post-content {
          max-width: 520px;
        }

        .post-meta {
          margin-bottom: 20px;

          font-size: 11px;
          font-weight: 600;

          letter-spacing: .17em;

          text-transform: uppercase;

          color:
            rgba(255,255,255,.38);
        }

        .post h2 {
          margin: 0 0 22px;

          font-size:
            clamp(30px, 3.2vw, 52px);

          line-height: 1.02;

          letter-spacing: -.045em;
        }

        .post p {
          margin: 0 0 28px;

          font-size: 16px;

          line-height: 1.65;

          color:
            rgba(255,255,255,.58);
        }

        .read-article {
          display: inline-flex;

          align-items: center;

          gap: 28px;

          padding: 14px 0;

          border-bottom:
            1px solid rgba(255,255,255,.3);

          color: #fff;

          text-decoration: none;

          font-size: 12px;

          font-weight: 700;

          letter-spacing: .12em;
        }

        .read-article span:last-child {
          transition:
            transform .2s ease;
        }

        .read-article:hover span:last-child {
          transform:
            translateX(7px);
        }

        .empty {
          padding: 100px 0;

          color:
            rgba(255,255,255,.5);
        }

        .journal-footer {
          display: flex;

          justify-content: space-between;

          padding:
            35px
            clamp(24px, 5vw, 72px);

          border-top:
            1px solid rgba(255,255,255,.1);

          font-size: 12px;

          letter-spacing: .08em;

          color:
            rgba(255,255,255,.38);
        }

        @media (max-width: 900px) {
          .post {
            grid-template-columns:
              40px 1fr;
          }

          .post-content {
            grid-column: 2;
          }
        }

        @media (max-width: 600px) {
          .journal-header {
            min-height: 55vh;

            padding:
              60px 22px;
          }

          .journal-header h1 {
            font-size:
              clamp(78px, 25vw, 130px);
          }

          .posts {
            padding:
              20px 22px 80px;
          }

          .post {
            grid-template-columns: 1fr;

            gap: 20px;
          }

          .post-number,
          .post-content {
            grid-column: auto;
          }

          .journal-footer {
            flex-direction: column;

            gap: 12px;
          }
        }
      `}</style>
    </main>
  );
}