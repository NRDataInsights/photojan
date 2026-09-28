"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";

type Collection = { _id: string; title: string };
type Photo = {
  _id: string;
  title?: string;
  caption?: string;
  year?: number;
  location?: string;
  image?: { alt?: string; asset?: { _id: string; url: string } };
  collection?: Collection;
};

async function readResponse(response: Response) {
  const result = await response.json().catch(() => null);
  if (!response.ok) throw new Error(result?.error || "The request failed.");
  return result;
}

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Photo | null | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const result = await readResponse(await fetch("/api/admin/photos", { cache: "no-store" }));
      setPhotos(result.photos || []);
      setCollections(result.collections || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load photographs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadContent(); }, [loadContent]);

  async function savePhoto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      if (editing?._id) formData.set("id", editing._id);
      await readResponse(await fetch("/api/admin/photos", {
        method: editing?._id ? "PATCH" : "POST",
        body: formData,
      }));
      setStatus(editing?._id ? "Photograph updated." : "Photograph added.");
      await loadContent();
      setEditing(undefined);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Unable to save photograph.");
    } finally {
      setSaving(false);
    }
  }

  async function deletePhoto(photo: Photo) {
    if (!window.confirm(`Delete “${photo.title || "Untitled"}”? This cannot be undone.`)) return;
    setDeletingId(photo._id);
    setStatus("");
    try {
      await readResponse(await fetch("/api/admin/photos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: photo._id }),
      }));
      if (editing?._id === photo._id) setEditing(undefined);
      setStatus("Photograph deleted.");
      await loadContent();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Unable to delete photograph.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="page">
      <header>
        <div><Link href="/admin" className="brand">photoJan</Link><div className="label">CONTENT EDITOR</div></div>
        <Link href="/admin" className="back">← EDITOR</Link>
      </header>

      <section className="intro">
        <div className="number">01</div>
        <h1>Photographs</h1>
        <div className="intro-bottom">
          <p>Add, edit and organise photographs.</p>
          <button type="button" onClick={() => { setEditing(null); setStatus(""); }}>+ ADD PHOTOGRAPH</button>
        </div>
      </section>

      {editing !== undefined && (
        <section className="editor-panel">
          <div className="panel-header">
            <div><div className="label">{editing ? "EDIT PHOTOGRAPH" : "NEW PHOTOGRAPH"}</div><h2>{editing?.title || "Add to the archive"}</h2></div>
            <button type="button" className="text-button" onClick={() => setEditing(undefined)}>CLOSE</button>
          </div>
          <form key={editing?._id || "new"} onSubmit={savePhoto}>
            <div className="form-grid">
              <label>TITLE<input name="title" type="text" defaultValue={editing?.title || ""} required /></label>
              <label>COLLECTION<select name="collectionId" defaultValue={editing?.collection?._id || ""} required><option value="" disabled>Select collection</option>{collections.map((item) => <option key={item._id} value={item._id}>{item.title}</option>)}</select></label>
              <label>YEAR<input name="year" type="number" min="1800" max="2200" defaultValue={editing?.year || ""} /></label>
              <label>LOCATION<input name="location" type="text" defaultValue={editing?.location || ""} /></label>
            </div>
            <label>ALT TEXT<input name="alt" type="text" defaultValue={editing?.image?.alt || ""} placeholder="Describe the image for accessibility" /></label>
            <label>CAPTION<textarea name="caption" rows={3} defaultValue={editing?.caption || ""} /></label>
            <label>{editing ? "REPLACE IMAGE (OPTIONAL)" : "IMAGE"}<input name="image" type="file" accept="image/*" required={!editing} /></label>
            <div className="form-actions">
              <button type="submit" className="primary" disabled={saving}>{saving ? "SAVING..." : editing ? "SAVE CHANGES" : "PUBLISH PHOTOGRAPH"}</button>
              {editing && <button type="button" className="danger" disabled={deletingId === editing._id} onClick={() => void deletePhoto(editing)}>DELETE</button>}
            </div>
          </form>
        </section>
      )}

      {status && <div className="status" role="status">{status}</div>}

      <section className="summary">
        <div><span>PHOTOGRAPHS</span><strong>{photos.length}</strong></div>
        <div><span>COLLECTIONS</span><strong>{collections.length}</strong></div>
      </section>

      {loading && <div className="message">Loading photographs...</div>}
      {error && <div className="message error">{error}<button type="button" className="retry" onClick={() => void loadContent()}>TRY AGAIN</button></div>}
      {!loading && !error && photos.length === 0 && <div className="message">No photographs yet.</div>}

      {!loading && !error && photos.length > 0 && (
        <section className="photo-list">
          {photos.map((photo, index) => (
            <article className="photo-row" key={photo._id}>
              <div className="index">{String(index + 1).padStart(2, "0")}</div>
              <div className="thumb">{photo.image?.asset?.url ? <img src={photo.image.asset.url} alt={photo.image.alt || photo.title || "Photograph"} /> : <div className="no-image">NO IMAGE</div>}</div>
              <div className="details"><div className="collection">{photo.collection?.title || "UNASSIGNED"}</div><h2>{photo.title || "Untitled"}</h2><div className="metadata">{[photo.location, photo.year].filter(Boolean).join(" · ") || "No location or year"}</div></div>
              <div className="row-actions"><button type="button" onClick={() => { setEditing(photo); setStatus(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}>EDIT →</button><button type="button" className="delete-link" disabled={deletingId === photo._id} onClick={() => void deletePhoto(photo)}>{deletingId === photo._id ? "DELETING..." : "DELETE"}</button></div>
            </article>
          ))}
        </section>
      )}

      <style>{`
        .page{min-height:100vh;background:#f3f3ef;color:#111;padding:32px clamp(22px,5vw,80px) 100px;font-family:Inter,system-ui,sans-serif}header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:38px;border-bottom:1px solid #d2d2cc}.brand{display:block;margin-bottom:7px;color:#111;font-size:14px;font-weight:700;letter-spacing:.14em}.label{font-size:10px;font-weight:700;letter-spacing:.18em;color:#888}.back{font-size:11px;font-weight:700;letter-spacing:.12em}.intro{padding:clamp(65px,9vw,125px) 0 70px}.number{margin-bottom:28px;font-size:11px;color:#999}h1{margin:0;font-size:clamp(65px,13vw,190px);line-height:.78;letter-spacing:-.075em;font-weight:900}.intro-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:40px;margin-top:60px}.intro-bottom p{margin:0;max-width:360px;font-size:20px;line-height:1.45;color:#666}.intro-bottom button,.primary{border:0;background:#111;color:#fff;padding:16px 22px;font:inherit;font-size:11px;font-weight:700;letter-spacing:.11em;cursor:pointer}.editor-panel{padding:45px 0 55px;border-top:1px solid #d2d2cc}.panel-header{display:flex;justify-content:space-between;gap:30px;margin-bottom:35px}.panel-header h2{margin:10px 0 0;font-size:clamp(30px,4vw,54px);letter-spacing:-.04em}.text-button,.danger,.row-actions button,.retry{border:0;background:transparent;font:inherit;font-size:10px;font-weight:700;letter-spacing:.12em;cursor:pointer}.editor-panel form{display:grid;gap:22px;max-width:900px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.editor-panel label{display:grid;gap:9px;font-size:10px;font-weight:700;letter-spacing:.13em}.editor-panel input,.editor-panel select,.editor-panel textarea{width:100%;padding:14px;border:1px solid #c8c8c2;background:#fff;color:#111;font:inherit;resize:vertical}.form-actions{display:flex;align-items:center;gap:24px}.danger,.delete-link{color:#9b1c1c!important}.primary:disabled,.danger:disabled,.row-actions button:disabled{opacity:.45;cursor:wait}.status{padding:18px 0;border-top:1px solid #d2d2cc;font-size:14px;color:#555}.summary{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid #d2d2cc;border-bottom:1px solid #d2d2cc}.summary>div{display:flex;align-items:flex-end;justify-content:space-between;padding:25px 0}.summary>div:first-child{padding-right:40px;border-right:1px solid #d2d2cc}.summary>div:last-child{padding-left:40px}.summary span{font-size:10px;font-weight:700;letter-spacing:.14em;color:#888}.summary strong{font-size:30px;letter-spacing:-.04em}.message{padding:50px 0;font-size:16px;color:#666}.message.error{color:#9b1c1c}.retry{margin-left:20px;color:inherit}.photo-list{border-bottom:1px solid #d2d2cc}.photo-row{display:grid;grid-template-columns:40px 150px 1fr auto;align-items:center;gap:30px;padding:25px 0;border-bottom:1px solid #d2d2cc}.index{font-size:10px;color:#999}.thumb{width:150px;aspect-ratio:4/3;background:#ddd;overflow:hidden}.thumb img{width:100%;height:100%;object-fit:cover}.no-image{height:100%;display:grid;place-items:center;font-size:9px;color:#888}.collection{margin-bottom:8px;font-size:10px;font-weight:700;letter-spacing:.14em;color:#888}.details h2{margin:0;font-size:clamp(21px,2.4vw,34px);letter-spacing:-.035em}.metadata{margin-top:8px;font-size:12px;color:#777}.row-actions{display:grid;justify-items:end;gap:12px}.row-actions button{padding:5px 0}
        @media(max-width:700px){.intro-bottom{display:grid}.intro-bottom button{justify-self:start}.form-grid,.summary{grid-template-columns:1fr}.summary>div:first-child{padding-right:0;border-right:0}.summary>div:last-child{padding-left:0;border-top:1px solid #d2d2cc}.photo-row{grid-template-columns:30px 88px 1fr;gap:14px}.thumb{width:88px}.row-actions{grid-column:3;display:flex;justify-self:start;gap:20px}h1{font-size:clamp(54px,18vw,100px)}}
      `}</style>
    </main>
  );
}
