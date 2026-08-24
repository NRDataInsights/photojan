import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type Note = {
  title: string;
  category?: string;
  publishedAt?: string;
  excerpt?: string;
  coverImage?: any;
  body?: any[];
};

async function getNote(slug: string): Promise<Note | null> {
  return client.fetch(
    `*[_type == "note" && slug.current == $slug][0]{
      title,
      category,
      publishedAt,
      excerpt,
      coverImage,
      body
    }`,
    { slug },
    {
      cache: "no-store",
    }
  );
}

function formatDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;

      const imageUrl = urlFor(value)
        .width(1600)
        .fit("max")
        .url();

      return (
        <figure className="article-inline-image">
          <img
            src={imageUrl}
            alt={value.alt || ""}
          />
        </figure>
      );
    },
  },
};

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const note = await getNote(slug);

  if (!note) {
    notFound();
  }

  const coverUrl = note.coverImage
    ? urlFor(note.coverImage)
        .width(1800)
        .fit("max")
        .url()
    : "";

  return (
    <main className="article-page">

      <section className="article-header">

        <a href="/journal" className="back-link">
          ← JOURNAL
        </a>

        <div className="article-meta">
          {note.category || "JOURNAL"}

          {note.publishedAt && (
            <>
              {" · "}
              {formatDate(note.publishedAt)}
            </>
          )}
        </div>

        <h1>{note.title}</h1>

        {note.excerpt && (
          <p className="article-excerpt">
            {note.excerpt}
          </p>
        )}

      </section>

      {coverUrl && (
        <section className="article-cover">
          <img
            src={coverUrl}
            alt={note.title}
          />
        </section>
      )}

      <article className="article-body">

        {note.body && note.body.length > 0 ? (
          <PortableText
            value={note.body}
            components={portableTextComponents}
          />
        ) : (
          <p>No article text yet.</p>
        )}

      </article>

      <footer className="article-footer">

        <a href="/journal">
          ← BACK TO JOURNAL
        </a>

        <span>photoJan</span>

      </footer>

      <style>{`
        .article-page {
          min-height: 100vh;
          background: #050505;
          color: #fff;
          font-family: Inter, system-ui, sans-serif;
        }

        .article-header {
          max-width: 1250px;
          margin: 0 auto;

          padding:
            clamp(80px, 10vw, 150px)
            clamp(24px, 6vw, 90px)
            clamp(60px, 8vw, 110px);
        }

        .back-link {
          display: inline-block;

          margin-bottom: 70px;

          color: rgba(255,255,255,.45);

          font-size: 11px;
          font-weight: 700;
          letter-spacing: .15em;

          text-decoration: none;
        }

        .back-link:hover {
          color: #fff;
        }

        .article-meta {
          margin-bottom: 28px;

          font-size: 11px;
          font-weight: 600;
          letter-spacing: .17em;

          text-transform: uppercase;

          color: rgba(255,255,255,.4);
        }

        .article-header h1 {
          max-width: 1100px;

          margin: 0;

          font-size:
            clamp(54px, 8vw, 125px);

          line-height: .92;

          font-weight: 900;

          letter-spacing: -.065em;
        }

        .article-excerpt {
          max-width: 820px;

          margin: 50px 0 0;

          font-size:
            clamp(20px, 2vw, 30px);

          line-height: 1.5;

          color: rgba(255,255,255,.68);
        }

        .article-cover {
          width: 100%;

          max-width: 1600px;

          margin: 0 auto;

          padding:
            0 clamp(24px, 4vw, 60px);
        }

        .article-cover img {
          display: block;

          width: 100%;
          height: auto;
        }

        .article-body {
          max-width: 820px;

          margin: 0 auto;

          padding:
            clamp(70px, 9vw, 130px)
            24px
            clamp(100px, 12vw, 170px);

          font-size:
            clamp(18px, 1.4vw, 21px);

          line-height: 1.85;

          color: rgba(255,255,255,.72);
        }

        .article-body p {
          margin: 0 0 32px;
        }

        .article-body h2 {
          margin: 70px 0 28px;

          font-size:
            clamp(32px, 4vw, 52px);

          line-height: 1.08;

          color: #fff;
        }

        .article-body h3 {
          margin: 55px 0 22px;

          font-size:
            clamp(26px, 3vw, 38px);

          color: #fff;
        }

        .article-body blockquote {
          margin: 55px 0;

          padding-left: 28px;

          border-left:
            1px solid rgba(255,255,255,.3);

          font-size:
            clamp(22px, 2.4vw, 31px);

          line-height: 1.45;

          color: rgba(255,255,255,.9);
        }

        .article-inline-image {
          margin: 60px 0;
        }

        .article-inline-image img {
          display: block;

          width: 100%;
          height: auto;
        }

        .article-footer {
          max-width: 1400px;

          margin: 0 auto;

          padding:
            35px
            clamp(24px, 5vw, 72px);

          display: flex;
          justify-content: space-between;

          border-top:
            1px solid rgba(255,255,255,.1);

          font-size: 11px;
          letter-spacing: .12em;

          color: rgba(255,255,255,.38);
        }

        .article-footer a {
          color: rgba(255,255,255,.55);

          text-decoration: none;
        }

        .article-footer a:hover {
          color: #fff;
        }

        @media (max-width: 600px) {

          .article-header {
            padding:
              70px 22px
              55px;
          }

          .back-link {
            margin-bottom: 50px;
          }

          .article-cover {
            padding: 0;
          }

          .article-body {
            padding:
              60px 22px
              90px;
          }

          .article-footer {
            flex-direction: column;

            gap: 12px;
          }
        }
      `}</style>

    </main>
  );
}