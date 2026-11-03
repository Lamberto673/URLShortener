"use client";
import shorten from "@/lib/action/shorten";
import gsap from "gsap";
import { Check, Copy } from "lucide-react";
import Link from "next/link";
import React, { useLayoutEffect, useRef, useState } from "react";
import SubmitButton from "./SubmitButton";

const InputURL = ({ tokens }: { tokens: string }) => {
  const [url, setUrl] = useState("");
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    original: string;
    short: string;
  } | null>(null);
  const resultRow = useRef<HTMLDivElement>(null);

  // The long amber bar collapses to the left and leaves the short link behind it.
  useLayoutEffect(() => {
    if (!resultRow.current) return;
    const motion = gsap.matchMedia(resultRow);
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline()
        .from(resultRow.current, {
          height: 0,
          duration: 0.35,
          ease: "power3.out",
        })
        .fromTo(
          "[data-long-bar]",
          { autoAlpha: 1, scaleX: 1 },
          { scaleX: 0, duration: 0.75, ease: "expo.inOut" },
          0.1,
        )
        .set("[data-long-bar]", { autoAlpha: 0 })
        .from(
          "[data-short-link]",
          {
            clipPath: "inset(0% 100% 0% 0%)",
            duration: 0.6,
            ease: "expo.out",
            clearProps: "clipPath",
          },
          0.45,
        )
        .fromTo(
          "[data-copy]",
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power3.out" },
          0.7,
        );
    });
    return () => motion.revert();
  }, [result]);

  const copies = async (links: string) => {
    try {
      await navigator.clipboard.writeText(links);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the icon stays on Copy and the link can still be selected by hand.
      setCopied(false);
    }
  };
  return (
    <div className="w-full max-w-200 overflow-hidden rounded-lg shadow-[0_24px_48px_-16px_rgb(23_37_84/0.55)]">
      <form
        action={async (formdata: FormData) => {
          const original = formdata.get("name") as string;
          setFailed(false);
          setCopied(false);
          try {
            const responds = await shorten(original, tokens);
            setResult({ original, short: responds.short });
          } catch {
            setResult(null);
            setFailed(true);
          }
        }}
        className="noise flex flex-col gap-3 p-6 sm:flex-row sm:p-10"
      >
        <input
          name="name"
          id="url"
          type="url"
          required
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          aria-label="URL to shorten"
          placeholder="https://google.com"
          className="h-14 w-full min-w-0 sm:flex-1 rounded-lg bg-white px-4 text-lg text-blue-950 placeholder:text-blue-900/80"
        />
        <SubmitButton
          label="Shorten"
          pendingLabel="Shortening..."
          className="sm:w-44"
        />
      </form>
      <div aria-live="polite">
        {failed && (
          <p className="bg-blue-950 px-6 py-4 text-amber-200 sm:px-10">
            Couldn&apos;t shorten that link. Check the URL and try again. If it
            keeps failing, log in again.
          </p>
        )}
        {result && (
          <div
            ref={resultRow}
            className="relative flex items-center gap-4 overflow-hidden bg-blue-100 px-6 py-4 sm:px-10"
          >
            <div
              data-long-bar
              aria-hidden
              className="invisible absolute inset-0 z-10 origin-left bg-amber-400"
            />
            <div data-short-link className="min-w-0 flex-1">
              <Link
                target="_blank"
                href={result.original}
                className="block break-all font-mono sm:text-lg font-semibold text-blue-900 underline decoration-amber-500 decoration-2 underline-offset-4"
              >
                {result.short}
              </Link>
              <p className="mt-1 truncate text-sm text-blue-900">
                {result.original}
              </p>
            </div>
            {/* GSAP animates this wrapper because the button's CSS transition would fight it. */}
            <div data-copy className="shrink-0">
              <button
                type="button"
                onClick={() => copies(result.short)}
                aria-label={copied ? "Copied" : "Copy short link"}
                className="flex size-12 cursor-pointer items-center justify-center rounded-lg bg-blue-900 text-white transition-all duration-200 ease-out hover:translate-y-0.5 hover:bg-blue-800"
              >
                {copied ? <Check className="text-amber-300" /> : <Copy />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputURL;
