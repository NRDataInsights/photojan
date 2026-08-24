import { createClient } from "next-sanity";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const token =
  process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID"
  );
}

if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN"
  );
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-08-24",
  useCdn: false,
  token,
});