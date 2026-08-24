import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#050505",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <img
          src={`${origin}/images/Land_02.jpg`}
          width="1200"
          height="630"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.30) 65%, rgba(0,0,0,.12) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px",
            color: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-3px",
            }}
          >
            <div>FOLLOW DUBLIN</div>
            <div>THROUGH PHOTOGRAPHY</div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "4px",
            }}
          >
            photoJan
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}