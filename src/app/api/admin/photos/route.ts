import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export const runtime = "nodejs";

export async function GET() {
  try {
    const data = await writeClient.fetch(`
      {
        "collections": *[
          _type == "collection"
        ] | order(title asc) {
          _id,
          title
        },

        "photos": *[
          _type == "photo"
        ] | order(_createdAt desc) {
          _id,
          title,
          _createdAt,

          image {
            asset -> {
              _id,
              url
            }
          },

          collection -> {
            _id,
            title
          }
        }
      }
    `);

    return NextResponse.json({
      ok: true,
      collections: data.collections || [],
      photos: data.photos || [],
    });
  } catch (error) {
    console.error("ADMIN PHOTOS GET ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to load photographs",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = String(
      formData.get("title") || ""
    ).trim();

    const alt = String(
      formData.get("alt") || ""
    ).trim();

    const collectionId = String(
      formData.get("collectionId") || ""
    ).trim();

    const file = formData.get("image");

    if (!title) {
      return NextResponse.json(
        {
          ok: false,
          error: "Title is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!collectionId) {
      return NextResponse.json(
        {
          ok: false,
          error: "Collection is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Image is required",
        },
        {
          status: 400,
        }
      );
    }

    const arrayBuffer =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(arrayBuffer);

    const asset =
      await writeClient.assets.upload(
        "image",
        buffer,
        {
          filename: file.name,
          contentType:
            file.type || undefined,
        }
      );

    const photo =
      await writeClient.create({
        _type: "photo",

        title,

        image: {
          _type: "image",

          asset: {
            _type: "reference",
            _ref: asset._id,
          },

          alt,
        },

        collection: {
          _type: "reference",
          _ref: collectionId,
        },
      });

    return NextResponse.json({
      ok: true,
      photo,
    });

  } catch (error) {
    console.error(
      "ADMIN PHOTOS POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to upload photograph",
      },
      {
        status: 500,
      }
    );
  }
}