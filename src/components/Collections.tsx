"use client";

import { useEffect, useState } from "react";

type Collection = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  files: string[];
};

/* =========================
   REAL FILES
========================= */

const cityscapeFiles = [
  "/images/cityscape/Cityscape_21.jpg",
  "/images/cityscape/Cityscape_22.jpg",
  "/images/cityscape/Cityscape_23.jpg",
  "/images/cityscape/Cityscape_24.jpg",
  "/images/cityscape/Cityscape_25.jpg",
  "/images/cityscape/Cityscape_26.jpg",
  "/images/cityscape/Cityscape_27.jpg",
];

const architectureFiles = Array.from(
  { length: 21 },
  (_, i) =>
    `/images/architecture/Cityscape_${String(i + 1).padStart(2, "0")}.jpg`
);

const transportFiles = [
  "/images/transport/Transport_15.jpg",
  "/images/transport/Transport_16.jpg",
  "/images/transport/Transport_17.jpg",
  "/images/transport/Transport_18.jpg",
];

const urbanDetailsFiles = [
  "/images/urban-details/Urban detais_01.jpg",
  "/images/urban-details/Urban detais_02.jpg",
  "/images/urban-details/Urban details_04.jpg",
];

const rainFiles = [
  "/images/rain-reflections/Rain and reflections_01.jpg",
  "/images/rain-reflections/Rain and reflections_02.jpg",
  "/images/rain-reflections/Rain and reflections_03.jpg",
];

const constructionFiles = [
  "/images/construction/Construction_01.jpg",
  "/images/construction/Construction_02.jpg",
  "/images/construction/Construction_03.jpg",
];

/* =========================
   COLLECTION DATA
========================= */

const collections: Collection[] = [
  {
    slug: "cityscape",
    title: "Cityscape",
    description:
      "Street atmosphere, architecture, weather, and rhythm.",
    cover: "/images/cityscape/Cityscape_25.jpg",
    files: cityscapeFiles,
  },

  {
    slug: "architecture",
    title: "Architecture",
    description:
      "Structure, form, facades, geometry.",
    cover: "/images/architecture/Cityscape_01.jpg",
    files: architectureFiles,
  },

  {
    slug: "transport",
    title: "Transport",
    description:
      "Vehicles, motion, colour, and the city in transit.",
    cover: "/images/transport/Transport_16.jpg",
    files: transportFiles,
  },

  {
    slug: "urban-details",
    title: "Urban details",
    description:
      "Textures, signage, doors, corners — small scenes people pass.",
    cover: "/images/urban-details/Urban detais_01.jpg",
    files: urbanDetailsFiles,
  },

  {
    slug: "rain-reflections",
    title: "Rain and reflections",
    description:
      "Wet streets, blurred lights, reflections and mood.",
    cover:
      "/images/rain-reflections/Rain and reflections_02.jpg",
    files: rainFiles,
  },

  {
    slug: "construction",
    title: "Construction",
    description:
      "Worksites, cranes, steel and change.",
    cover:
      "/images/construction/Construction_03.jpg",
    files: constructionFiles,
  },
];

/* =========================
   COMPONENT
========================= */

