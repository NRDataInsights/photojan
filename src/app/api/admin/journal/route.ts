import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export const runtime = "nodejs";

const NOTE_PROJECTION = `{
  _id, title, slug, category, publishedAt, excerpt, _createdAt,
  "bodyText": pt::text(body),
  coverImage { alt, asset -> { _id, url } }
}`;

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "journal-entry";
}

function bodyToBlocks(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => ({
      _type: "block",
      _key: `paragraph-${Date.now().toString(36)}-${index}`,
      style: "normal",
      markDefs: [],
      children: [{
        _type: "span",
        _key: `span-${Date.now().toString(36)}-${index}`,
        text: paragraph,
        marks: [],
      }],
    }));
}

async function uploadCover(file: File, alt: string) {
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

function fields(formData: FormData) {
  return {
    title: String(formData.get("title") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    publishedAt: String(formData.get("publishedAt") || "").trim(),
    excerpt: String(formData.get("excerpt") || "").trim(),
    bodyText: String(formData.get("body") || "").trim(),
    coverAlt: String(formData.get("coverAlt") || "").trim(),
  };
}

export async function GET() {
  try {
    const notes = await writeClient.fetch(`*[_type == "note"] | order(publishedAt desc, _createdAt desc) ${NOTE_PROJECTION}`);
    return NextResponse.json({ ok: true, notes: notes || [] });
  } catch (error) {
    console.error("ADMIN JOURNAL GET ERROR:", error);
    return NextResponse.json({ ok: false, error: "Unable to load journal entries." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = fields(formData);
    const file = formData.get("coverImage");
    if (!data.title || !data.bodyText) {
      return NextResponse.json({ ok: false, error: "Title and article body are required." }, { status: 400 });
    }

    const note = await writeClient.create({
      _type: "note",
      title: data.title,
      slug: { _type: "slug", current: `${slugify(data.title)}-${Date.now().toString(36)}` },
      body: bodyToBlocks(data.bodyText),
      ...(data.category && { category: data.category }),
      ...(data.publishedAt && { publishedAt: new Date(data.publishedAt).toISOString() }),
      ...(data.excerpt && { excerpt: data.excerpt }),
      ...(file instanceof File && file.size > 0 && { coverImage: await uploadCover(file, data.coverAlt) }),
    });
    return NextResponse.json({ ok: true, note }, { status: 201 });
  } catch (error) {
    console.error("ADMIN JOURNAL POST ERROR:", error);
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unable to add journal entry.",
    }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const formData = await request.formData();
    const id = String(formData.get("id") || "").trim();
    const data = fields(formData);
    const file = formData.get("coverImage");
    if (!id || !data.title || !data.bodyText) {
      return NextResponse.json({ ok: false, error: "Entry, title and article body are required." }, { status: 400 });
    }

    const patch = writeClient.patch(id).set({
      title: data.title,
      body: bodyToBlocks(data.bodyText),
      "coverImage.alt": data.coverAlt,
    }).unset(["category", "publishedAt", "excerpt"]);

    const optionalFields: Record<string, string> = {};
    if (data.category) optionalFields.category = data.category;
    if (data.publishedAt) optionalFields.publishedAt = new Date(data.publishedAt).toISOString();
    if (data.excerpt) optionalFields.excerpt = data.excerpt;
    if (Object.keys(optionalFields).length) patch.set(optionalFields);
    if (file instanceof File && file.size > 0) patch.set({ coverImage: await uploadCover(file, data.coverAlt) });

    const note = await patch.commit();
    return NextResponse.json({ ok: true, note });
  } catch (error) {
    console.error("ADMIN JOURNAL PATCH ERROR:", error);
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unable to update journal entry.",
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id || typeof id !== "string") {
      return NextResponse.json({ ok: false, error: "Journal entry is required." }, { status: 400 });
    }
    await writeClient.delete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ADMIN JOURNAL DELETE ERROR:", error);
    return NextResponse.json({ ok: false, error: "Unable to delete journal entry." }, { status: 500 });
  }
}
