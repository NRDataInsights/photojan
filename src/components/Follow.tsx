"use client";

import { useState } from "react";

type Choice = {
  text: string;
  next: number;
};

type FollowNode = {
  image: string;
  label: string;
  title: string;
  description: string;
  choices: Choice[];
};

const nodes: FollowNode[] = [
  {
    image: "/images/Land_02.jpg",
    label: "START HERE",
    title: "What caught your eye?",
    description:
      "Do not choose a collection. Choose the detail that holds your attention.",
    choices: [
      { text: "FOLLOW THE RAIN", next: 5 },
      { text: "FOLLOW THE BUS", next: 1 },
    ],
  },

  /* =========================
     FOLLOW THE BUS
  ========================= */

  {
    image: "/images/transport/Transport_16.jpg",
    label: "FOLLOW THE BUS",
    title: "Movement becomes the route.",
    description:
      "The bus leaves the frame, but the visual thread continues through colour, motion and the street around it.",
    choices: [
      { text: "FOLLOW THE NEXT BUS", next: 2 },
      { text: "FOLLOW THE STREET", next: 4 },
    ],
  },

  {
    image: "/images/transport/Transport_15.jpg",
    label: "FOLLOW THE BUS",
    title: "Inside the movement.",
    description:
      "The city is no longer viewed from outside. People, windows and motion become part of the same route.",
    choices: [
      { text: "FOLLOW THE VEHICLE", next: 3 },
      { text: "FOLLOW THE PEOPLE", next: 4 },
    ],
  },

  {
    image: "/images/transport/Transport_17.jpg",
    label: "FOLLOW THE VEHICLE",
    title: "The object changes. The movement remains.",
    description:
      "A different vehicle continues the same visual idea: travel, passage and the city seen through machines in motion.",
    choices: [
      { text: "FOLLOW THE STREET", next: 4 },
      { text: "FOLLOW THE RAIN", next: 5 },
    ],
  },

  {
    image: "/images/cityscape/Cityscape_25.jpg",
    label: "FOLLOW THE STREET",
    title: "The route opens into the city.",
    description:
      "Transport becomes street, street becomes space, and the visual path leaves the vehicle behind.",
    choices: [
      { text: "FOLLOW THE RAIN", next: 5 },
      { text: "START AGAIN", next: 0 },
    ],
  },

  /* =========================
     FOLLOW THE RAIN
  ========================= */

  {
    image: "/images/rain-reflections/Rain and reflections_01.jpg",
    label: "FOLLOW THE RAIN",
    title: "The city loses its edges.",
    description:
      "Rain changes surfaces, softens detail and turns ordinary streets into another kind of image.",
    choices: [
      { text: "FOLLOW THE REFLECTION", next: 6 },
      { text: "FOLLOW THE LIGHT", next: 7 },
    ],
  },

  {
    image: "/images/rain-reflections/Rain and reflections_02.jpg",
    label: "FOLLOW THE REFLECTION",
    title: "The street becomes an image of itself.",
    description:
      "Glass, water and reflected light create a second city inside the first.",
    choices: [
      { text: "FOLLOW THE LIGHT", next: 7 },
      { text: "FOLLOW THE STREET", next: 4 },
    ],
  },

  {
    image: "/images/rain-reflections/Rain and reflections_03.jpg",
    label: "FOLLOW THE LIGHT",
    title: "Light becomes colour.",
    description:
      "The subject becomes less important than the way light survives inside water, blur and movement.",
    choices: [
      { text: "FOLLOW THE BUS", next: 1 },
      { text: "START AGAIN", next: 0 },
    ],
  },
];

