import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export const runtime = "nodejs";

const PHOTO_PROJECTION = `{
  _id, title, slug, caption, year, location, _createdAt,
  image { alt, asset -> { _id, url } },
  collection -> { _id, title }
}`;

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "photograph";
}

function optionalYear(value: FormDataEntryValue | null) {
  if (!value) return undefined;
  const year = Number(value);
  return Number.isInteger(year) && year >= 1800 && year <= 2200 ? year : null;
}

async function uploadImage(file: File, alt: string) {
  const asset = await writeClient.assets.upload("image", Buffer.from(await file.arrayBuffer()), {
    filename: file.name,
    contentType: file.type || undefined,
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt,
  };
}

export async function GET() {
  try {
    const data = await writeClient.fetch(`{
      "collections": *[_type == "collection"] | order(title asc) { _id, title },
      "photos": *[_type == "photo"] | order(_createdAt desc) ${PHOTO_PROJECTION}
    }`);
    return NextResponse.json({
      ok: true,
      collections: data.collections || [],
      photos: data.photos || [],
    });
  } catch (error) {
    console.error("ADMIN PHOTOS GET ERROR:", error);
    return NextResponse.json({ ok: false, error: "Unable to load photographs." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = String(formData.get("title") || "").trim();
    const alt = String(formData.get("alt") || "").trim();
    const caption = String(formData.get("caption") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const collectionId = String(formData.get("collectionId") || "").trim();
    const year = optionalYear(formData.get("year"));
    const file = formData.get("image");

    if (!title || !collectionId || !(file instanceof File) || file.size === 0) {
      return NextResponse.json({ ok: false, error: "Title, collection and image are required." }, { status: 400 });
    }
    if (year === null) {
      return NextResponse.json({ ok: false, error: "Enter a valid four-digit year." }, { status: 400 });
    }

    const photo = await writeClient.create({
      _type: "photo",
      title,
      slug: { _type: "slug", current: `${slugify(title)}-${Date.now().toString(36)}` },
      image: await uploadImage(file, alt),
      collection: { _type: "reference", _ref: collectionId },
      ...(caption && { caption }),
      ...(location && { location }),
      ...(year !== undefined && { year }),
    });
    return NextResponse.json({ ok: true, photo }, { status: 201 });
  } catch (error) {
    console.error("ADMIN PHOTOS POST ERROR:", error);
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unable to add photograph.",
    }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const formData = await request.formData();
    const id = String(formData.get("id") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const alt = String(formData.get("alt") || "").trim();
    const caption = String(formData.get("caption") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const collectionId = String(formData.get("collectionId") || "").trim();
    const year = optionalYear(formData.get("year"));
    const file = formData.get("image");

    if (!id || !title || !collectionId) {
      return NextResponse.json({ ok: false, error: "Photograph, title and collection are required." }, { status: 400 });
    }
    if (year === null) {
      return NextResponse.json({ ok: false, error: "Enter a valid four-digit year." }, { status: 400 });
    }

    const patch = writeClient.patch(id).set({
      title,
      collection: { _type: "reference", _ref: collectionId },
      "image.alt": alt,
    }).unset(["caption", "location", "year"]);

    const optionalFields: Record<string, string | number> = {};
    if (caption) optionalFields.caption = caption;
    if (location) optionalFields.location = location;
    if (year !== undefined) optionalFields.year = year;
    if (Object.keys(optionalFields).length) patch.set(optionalFields);
    if (file instanceof File && file.size > 0) patch.set({ image: await uploadImage(file, alt) });

    const photo = await patch.commit();
    return NextResponse.json({ ok: true, photo });
  } catch (error) {
    console.error("ADMIN PHOTOS PATCH ERROR:", error);
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unable to update photograph.",
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id || typeof id !== "string") {
      return NextResponse.json({ ok: false, error: "Photograph is required." }, { status: 400 });
    }
    await writeClient.delete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ADMIN PHOTOS DELETE ERROR:", error);
    return NextResponse.json({ ok: false, error: "Unable to delete photograph." }, { status: 500 });
  }
}
