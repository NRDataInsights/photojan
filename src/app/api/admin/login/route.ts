import { NextResponse } from "next/server";
import { createHash } from "crypto";

function hash(value: string) {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const allowedEmail =
      process.env.ADMIN_EMAIL?.trim().toLowerCase();

    const allowedPasswordHash =
      process.env.ADMIN_PASSWORD_HASH?.trim();

    const sessionSecret =
      process.env.ADMIN_SESSION_SECRET?.trim();

    if (
      !allowedEmail ||
      !allowedPasswordHash ||
      !sessionSecret
    ) {
      console.error(
        "Admin environment variables are missing"
      );

      return NextResponse.json(
        {
          error:
            "Editor login is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const submittedEmail =
      String(email || "")
        .trim()
        .toLowerCase();

    const submittedPassword =
      String(password || "");

    const submittedHash =
      hash(submittedPassword);

    const valid =
      submittedEmail === allowedEmail &&
      submittedHash === allowedPasswordHash;

    if (!valid) {
      return NextResponse.json(
        {
          error:
            "Incorrect email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const response =
      NextResponse.json({
        ok: true,
      });

    response.cookies.set(
      "photojan_admin",
      sessionSecret,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "strict",

        path: "/",

        maxAge:
          60 * 60 * 8,
      }
    );

    return response;

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Unable to sign in.",
      },
      {
        status: 500,
      }
    );
  }
}