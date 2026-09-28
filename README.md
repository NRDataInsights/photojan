# photoJan — Next.js + Sanity starter

This is the first migration step from the current WordPress/Elementor prototype to a Next.js App Router site with Sanity.

## What is already migrated

- Main navigation: Home / Project / Collections / Notes / Archive / About / Contact
- Hero visual language
- Project statement in the current two-column editorial layout
- Six collection cards
- Gallery modal with 6 images first, then Show more
- Lightbox with Prev / Next / Close
- Current WordPress filenames are preserved in `src/data/collections.ts`
- Starter Sanity schemas: Photo, Collection, Note
- A relationship field `relatedPhotos` is already included so the later FOLLOW / graph-navigation concept can be built without changing the core photo model

## 1. Install Node.js

Use Node.js 20.9 or newer.

## 2. Create the local project

Unzip this folder and open it in VS Code.

In the terminal:

```bash
npm install
```

Copy:

```text
.env.local.example
```

to:

```text
.env.local
```

For the first local run you only need the existing WordPress media path:

```env
NEXT_PUBLIC_WP_MEDIA_BASE=http://photojan.local/wp-content/uploads/2026/02/
```

Then:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 3. Sanity

When ready to connect the CMS, create/connect a Sanity project and put its values in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
```

Then `/studio` becomes the embedded editing interface.

## Custom content editor

The simplified editor is available at `/admin`. It manages photographs and
journal entries without exposing the full Sanity Studio interface. Configure:

```env
SANITY_API_WRITE_TOKEN=...
ADMIN_EMAIL=...
ADMIN_PASSWORD_HASH=...
ADMIN_SESSION_SECRET=...
```

`ADMIN_PASSWORD_HASH` is the SHA-256 hash of the editor password. Generate it
locally with:

```bash
node -e "console.log(require('crypto').createHash('sha256').update('your-password').digest('hex'))"
```

Use a long, random value for `ADMIN_SESSION_SECRET`. The Sanity token must have
Editor permissions and must never use the `NEXT_PUBLIC_` prefix.

Important: this starter intentionally keeps the visible site on the existing WordPress image URLs for Phase 1. That lets us reproduce and improve the design first. Phase 2 is moving photos and text into Sanity and replacing `src/data/collections.ts` with GROQ queries.

## Recommended migration order

1. Make the Next.js version visually match the desired photoJan design.
2. Move the six collections into Sanity.
3. Move image assets from WordPress/local storage into Sanity.
4. Add Notes.
5. Add Archive metadata.
6. Add real photo-to-photo relations for FOLLOW / graph navigation.
7. Deploy GitHub -> Vercel.
