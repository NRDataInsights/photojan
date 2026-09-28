"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";

type Note = {
  _id: string;
  title: string;
  category?: string;
  publishedAt?: string;
  excerpt?: string;
  bodyText?: string;
  coverImage?: { alt?: string; asset?: { _id: string; url: string } };
};

const CATEGORIES = ["Observation", "Process", "Dublin", "Photography", "Journal"];

async function readResponse(response: Response) {
  const result = await response.json().catch(() => null);
  if (!response.ok) throw new Error(result?.error || "The request failed.");
  return result;
}

function inputDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function displayDate(value?: string) {
  if (!value) return "DRAFT";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value)).toUpperCase();
}

export default function AdminJournalPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Note | null | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const result = await readResponse(await fetch("/api/admin/journal", { cache: "no-store" }));
      setNotes(result.notes || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load journal entries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadNotes(); }, [loadNotes]);

  async function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    try {
      const formData = new FormData(event.currentTarget);
      if (editing?._id) formData.set("id", editing._id);
      await readResponse(await fetch("/api/admin/journal", {
        method: editing?._id ? "PATCH" : "POST",
        body: formData,
      }));
      setStatus(editing?._id ? "Journal entry updated." : "Journal entry published.");
      await loadNotes();
      setEditing(undefined);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Unable to save journal entry.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteNote(note: Note) {
    if (!window.confirm(`Delete “${note.title}”? This cannot be undone.`)) return;
    setDeletingId(note._id);
    setStatus("");
    try {
      await readResponse(await fetch("/api/admin/journal", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: note._id }),
      }));
      if (editing?._id === note._id) setEditing(undefined);
      setStatus("Journal entry deleted.");
      await loadNotes();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Unable to delete journal entry.");
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
        <div className="number">02</div>
        <h1>Journal</h1>
        <div className="intro-bottom"><p>Write, publish and revise journal entries.</p><button type="button" onClick={() => { setEditing(null); setStatus(""); }}>+ NEW ENTRY</button></div>
      </section>

      {editing !== undefined && (
        <section className="editor-panel">
          <div className="panel-header">
            <div><div className="label">{editing ? "EDIT ENTRY" : "NEW JOURNAL ENTRY"}</div><h2>{editing?.title || "Write something noticed"}</h2></div>
            <button type="button" className="text-button" onClick={() => setEditing(undefined)}>CLOSE</button>
          </div>
          <form key={editing?._id || "new"} onSubmit={saveNote}>
            <label>TITLE<input name="title" type="text" defaultValue={editing?.title || ""} required /></label>
            <div className="form-grid">
              <label>CATEGORY<select name="category" defaultValue={editing?.category || "Journal"}>{CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
              <label>PUBLISH DATE<input name="publishedAt" type="datetime-local" defaultValue={inputDate(editing?.publishedAt)} /></label>
            </div>
            <label>EXCERPT<textarea name="excerpt" rows={3} defaultValue={editing?.excerpt || ""} placeholder="A short introduction shown on the Journal page" /></label>
            <label>ARTICLE BODY<textarea name="body" rows={14} defaultValue={editing?.bodyText || ""} placeholder="Separate paragraphs with a blank line." required /><span className="hint">Use a blank line between paragraphs.</span></label>
            <div className="form-grid">
              <label>COVER IMAGE ALT TEXT<input name="coverAlt" type="text" defaultValue={editing?.coverImage?.alt || ""} /></label>
              <label>{editing ? "REPLACE COVER (OPTIONAL)" : "COVER IMAGE (OPTIONAL)"}<input name="coverImage" type="file" accept="image/*" /></label>
            </div>
            <div className="form-actions"><button type="submit" className="primary" disabled={saving}>{saving ? "SAVING..." : editing ? "SAVE CHANGES" : "PUBLISH ENTRY"}</button>{editing && <button type="button" className="danger" disabled={deletingId === editing._id} onClick={() => void deleteNote(editing)}>DELETE</button>}</div>
          </form>
        </section>
      )}

      {status && <div className="status" role="status">{status}</div>}
      <section className="summary"><div><span>JOURNAL ENTRIES</span><strong>{notes.length}</strong></div><div><span>PUBLISHED</span><strong>{notes.filter((note) => note.publishedAt).length}</strong></div></section>
      {loading && <div className="message">Loading journal entries...</div>}
      {error && <div className="message error">{error}<button type="button" className="retry" onClick={() => void loadNotes()}>TRY AGAIN</button></div>}
      {!loading && !error && notes.length === 0 && <div className="message">No journal entries yet.</div>}

      {!loading && !error && notes.length > 0 && (
        <section className="entry-list">
          {notes.map((note, index) => (
            <article className="entry-row" key={note._id}>
              <div className="index">{String(index + 1).padStart(2, "0")}</div>
              <div className="cover">{note.coverImage?.asset?.url ? <img src={note.coverImage.asset.url} alt={note.coverImage.alt || note.title} /> : <div className="no-image">NO COVER</div>}</div>
              <div className="details"><div className="category">{note.category || "JOURNAL"} · {displayDate(note.publishedAt)}</div><h2>{note.title}</h2>{note.excerpt && <p>{note.excerpt}</p>}</div>
              <div className="row-actions"><button type="button" onClick={() => { setEditing(note); setStatus(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}>EDIT →</button><button type="button" className="delete-link" disabled={deletingId === note._id} onClick={() => void deleteNote(note)}>{deletingId === note._id ? "DELETING..." : "DELETE"}</button></div>
            </article>
          ))}
        </section>
      )}

      <style>{`
        .page{min-height:100vh;background:#f3f3ef;color:#111;padding:32px clamp(22px,5vw,80px) 100px;font-family:Inter,system-ui,sans-serif}header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:38px;border-bottom:1px solid #d2d2cc}.brand{display:block;margin-bottom:7px;font-size:14px;font-weight:700;letter-spacing:.14em}.label{font-size:10px;font-weight:700;letter-spacing:.18em;color:#888}.back{font-size:11px;font-weight:700;letter-spacing:.12em}.intro{padding:clamp(65px,9vw,125px) 0 70px}.number{margin-bottom:28px;font-size:11px;color:#999}h1{margin:0;font-size:clamp(70px,13vw,190px);line-height:.78;letter-spacing:-.075em;font-weight:900}.intro-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:40px;margin-top:60px}.intro-bottom p{margin:0;max-width:380px;font-size:20px;line-height:1.45;color:#666}.intro-bottom button,.primary{border:0;background:#111;color:#fff;padding:16px 22px;font:inherit;font-size:11px;font-weight:700;letter-spacing:.11em;cursor:pointer}.editor-panel{padding:45px 0 55px;border-top:1px solid #d2d2cc}.panel-header{display:flex;justify-content:space-between;gap:30px;margin-bottom:35px}.panel-header h2{margin:10px 0 0;font-size:clamp(30px,4vw,54px);letter-spacing:-.04em}.text-button,.danger,.row-actions button,.retry{border:0;background:transparent;font:inherit;font-size:10px;font-weight:700;letter-spacing:.12em;cursor:pointer}.editor-panel form{display:grid;gap:22px;max-width:950px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.editor-panel label{display:grid;gap:9px;font-size:10px;font-weight:700;letter-spacing:.13em}.editor-panel input,.editor-panel select,.editor-panel textarea{width:100%;padding:14px;border:1px solid #c8c8c2;background:#fff;color:#111;font:inherit;resize:vertical}.hint{font-size:11px;font-weight:400;letter-spacing:0;color:#888}.form-actions{display:flex;align-items:center;gap:24px}.danger,.delete-link{color:#9b1c1c!important}.primary:disabled,.danger:disabled,.row-actions button:disabled{opacity:.45;cursor:wait}.status{padding:18px 0;border-top:1px solid #d2d2cc;font-size:14px;color:#555}.summary{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid #d2d2cc;border-bottom:1px solid #d2d2cc}.summary>div{display:flex;align-items:flex-end;justify-content:space-between;padding:25px 0}.summary>div:first-child{padding-right:40px;border-right:1px solid #d2d2cc}.summary>div:last-child{padding-left:40px}.summary span{font-size:10px;font-weight:700;letter-spacing:.14em;color:#888}.summary strong{font-size:30px;letter-spacing:-.04em}.message{padding:50px 0;font-size:16px;color:#666}.message.error{color:#9b1c1c}.retry{margin-left:20px;color:inherit}.entry-list{border-bottom:1px solid #d2d2cc}.entry-row{display:grid;grid-template-columns:40px 180px 1fr auto;align-items:center;gap:30px;padding:28px 0;border-bottom:1px solid #d2d2cc}.index{font-size:10px;color:#999}.cover{width:180px;aspect-ratio:16/10;background:#ddd;overflow:hidden}.cover img{width:100%;height:100%;object-fit:cover}.no-image{height:100%;display:grid;place-items:center;font-size:9px;color:#888}.category{margin-bottom:9px;font-size:10px;font-weight:700;letter-spacing:.12em;color:#888}.details h2{margin:0;font-size:clamp(22px,2.6vw,38px);letter-spacing:-.04em}.details p{max-width:650px;margin:9px 0 0;color:#666;line-height:1.5}.row-actions{display:grid;justify-items:end;gap:12px}.row-actions button{padding:5px 0}
        @media(max-width:700px){.intro-bottom{display:grid}.intro-bottom button{justify-self:start}.form-grid,.summary{grid-template-columns:1fr}.summary>div:first-child{padding-right:0;border-right:0}.summary>div:last-child{padding-left:0;border-top:1px solid #d2d2cc}.entry-row{grid-template-columns:30px 90px 1fr;gap:14px}.cover{width:90px}.details p{display:none}.row-actions{grid-column:3;display:flex;justify-self:start;gap:20px}h1{font-size:clamp(58px,20vw,110px)}}
      `}</style>
    </main>
  );
}
