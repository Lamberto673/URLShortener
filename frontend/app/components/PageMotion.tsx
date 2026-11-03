"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ARRIVE = "expo.out";
const MORPH = "power3.inOut";
const DIAMOND = { rotation: 45, scale: 0.72, duration: 0.7, ease: MORPH };
const SQUARE = { rotation: 0, scale: 1, duration: 0.7, ease: MORPH };

const heroIntro = () => {
  gsap
    .timeline()
    .from("[data-rail]", { scaleY: 0, duration: 1.2, ease: ARRIVE })
    .fromTo(
      "[data-block]",
      { autoAlpha: 1, yPercent: 110 },
      { autoAlpha: 1, yPercent: 0, duration: 0.9, ease: ARRIVE, stagger: 0.07 },
      0.1,
    )
    .fromTo(
      "[data-hero-line]",
      { yPercent: 35, clipPath: "inset(0% 0% 100% 0%)" },
      {
        yPercent: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: ARRIVE,
        stagger: 0.14,
        clearProps: "clipPath",
      },
      0.25,
    );
};

// Runs only while the hero is on screen.
const heroIdle = () => {
  const morphs = gsap.utils.toArray<HTMLElement>("[data-morph]");
  const idle = gsap.timeline({ repeat: -1, paused: true });
  idle
    .to(morphs[0], DIAMOND, 2)
    .to(morphs[1], DIAMOND, 3.2)
    .to(morphs[0], SQUARE, 4.4)
    .to(morphs[2], DIAMOND, 5.6)
    .to(morphs[1], SQUARE, 5.6)
    .to(morphs[2], SQUARE, 7);
  gsap.to("[data-bob]", {
    y: 6,
    duration: 0.9,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
  ScrollTrigger.create({
    trigger: "[data-hero]",
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? idle.play() : idle.pause()),
    onRefresh: (self) => {
      if (self.isActive) idle.play();
    },
  });
};

// Full bars at the start of the scroll, the stepped lengths by the end: scrolling shortens the link.
const shortenOnScroll = () => {
  gsap.utils.toArray<HTMLElement>("[data-scrub-band]").forEach((band) => {
    const rows = gsap.utils.toArray<HTMLElement>(band.children);
    gsap.fromTo(
      rows,
      { scaleX: (_, row: HTMLElement) => band.offsetWidth / row.offsetWidth },
      {
        scaleX: 1,
        ease: "none",
        stagger: 0.05,
        transformOrigin: band.dataset.scrubBand === "right" ? "right" : "left",
        scrollTrigger: {
          trigger: band,
          start: "top bottom",
          end: "top 40%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      },
    );
  });
};

const huffmanLines = () => {
  SplitText.create("[data-split-lines]", {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.lines, {
        yPercent: 110,
        duration: 0.9,
        ease: ARRIVE,
        stagger: 0.06,
        scrollTrigger: {
          trigger: "[data-split-lines]",
          start: "top 80%",
          once: true,
        },
      }),
  });
};

const footerRise = () => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "[data-footer]",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.6,
      },
    })
    .from("[data-footer-band]", {
      scaleX: 0,
      ease: "none",
      stagger: 0.08,
      transformOrigin: (index: number) => (index % 2 ? "right" : "left"),
    })
    .from("[data-footer-word]", { yPercent: 100, ease: "none" }, 0.2);
};

const PageMotion = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const motion = gsap.matchMedia(root);
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      heroIntro();
      heroIdle();
      shortenOnScroll();
      huffmanLines();
      footerRise();
    });

    // Streamed sections and the shorten result change the page height.
    let refresh: gsap.core.Tween | undefined;
    const observer = new ResizeObserver(() => {
      refresh?.kill();
      refresh = gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
    });
    if (root.current) observer.observe(root.current);

    return () => {
      refresh?.kill();
      observer.disconnect();
      motion.revert();
    };
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
};

export default PageMotion;
