"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/legal?type=impressum");
        const data = await res.json();
        if (!cancelled) {
          setContent(typeof data.content === "string" ? data.content : "");
        }
      } catch {
        if (!cancelled) setError("Fehler beim Laden");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/legal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "impressum", content }),
      });

      if (!res.ok) {
        setError("Fehler beim Speichern");
        return;
      }

      setMessage("Saved");
    } catch {
      setError("Fehler beim Speichern");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-gray-600 hover:underline">
          ← Admin Panel
        </Link>
      </div>
      <h1 className="mb-6 text-2xl font-semibold">Impressum</h1>

      {loading ? (
        <p className="text-gray-500">Lädt...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[300px] rounded border border-gray-300 px-3 py-2 font-mono text-sm"
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
            >
              {saving ? "..." : "Save"}
            </button>
            {message && <span className="text-sm text-green-600">{message}</span>}
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </form>
      )}
    </main>
  );
}
