"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function HelloGate() {
  const router = useRouter();
  const [stage, setStage] = useState<"meme" | "passkey">("meme");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [videoOk, setVideoOk] = useState(true);
  const [imgOk, setImgOk] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Try to play with sound once; if the browser blocks unmuted autoplay, fall
  // back to a muted loop. After the first (sound) play ends, mute and loop
  // forever — until the "Hello there" text is clicked (which unmounts it).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.loop = false;
    v.play().catch(() => {
      v.muted = true;
      v.loop = true;
      v.play().catch(() => {});
    });
  }, [videoOk]);

  const onVideoEnded = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  // Clicking the meme silently requests a fresh passkey by email, then reveals
  // the input. No on-screen explanation — the owner knows to check the inbox.
  const begin = async () => {
    if (stage === "passkey") return;
    setStage("passkey");
    try {
      await fetch("/api/crm/otp", { method: "POST" });
    } catch {
      /* stay silent */
    }
  };

  useEffect(() => {
    if (stage === "passkey") inputRef.current?.focus();
  }, [stage]);

  const submit = async () => {
    if (busy || code.trim().length === 0) return;
    setBusy(true);
    setWrong(false);
    try {
      const res = await fetch("/api/crm/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      if (res.ok) {
        router.push("/crm");
        return;
      }
      throw new Error();
    } catch {
      setWrong(true);
      setCode("");
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center select-none">
      {/* Small video window — plays only until the text is clicked */}
      {stage === "meme" && videoOk && (
        <video
          ref={videoRef}
          src="/hello-there.mp4"
          playsInline
          autoPlay
          onEnded={onVideoEnded}
          onError={() => setVideoOk(false)}
          className="w-64 sm:w-80 rounded-lg mb-8 shadow-2xl"
        />
      )}
      {/* Image fallback if the video file is missing */}
      {stage === "meme" && !videoOk && imgOk && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/hello-there.jpg"
          alt=""
          onError={() => setImgOk(false)}
          className="w-64 sm:w-80 rounded-lg mb-8 opacity-90"
        />
      )}

      <button
        type="button"
        onClick={begin}
        className="group flex flex-col items-center focus:outline-none cursor-pointer"
        aria-label="Hello there"
      >
        <h1 className="font-display italic text-4xl sm:text-6xl font-bold text-paper">
          Hello there.
        </h1>
      </button>

      {stage === "passkey" && (
        <div className={`mt-12 flex items-center gap-3 ${wrong ? "shake" : ""}`}>
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            maxLength={6}
            onChange={(e) => {
              setWrong(false);
              setCode(e.target.value.replace(/\D/g, ""));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            className="w-40 text-center tracking-[0.5em] font-mono text-lg text-paper rounded-lg px-4 py-3 outline-none transition-all"
            style={{
              background: "rgba(245,240,232,0.03)",
              border: `1px solid ${wrong ? "var(--rust)" : "var(--stone-dark)"}`,
            }}
          />
          <button
            type="button"
            onClick={submit}
            disabled={busy}
            className="keypad-key shrink-0 disabled:opacity-50"
            aria-label="submit"
            style={{ width: "3.25rem", height: "3.25rem" }}
          >
            →
          </button>
        </div>
      )}
    </main>
  );
}