export function Collections() {
  const [activeCollection, setActiveCollection] =
    useState<Collection | null>(null);

  const [shown, setShown] = useState(6);

  const [lightboxIndex, setLightboxIndex] =
    useState<number | null>(null);

  function openCollection(collection: Collection) {
    setActiveCollection(collection);
    setShown(6);
    setLightboxIndex(null);
  }

  function closeCollection() {
    setActiveCollection(null);
    setLightboxIndex(null);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function nextImage() {
    if (!activeCollection || lightboxIndex === null) return;

    setLightboxIndex(
      (lightboxIndex + 1) %
        activeCollection.files.length
    );
  }

  function previousImage() {
    if (!activeCollection || lightboxIndex === null) return;

    setLightboxIndex(
      (
        lightboxIndex -
        1 +
        activeCollection.files.length
      ) % activeCollection.files.length
    );
  }

  /* KEYBOARD */

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (lightboxIndex !== null) {
        if (event.key === "Escape") {
          closeLightbox();
        }

        if (event.key === "ArrowRight") {
          nextImage();
        }

        if (event.key === "ArrowLeft") {
          previousImage();
        }

        return;
      }

      if (
        activeCollection &&
        event.key === "Escape"
      ) {
        closeCollection();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  });

  /* LOCK PAGE SCROLL */

  useEffect(() => {
    if (
      activeCollection ||
      lightboxIndex !== null
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCollection, lightboxIndex]);

  return (
    <section
      className="pj-collections"
      id="collections"
    >
      <div className="pj-collections-inner">

        <div className="pj-section-kicker">
          COLLECTIONS
        </div>

        <h2 className="pj-section-title">
          Galleries
        </h2>

        {/* CATEGORY CARDS */}

        <div className="pj-collection-grid">

          {collections.map((collection) => (
            <button
              key={collection.slug}
              className="pj-collection-card"
              type="button"
              onClick={() =>
                openCollection(collection)
              }
            >

              <div className="pj-collection-image">
                <img
                  src={collection.cover}
                  alt={collection.title}
                />
              </div>

              <div className="pj-collection-content">

                <h3>
                  {collection.title}
                </h3>

                <p>
                  {collection.description}
                </p>

                <span>
                  {collection.files.length} photos
                </span>

              </div>

            </button>
          ))}

        </div>
      </div>

      {/* =========================
          GALLERY
      ========================= */}

      {activeCollection && (
        <div
          className="pj-gallery-overlay"
          onClick={closeCollection}
        >

          <div
            className="pj-gallery"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="pj-gallery-header">

              <div>
                <div className="pj-gallery-kicker">
                  COLLECTION
                </div>

                <h3>
                  {activeCollection.title}
                </h3>

                <span>
                  {activeCollection.files.length}
                  {" "}photographs
                </span>
              </div>

              <button
                type="button"
                className="pj-close"
                onClick={closeCollection}
                aria-label="Close gallery"
              >
                ×
              </button>

            </div>

            <div className="pj-photo-grid">

              {activeCollection.files
                .slice(0, shown)
                .map((file, index) => (

                  <button
                    key={`${file}-${index}`}
                    type="button"
                    className="pj-photo"
                    onClick={() =>
                      setLightboxIndex(index)
                    }
                  >

                    <img
                      src={file}
                      alt={`${activeCollection.title} ${index + 1}`}
                      loading="lazy"
                    />

                  </button>

                ))}

            </div>

            {shown <
              activeCollection.files.length && (

              <div className="pj-show-more-wrap">

                <button
                  type="button"
                  className="pj-show-more"
                  onClick={() =>
                    setShown((current) =>
                      Math.min(
                        current + 6,
                        activeCollection.files.length
                      )
                    )
                  }
                >
                  Show more
                </button>

              </div>

            )}

          </div>
        </div>
      )}

      {/* =========================
          LIGHTBOX
      ========================= */}

      {activeCollection &&
        lightboxIndex !== null && (

        <div
          className="pj-lightbox"
          onClick={closeLightbox}
        >

          <div
            className="pj-lightbox-inner"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={
                activeCollection.files[
                  lightboxIndex
                ]
              }
              alt={`${activeCollection.title} ${lightboxIndex + 1}`}
            />

            <button
              className="pj-lightbox-close"
              type="button"
              onClick={closeLightbox}
              aria-label="Close image"
            >
              ×
            </button>

            <button
              className="pj-lightbox-arrow pj-prev"
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              className="pj-lightbox-arrow pj-next"
              type="button"
              onClick={nextImage}
              aria-label="Next image"
            >
              ›
            </button>

            <div className="pj-lightbox-count">
              {lightboxIndex + 1}
              {" / "}
              {activeCollection.files.length}
            </div>

          </div>
        </div>
      )}

      <style>{`

        /* ======================
           SECTION
        ====================== */

        .pj-collections {
          width: 100%;

          background: #080808;
          color: #fff;

          padding:
            clamp(70px, 8vw, 120px)
            clamp(24px, 5vw, 70px);
        }

        .pj-collections-inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .pj-section-kicker {
          margin-bottom: 16px;

          font-size: 12px;
          font-weight: 600;

          letter-spacing: .22em;

          color:
            rgba(255,255,255,.42);
        }

        .pj-section-title {
          margin: 0 0 46px;

          font-size:
            clamp(42px, 5vw, 68px);

          line-height: 1;

          font-weight: 850;

          letter-spacing:
            -.055em;
        }

        /* ======================
           CARDS
        ====================== */

        .pj-collection-grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 22px;
        }

        .pj-collection-card {
          appearance: none;

          width: 100%;
          min-height: 220px;

          display: grid;

          grid-template-columns:
            minmax(220px, 44%)
            1fr;

          padding: 0;

          overflow: hidden;

          text-align: left;

          color: #fff;

          background:
            #151517;

          border:
            1px solid
            rgba(255,255,255,.13);

          border-radius: 18px;

          cursor: pointer;

          transition:
            background .2s ease,
            border-color .2s ease;
        }

        .pj-collection-card:hover {
          background: #1a1a1d;

          border-color:
            rgba(255,255,255,.28);
        }

        .pj-collection-image {
          min-width: 0;
          min-height: 220px;

          overflow: hidden;

          background: #111;
        }

        .pj-collection-image img {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;

          transition:
            transform .45s ease;
        }

        .pj-collection-card:hover
        .pj-collection-image img {
          transform:
            scale(1.035);
        }

        .pj-collection-content {
          display: flex;

          flex-direction: column;

          justify-content: center;

          padding: 30px;
        }

        .pj-collection-content h3 {
          margin:
            0 0 14px;

          font-size:
            clamp(
              20px,
              1.8vw,
              27px
            );

          font-weight: 750;

          letter-spacing:
            -.025em;
        }

        .pj-collection-content p {
          margin:
            0 0 24px;

          font-size: 15px;

          line-height: 1.55;

          color:
            rgba(255,255,255,.68);
        }

        .pj-collection-content span {
          font-size: 12px;

          color:
            rgba(255,255,255,.46);
        }

        /* ======================
           GALLERY
        ====================== */

        .pj-gallery-overlay {
          position: fixed;
          inset: 0;

          z-index: 1000;

          display: flex;

          align-items: center;
          justify-content: center;

          padding: 24px;

          background:
            rgba(0,0,0,.9);
        }

        .pj-gallery {
          width:
            min(1400px, 96vw);

          max-height: 92vh;

          overflow-y: auto;

          padding:
            clamp(
              22px,
              3vw,
              38px
            );

          background:
            #0d0d0f;

          border:
            1px solid
            rgba(255,255,255,.12);

          border-radius:
            20px;
        }

        .pj-gallery-header {
          display: flex;

          align-items:
            flex-start;

          justify-content:
            space-between;

          gap: 30px;

          margin-bottom:
            30px;
        }

        .pj-gallery-kicker {
          margin-bottom:
            8px;

          font-size:
            11px;

          letter-spacing:
            .2em;

          color:
            rgba(255,255,255,.4);
        }

        .pj-gallery-header h3 {
          margin:
            0 0 8px;

          font-size:
            clamp(
              30px,
              4vw,
              52px
            );

          letter-spacing:
            -.045em;
        }

        .pj-gallery-header span {
          font-size:
            13px;

          color:
            rgba(255,255,255,.5);
        }

        .pj-close {
          width: 44px;
          height: 44px;

          flex: 0 0 auto;

          border:
            1px solid
            rgba(255,255,255,.15);

          border-radius:
            50%;

          background:
            rgba(255,255,255,.04);

          color: #fff;

          font-size:
            28px;

          cursor: pointer;
        }

        /* ======================
           PHOTOS
        ====================== */

        .pj-photo-grid {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0,1fr)
            );

          gap: 14px;
        }

        .pj-photo {
          appearance: none;

          padding: 0;

          aspect-ratio:
            4 / 3;

          overflow: hidden;

          border: 0;

          border-radius:
            10px;

          background:
            #111;

          cursor: pointer;
        }

        .pj-photo img {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;

          transition:
            transform .4s ease;
        }

        .pj-photo:hover img {
          transform:
            scale(1.03);
        }

        .pj-show-more-wrap {
          display: flex;

          justify-content:
            center;

          padding:
            30px 0 4px;
        }

        .pj-show-more {
          padding:
            12px 22px;

          border:
            1px solid
            rgba(255,255,255,.18);

          border-radius:
            999px;

          background:
            rgba(255,255,255,.05);

          color: #fff;

          font-size:
            13px;

          cursor: pointer;
        }

        /* ======================
           LIGHTBOX
        ====================== */

        .pj-lightbox {
          position: fixed;
          inset: 0;

          z-index: 2000;

          display: flex;

          align-items:
            center;

          justify-content:
            center;

          padding:
            20px;

          background:
            rgba(0,0,0,.97);
        }

        .pj-lightbox-inner {
          position:
            relative;

          width: 100%;
          height: 100%;

          display: flex;

          align-items:
            center;

          justify-content:
            center;
        }

        .pj-lightbox-inner > img {
          display: block;

          max-width:
            calc(100vw - 100px);

          max-height:
            calc(100vh - 90px);

          width: auto;
          height: auto;

          object-fit:
            contain;
        }

        .pj-lightbox-close {
          position:
            absolute;

          top: 10px;
          right: 10px;

          width: 44px;
          height: 44px;

          border:
            1px solid
            rgba(255,255,255,.18);

          border-radius:
            50%;

          background:
            rgba(0,0,0,.4);

          color: #fff;

          font-size:
            28px;

          cursor: pointer;
        }

        .pj-lightbox-arrow {
          position:
            absolute;

          top: 50%;

          transform:
            translateY(-50%);

          width: 48px;
          height: 48px;

          border:
            1px solid
            rgba(255,255,255,.18);

          border-radius:
            50%;

          background:
            rgba(0,0,0,.4);

          color: #fff;

          font-size:
            34px;

          cursor: pointer;
        }

        .pj-prev {
          left: 10px;
        }

        .pj-next {
          right: 10px;
        }

        .pj-lightbox-count {
          position:
            absolute;

          left: 50%;
          bottom: 10px;

          transform:
            translateX(-50%);

          font-size:
            12px;

          letter-spacing:
            .12em;

          color:
            rgba(255,255,255,.55);
        }

        /* ======================
           RESPONSIVE
        ====================== */

        @media (max-width: 950px) {

          .pj-collection-grid {
            grid-template-columns:
              1fr;
          }

          .pj-photo-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(0,1fr)
              );
          }
        }

        @media (max-width: 600px) {

          .pj-collections {
            padding:
              56px 18px;
          }

          .pj-collection-card {
            grid-template-columns:
              1fr;
          }

          .pj-collection-image {
            height:
              240px;
          }

          .pj-photo-grid {
            grid-template-columns:
              1fr;
          }

          .pj-lightbox-inner > img {
            max-width:
              100%;

            max-height:
              calc(
                100vh - 120px
              );
          }

          .pj-lightbox-arrow {
            width:
              40px;

            height:
              40px;

            font-size:
              28px;
          }
        }

      `}</style>

    </section>
  );
}