export function Follow() {
  const [current, setCurrent] = useState(0);

  const node = nodes[current];

  return (
    <section className="follow-section" id="follow">
      <div className="follow-inner">

        <div className="follow-head">
          <div className="follow-kicker">FOLLOW</div>

          <h2>
            Follow what you notice.
            <br />
            See where it takes you.
          </h2>
        </div>

        <div className="follow-stage">

          <div className="follow-image">
            <img
              key={node.image}
              src={node.image}
              alt={node.title}
            />
          </div>

          <div className="follow-panel">
            <div className="follow-node-label">
              {node.label}
            </div>

            <h3>{node.title}</h3>

            <p className="follow-intro">
              {node.description}
            </p>

            <div className="follow-actions">
              {node.choices.map((choice) => (
                <button
                  key={`${current}-${choice.text}`}
                  type="button"
                  onClick={() => setCurrent(choice.next)}
                >
                  <span>{choice.text}</span>
                  <span aria-hidden="true">→</span>
                </button>
              ))}
            </div>

            {current !== 0 && (
              <button
                type="button"
                className="follow-reset"
                onClick={() => setCurrent(0)}
              >
                Restart route
              </button>
            )}
          </div>

        </div>

      </div>

      <style>{`
        .follow-section {
          width: 100%;
          background: #050505;
          color: #fff;
          padding: clamp(72px, 8vw, 120px) clamp(24px, 5vw, 72px);
        }

        .follow-inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .follow-head {
          margin-bottom: 44px;
        }

        .follow-kicker {
          margin-bottom: 18px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .22em;
          color: rgba(255,255,255,.42);
        }

        .follow-head h2 {
          margin: 0;
          max-width: 980px;
          font-size: clamp(42px, 5vw, 72px);
          line-height: .98;
          font-weight: 850;
          letter-spacing: -.055em;
        }

        .follow-stage {
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) minmax(340px, .75fr);
          min-height: 650px;
          border-top: 1px solid rgba(255,255,255,.12);
          border-bottom: 1px solid rgba(255,255,255,.12);
        }

        .follow-image {
          position: relative;
          min-width: 0;
          min-height: 650px;
          overflow: hidden;
          background: #111;
        }

        .follow-image img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: followFade .55s ease;
        }

        @keyframes followFade {
          from {
            opacity: 0;
            transform: scale(1.015);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .follow-panel {
          padding: clamp(32px, 4vw, 58px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #0a0a0b;
          border-left: 1px solid rgba(255,255,255,.1);
        }

        .follow-node-label {
          margin-bottom: 20px;
          font-size: 11px;
          letter-spacing: .2em;
          color: rgba(255,255,255,.42);
        }

        .follow-panel h3 {
          margin: 0 0 20px;
          font-size: clamp(30px, 3vw, 48px);
          line-height: 1.04;
          letter-spacing: -.045em;
        }

        .follow-intro {
          margin: 0 0 34px;
          max-width: 36ch;
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255,255,255,.62);
        }

        .follow-actions {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .follow-actions button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          border: 0;
          border-top: 1px solid rgba(255,255,255,.15);
          background: transparent;
          color: #fff;
          font: inherit;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: .08em;
          text-align: left;
          cursor: pointer;
          transition:
            padding-left .2s ease,
            color .2s ease;
        }

        .follow-actions button:last-child {
          border-bottom: 1px solid rgba(255,255,255,.15);
        }

        .follow-actions button:hover {
          padding-left: 10px;
          color: rgba(255,255,255,.7);
        }

        .follow-reset {
          align-self: flex-start;
          margin-top: 30px;
          padding: 0;
          border: 0;
          background: none;
          color: rgba(255,255,255,.38);
          font: inherit;
          font-size: 12px;
          cursor: pointer;
        }

        .follow-reset:hover {
          color: rgba(255,255,255,.65);
        }

        @media (max-width: 950px) {
          .follow-stage {
            grid-template-columns: 1fr;
          }

          .follow-image {
            min-height: 55vh;
          }

          .follow-panel {
            border-left: 0;
            border-top: 1px solid rgba(255,255,255,.1);
          }
        }

        @media (max-width: 600px) {
          .follow-section {
            padding: 56px 18px;
          }

          .follow-stage {
            min-height: auto;
          }

          .follow-image {
            min-height: 430px;
          }

          .follow-panel {
            padding: 28px 22px;
          }
        }
      `}</style>
    </section>
  );
}