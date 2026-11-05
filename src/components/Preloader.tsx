"use client";

import { useEffect, useState } from "react";
import { WhiskMark } from "./Logo";

const MIN_MS = 700; // keep the loader on screen long enough to feel intentional
const MAX_MS = 5000; // never block the page for longer than this

/**
 * Full screen loader shown on first paint. It is rendered by the server too, so the
 * brand shows immediately. Once the page has loaded it fades out and marks <html>
 * as "loaded", which starts the hero entrance animations.
 */
export function Preloader() {
  const [state, setState] = useState<"show" | "leaving" | "gone">("show");

  useEffect(() => {
    const started = performance.now();
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      window.setTimeout(() => {
        document.documentElement.classList.add("loaded");
        setState("leaving");
        window.setTimeout(() => setState("gone"), 600);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const fallback = window.setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(fallback);
    };
  }, []);

  if (state === "gone") return null;

  return (
    <div
      className={`preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream ${state === "leaving" ? "preloader-out" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Fun Cuisine"
    >
      <div className="preloader-mark text-tomato">
        <WhiskMark className="h-14 w-14" />
      </div>
      <p className="preloader-word mt-4 font-display text-2xl text-cocoa">Fun Cuisine</p>
      <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div className="preloader-bar h-full w-1/2 rounded-full bg-tomato" />
      </div>
    </div>
  );
}
