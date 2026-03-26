"use client";

import { useState } from "react";

const EXAMPLE_PHRASES = [
  "I'm fine.",
  "We need to talk.",
  "Do whatever you want.",
  "Nothing.",
  "Maybe.",
  "Forget it.",
  "You decide.",
  "It's fine.",
  "Whatever.",
  "Sure, go ahead.",
];

export default function Home() {
  const [input, setInput] = useState("");
  const [translation, setTranslation] = useState<string | null>(null);
  const [matchedPhrase, setMatchedPhrase] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleTranslate(text?: string) {
    const toTranslate = text ?? input;
    if (!toTranslate.trim()) return;

    setLoading(true);
    setError(null);
    setTranslation(null);
    setMatchedPhrase(null);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: toTranslate }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong");
        return;
      }

      const data = await res.json() as { translation: string; matched: boolean; matchedPhrase?: string };
      setTranslation(data.translation);
      setMatchedPhrase(data.matchedPhrase ?? null);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleExample(phrase: string) {
    setInput(phrase);
    handleTranslate(phrase);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-950 to-purple-950 flex flex-col items-center px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">
          <span>💬</span>
          <span className="mx-2">→</span>
          <span>🎯</span>
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
          She Said What?
        </h1>
        <p className="text-pink-300 text-lg max-w-md mx-auto">
          Real translations of what women say — decoded for men.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
        {/* Input Area */}
        <div className="mb-4">
          <label className="block text-pink-200 text-sm font-medium mb-2 uppercase tracking-widest">
            What she said
          </label>
          <textarea
            className="w-full bg-white/10 text-white placeholder-white/30 border border-white/20 rounded-2xl p-4 text-base resize-none focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
            rows={3}
            placeholder={`e.g. "I'm fine." or "Do whatever you want."`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleTranslate();
              }
            }}
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-white/30 text-xs">{input.length}/500</span>
            <span className="text-white/30 text-xs">Press Enter to translate</span>
          </div>
        </div>

        {/* Translate Button */}
        <button
          onClick={() => handleTranslate()}
          disabled={loading || !input.trim()}
          className="w-full py-3 rounded-2xl font-semibold text-white text-base transition-all duration-200
            bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400
            disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-pink-500/30 active:scale-[0.99]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Translating...
            </span>
          ) : (
            "Translate"
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Translation Result */}
        {translation && (
          <div className="mt-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="p-5 bg-gradient-to-br from-pink-500/20 to-rose-500/10 border border-pink-400/30 rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="text-2xl mt-0.5">
                  <span>🔍</span>
                </div>
                <div className="flex-1">
                  <div className="text-pink-200 text-xs font-semibold uppercase tracking-widest mb-2">
                    What she actually means
                  </div>
                  {matchedPhrase && (
                    <div className="text-white/40 text-xs italic mb-3">
                      Matched: &quot;{matchedPhrase}&quot;
                    </div>
                  )}
                  <p className="text-white text-base leading-relaxed font-medium">
                    {translation}
                  </p>
                </div>
              </div>
            </div>

            {/* Survival tip */}
            <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-xl flex items-start gap-2">
              <span className="text-yellow-400 text-sm mt-0.5">
                <span>⚡</span>
              </span>
              <p className="text-yellow-200/80 text-xs leading-relaxed">
                <strong className="text-yellow-300">Survival tip:</strong> Acknowledge her feelings first, ask a follow-up question, and whatever you do — don&apos;t say &quot;calm down&quot;.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Example Phrases */}
      <div className="w-full max-w-2xl mt-8">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-4">
          Try a classic phrase
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLE_PHRASES.map((phrase) => (
            <button
              key={phrase}
              onClick={() => handleExample(phrase)}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-400/40 rounded-full text-white/60 hover:text-white text-sm transition-all duration-150"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex flex-col items-center gap-4">
        {/* Social Links */}
        <div className="flex items-center gap-4">
          {/* X (Twitter) */}
          <a
            href="https://x.com/rlakhnyuk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/80 transition-colors duration-150"
            aria-label="X (Twitter)"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/rlakhnyuk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/80 transition-colors duration-150"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
          {/* Buy Me a Coffee */}
          <a
            href="https://buymeacoffee.com/lakhnyuk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/20 hover:border-yellow-400/40 rounded-full text-yellow-300/70 hover:text-yellow-300 text-xs font-medium transition-all duration-150"
            aria-label="Buy Me a Coffee"
          >
            <span>☕</span>
            <span>Buy me a coffee</span>
          </a>
        </div>

        <p className="text-white/20 text-xs text-center max-w-sm">
          For entertainment purposes only. Real relationships require actual communication.
        </p>
      </div>
    </main>
  );
}
