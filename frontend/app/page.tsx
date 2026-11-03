import Navbar from "./components/Navbar";
import TechText from "../components/TechText";
import { cookies } from "next/headers";
import InputURL from "./components/InputURL";
import StepBand from "./components/StepBand";
import HeroBlocks from "./components/HeroBlocks";
import PageMotion from "./components/PageMotion";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { ArrowDown } from "lucide-react";

async function ShortenerSection() {
  const store = (await cookies()).get("token")?.value;
  if (!store) redirect("/login");
  return <InputURL tokens={store} />;
}
async function NavbarSection() {
  const store = await cookies();
  const username = store.get("username")?.value;
  return <Navbar username={username} />;
}
export default function app() {
  return (
    <PageMotion className="min-h-screen bg-blue-50 w-full flex flex-col">
      <div className="w-full bg-blue-950 h-14 flex justify-center items-stretch divide-x divide-white/15 border-b border-white/15 font-bold sm:text-lg">
        <p className="flex items-center px-4 sm:px-8 text-amber-200">
          Url Shortener
        </p>
        <p className="flex items-center px-4 sm:px-8 text-blue-50">
          Try it for free!!!
        </p>
      </div>
      <div className="sticky top-0 z-50 h-0">
        <div className="flex justify-center px-4 pt-3">
          <Suspense fallback={<div className="h-15" />}>
            <NavbarSection />
          </Suspense>
        </div>
      </div>

      {/* Hero */}
      <section
        data-hero
        className="noise relative flex flex-col items-center justify-center gap-2 min-h-[calc(100svh-12.5rem)] px-4 pt-28 pb-16 text-blue-50"
      >
        <HeroBlocks />
        <h1 className="relative w-full max-w-6xl">
          <div data-hero-line className="w-full h-24 sm:h-40">
            <TechText
              fontFamily="anime"
              text="Welcome to"
              fontWeight={600}
              fontSize={100}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              intro="none"
              introDuration={2}
              clickKick
              guides={false}
              letterSpacing={-0.05}
              accentColor="currentColor"
              reach={200}
              softness={0.7}
              lineStyle="dashed"
              strokeWidth={1.5}
              speed={1}
              bounce={0.4}
              selection
              labels
              color="currentColor"
              align="center"
              draggable
              sweep
            />
          </div>
          <div
            data-hero-line
            className="w-full h-20 sm:h-32 flex justify-end items-end text-amber-300"
          >
            <TechText
              text="URL Shortener"
              fontWeight={600}
              fontSize={80}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              intro="none"
              introDuration={2}
              clickKick
              guides={false}
              fontFamily="anime"
              letterSpacing={-0.05}
              accentColor="currentColor"
              reach={50}
              softness={0.7}
              lineStyle="dashed"
              strokeWidth={1.5}
              speed={1}
              bounce={0.4}
              selection
              labels
              color="currentColor"
              align="center"
              draggable
              sweep
            />
          </div>
        </h1>
        <a
          href="#inserts"
          className="relative mt-8 flex min-h-20 items-center gap-4 rounded-lg border-4 border-blue-300 bg-amber-50 px-6 py-2 text-center font-smooth text-3xl font-bold text-blue-950 shadow-[0_16px_32px_-12px_rgb(0_0_0/0.7)] transition-all duration-200 ease-out hover:translate-y-1 hover:bg-white sm:px-10 sm:text-4xl"
        >
          Go Try the Shortener
          <ArrowDown data-bob aria-hidden className="size-7 shrink-0" />
        </a>
      </section>
      <StepBand animated />
      <section
        id="inserts"
        className="scroll-mt-20 bg-blue-50 flex justify-center px-4 py-28 sm:py-40"
      >
        <Suspense
          fallback={
            <div className="h-48 w-full max-w-200 rounded-lg bg-blue-200" />
          }
        >
          <ShortenerSection />
        </Suspense>
      </section>
      <StepBand align="right" scrub />

      <section className="flex justify-center px-4 py-28 sm:py-40">
        <div className="w-full max-w-300 rounded-lg border-8 sm:border-12 border-blue-800 bg-amber-400 px-6 py-10 sm:px-16 sm:py-20 shadow-[0_32px_64px_-20px_rgb(23_37_84/0.6)]">
          <p
            data-split-lines
            className="max-w-[60ch] text-pretty text-xl sm:text-3xl font-medium leading-snug tracking-tight text-blue-950"
          >
            Huffman coding can reduce a URL&apos;s size by 30% to 50% by
            assigning shorter bit patterns to frequent characters, but it cannot
            shrink an entire address to just a few bits. Under Shannon&apos;s
            entropy limits, an average link still requires roughly 180 to 240
            bits of irreducible data to reconstruct losslessly, especially with
            random tokens and dictionary overhead involved. Services like Bitly
            achieve extreme brevity not through compression, but by saving the
            long link in a database and issuing a short, Base62 numeric pointer
            that redirects to it.
          </p>
        </div>
      </section>
      <section></section>
      <footer data-footer aria-hidden className="flex flex-col overflow-hidden">
        <div className="overflow-hidden text-center">
          <p
            data-footer-word
            className="whitespace-nowrap font-safe text-[9.5vw] leading-none text-blue-950"
          >
            Url Shortener
          </p>
        </div>
        <div data-footer-band className="h-6 sm:h-10 bg-amber-400" />
        <div data-footer-band className="h-6 sm:h-10 bg-blue-300" />
        <div data-footer-band className="h-6 sm:h-10 bg-blue-500" />
        <div data-footer-band className="h-6 sm:h-10 bg-blue-700" />
        <div data-footer-band className="h-6 sm:h-10 bg-blue-900" />
        <div data-footer-band className="h-6 sm:h-10 bg-blue-950" />
      </footer>
    </PageMotion>
  );
}
