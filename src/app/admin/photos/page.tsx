"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Collection = {
  _id: string;
  title: string;
};

type Photo = {
  _id: string;
  title?: string;

  image?: {
    asset?: {
      _id: string;
      url: string;
    };
  };

  collection?: {
    _id: string;
    title: string;
  };
};

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/photos", {
        cache: "no-store",
      });

      const text = await response.text();

      if (!text) {
        throw new Error(
          `API returned empty response. Status: ${response.status}`
        );
      }

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          `API returned invalid JSON. Status: ${response.status}`
        );
      }

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to load photographs"
        );
      }

      setPhotos(result.photos || []);
      setCollections(result.collections || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load photographs.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setUploading(true);
    setUploadStatus("");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const response = await fetch(
        "/api/admin/photos",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();

      if (!text) {
        throw new Error(
          `API returned empty response. Status: ${response.status}`
        );
      }

      const result = JSON.parse(text);

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to upload photograph"
        );
      }

      setUploadStatus("Photograph added.");

      form.reset();

      await loadContent();

      setTimeout(() => {
        setShowAddForm(false);
        setUploadStatus("");
      }, 700);
    } catch (err) {
      console.error(err);

      setUploadStatus(
        "Unable to upload photograph."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="page">
      <header>
        <div>
          <Link
            href="/admin"
            className="brand"
          >
            photoJan
          </Link>

          <div className="label">
            CONTENT EDITOR
          </div>
        </div>

        <Link
          href="/admin"
          className="back"
        >
          ← EDITOR
        </Link>
      </header>

      <section className="intro">
        <div className="number">
          01
        </div>

        <h1>
          Photographs
        </h1>

        <div className="intro-bottom">
          <p>
            Add, edit and organise photographs.
          </p>

          <button
            type="button"
            onClick={() => {
              setShowAddForm(true);
              setUploadStatus("");
            }}
          >
            + ADD PHOTOGRAPH
          </button>
        </div>
      </section>

      {showAddForm && (
        <section className="add-form">
          <div className="form-header">
            <h2>
              New photograph
            </h2>

            <button
              type="button"
              className="close"
              onClick={() => {
                setShowAddForm(false);
                setUploadStatus("");
              }}
            >
              CLOSE
            </button>
          </div>

          <form onSubmit={handleUpload}>
            <label>
              TITLE

              <input
                name="title"
                type="text"
                required
              />
            </label>

            <label>
              ALT TEXT

              <input
                name="alt"
                type="text"
                placeholder="Describe the photograph"
              />
            </label>

            <label>
              COLLECTION

              <select
                name="collectionId"
                required
                defaultValue=""
              >
                <option
                  value=""
                  disabled
                >
                  Select collection
                </option>

                {collections.map(
                  (collection) => (
                    <option
                      key={collection._id}
                      value={collection._id}
                    >
                      {collection.title}
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              PHOTOGRAPH

              <input
                name="image"
                type="file"
                accept="image/*"
                required
              />
            </label>

            <button
              type="submit"
              disabled={uploading}
              className="publish"
            >
              {uploading
                ? "UPLOADING..."
                : "PUBLISH PHOTOGRAPH"}
            </button>

            {uploadStatus && (
              <div className="upload-status">
                {uploadStatus}
              </div>
            )}
          </form>
        </section>
      )}

      <section className="summary">
        <div>
          <span>
            PHOTOGRAPHS
          </span>

          <strong>
            {photos.length}
          </strong>
        </div>

        <div>
          <span>
            COLLECTIONS
          </span>

          <strong>
            {collections.length}
          </strong>
        </div>
      </section>

      {loading && (
        <div className="message">
          Loading photographs...
        </div>
      )}

      {error && (
        <div className="message error">
          {error}
        </div>
      )}

      {!loading &&
        !error && (
          <section className="photo-list">
            {photos.map(
              (photo, index) => (
                <article
                  className="photo-row"
                  key={photo._id}
                >
                  <div className="index">
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </div>

                  <div className="thumb">
                    {photo.image?.asset?.url ? (
                      <img
                        src={
                          photo.image
                            .asset.url
                        }
                        alt={
                          photo.title ||
                          "Photograph"
                        }
                      />
                    ) : (
                      <div className="no-image">
                        NO IMAGE
                      </div>
                    )}
                  </div>

                  <div className="details">
                    <div className="collection">
                      {photo.collection
                        ?.title ||
                        "UNASSIGNED"}
                    </div>

                    <h2>
                      {photo.title ||
                        "Untitled"}
                    </h2>
                  </div>

                  <button
                    type="button"
                    className="edit"
                  >
                    EDIT →
                  </button>
                </article>
              )
            )}
          </section>
        )}

      <style>{`
        .page {
          min-height: 100vh;
          background: #f3f3ef;
          color: #111;
          padding: 32px clamp(22px, 5vw, 80px) 100px;
          font-family: Inter, system-ui, sans-serif;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 38px;
          border-bottom: 1px solid #d2d2cc;
        }

        .brand {
          display: block;
          margin-bottom: 7px;
          color: #111;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.14em;
        }

        .label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #888;
        }

        .back {
          color: #111;
          text-decoration: none;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .intro {
          padding: clamp(65px, 9vw, 125px) 0 70px;
        }

        .number {
          margin-bottom: 28px;
          font-size: 11px;
          color: #999;
        }

        h1 {
          margin: 0;
          font-size: clamp(70px, 13vw, 190px);
          line-height: 0.78;
          letter-spacing: -0.075em;
          font-weight: 900;
        }

        .intro-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          margin-top: 60px;
        }

        .intro-bottom p {
          margin: 0;
          max-width: 360px;
          font-size: 20px;
          line-height: 1.45;
          color: #666;
        }

        .intro-bottom button {
          border: 0;
          background: #111;
          color: #fff;
          padding: 16px 22px;
          font: inherit;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.11em;
          cursor: pointer;
        }

        .add-form {
          padding: 50px 0;
          border-top: 1px solid #d2d2cc;
        }

        .form-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 35px;
        }

        .form-header h2 {
          margin: 0;
          font-size: 36px;
          letter-spacing: -0.04em;
        }

        .close {
          border: 0;
          background: transparent;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          cursor: pointer;
        }

        .add-form form {
          display: grid;
          gap: 22px;
          max-width: 700px;
        }

        .add-form label {
          display: grid;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .add-form input,
        .add-form select {
          width: 100%;
          box-sizing: border-box;
          padding: 14px;
          border: 1px solid #c8c8c2;
          background: #fff;
          color: #111;
          font: inherit;
        }

        .publish {
          justify-self: start;
          border: 0;
          background: #111;
          color: #fff;
          padding: 15px 22px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          cursor: pointer;
        }

        .publish:disabled {
          opacity: 0.45;
          cursor: wait;
        }

        .upload-status {
          font-size: 14px;
          color: #666;
        }

        .summary {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid #d2d2cc;
          border-bottom: 1px solid #d2d2cc;
        }

        .summary > div {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 25px 0;
        }

        .summary > div:first-child {
          padding-right: 40px;
          border-right: 1px solid #d2d2cc;
        }

        .summary > div:last-child {
          padding-left: 40px;
        }

        .summary span {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #888;
        }

        .summary strong {
          font-size: 30px;
          letter-spacing: -0.04em;
        }

        .message {
          padding: 50px 0;
          font-size: 16px;
          color: #666;
        }

        .message.error {
          color: #9b1c1c;
        }

        .photo-list {
          border-bottom: 1px solid #d2d2cc;
        }

        .photo-row {
          display: grid;
          grid-template-columns: 50px 150px 1fr auto;
          align-items: center;
          gap: 30px;
          padding: 25px 0;
          border-bottom: 1px solid #d2d2cc;
        }

        .index {
          font-size: 10px;
          color: #999;
        }

        .thumb {
          width: 150px;
          aspect-ratio: 4 / 3;
          background: #ddd;
          overflow: hidden;
        }

        .thumb img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .no-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          color: #888;
        }

        .collection {
          margin-bottom: 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #888;
        }

        .details h2 {
          margin: 0;
          font-size: clamp(21px, 2.4vw, 34px);
          letter-spacing: -0.035em;
        }

        .edit {
          border: 0;
          background: transparent;
          padding: 12px 0;
          font: inherit;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          cursor: pointer;
        }

        @media (max-width: 700px) {
          .intro-bottom {
            display: grid;
          }

          .intro-bottom button {
            justify-self: start;
          }

          .summary {
            grid-template-columns: 1fr;
          }

          .summary > div:first-child {
            padding-right: 0;
            border-right: 0;
          }

          .summary > div:last-child {
            padding-left: 0;
            border-top: 1px solid #d2d2cc;
          }

          .photo-row {
            grid-template-columns: 35px 90px 1fr;
            gap: 16px;
          }

          .thumb {
            width: 90px;
          }

          .edit {
            grid-column: 3;
            justify-self: start;
          }
        }
      `}</style>
    </main>
  );
}