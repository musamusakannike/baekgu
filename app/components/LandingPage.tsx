"use client";

import { forwardRef, useEffect, useMemo, useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Crown,
  Network,
  PawPrint,
  Send,
  Shield,
  Timer,
  Twitter,
  Vault,
} from "lucide-react";
import Countdown from "./Countdown";

gsap.registerPlugin(ScrollTrigger);

const TELEGRAM_URL = "https://t.me/baekgusolana";
const TWITTER_URL = "https://x.com/baekgusolana";

export default function LandingPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const mountainsRef = useRef<HTMLDivElement | null>(null);
  const circuitRef = useRef<SVGSVGElement | null>(null);
  const dogRef = useRef<HTMLDivElement | null>(null);
  const journeyRef = useRef<SVGSVGElement | null>(null);
  const vaultRef = useRef<HTMLDivElement | null>(null);

  const launchIsoUtc = useMemo(() => "2026-03-01T00:00:00.000Z", []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (heroRef.current && mountainsRef.current) {
        gsap.to(mountainsRef.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (heroRef.current && dogRef.current) {
        gsap.to(dogRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (circuitRef.current) {
        const paths = circuitRef.current.querySelectorAll(".circuit-path");
        paths.forEach((p, i) => {
          const length = (p as SVGPathElement).getTotalLength?.() ?? 1000;
          gsap.set(p, {
            strokeDasharray: `${Math.max(120, length * 0.18)} ${length}`,
            strokeDashoffset: length,
          });

          gsap.to(p, {
            strokeDashoffset: 0,
            duration: 2.4,
            ease: "none",
            repeat: -1,
            delay: i * 0.4,
          });
        });
      }

      if (journeyRef.current) {
        const line = journeyRef.current.querySelector(
          ".journey-line"
        ) as SVGPathElement | null;
        if (line) {
          const length = line.getTotalLength();
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: journeyRef.current,
              start: "top 80%",
            },
          });
        }
      }

      if (vaultRef.current) {
        gsap.to(vaultRef.current, {
          rotate: 1.4,
          duration: 0.12,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-(--midnight) text-white">
      <Header />

      <section
        ref={heroRef}
        className="relative isolate overflow-hidden pt-24 sm:pt-28"
      >
        <div
          ref={mountainsRef}
          className="pointer-events-none absolute inset-0 -z-20"
        >
          <Image
            src="/mountains.svg"
            alt="Cyber-sunset mountains"
            fill
            priority
            className="object-cover opacity-90"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <CircuitSvg ref={circuitRef} />
        </div>

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_20%_20%,rgba(153,69,255,0.22),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(20,241,149,0.18),transparent_55%),radial-gradient(800px_circle_at_50%_90%,rgba(255,126,103,0.18),transparent_55%)]" />

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-20 sm:pb-28 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white/80 backdrop-blur-sm">
              <Timer className="h-4 w-4 text-[color:var(--cyan)]" />
              MARCH 1 — STRICT LAUNCH
            </div>

            <h1 className="mt-5 font-[family:var(--font-display)] text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-[color:var(--gold)] drop-shadow-[0_0_26px_rgba(255,215,0,0.22)]">
                The Alpha Returns.
              </span>{" "}
              The 300km Journey Ends Here.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              No confusion. No early drop. Just loyalty. Join the pack before
              Baekgu time arrives.
            </p>

            <div className="mt-8">
              <Countdown targetIsoUtc={launchIsoUtc} />
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--gold)] px-6 py-4 text-sm font-extrabold tracking-wide text-black shadow-[0_0_34px_rgba(255,215,0,0.25)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="h-5 w-5" />
                Join the Pack (Telegram)
                <span className="ml-1 text-black/60 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>

              <div className="text-xs font-semibold tracking-[0.22em] text-white/50">
                @baekgusolana
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              ref={dogRef}
              className="relative mx-auto aspect-[4/3] max-w-xl"
            >
              <div className="absolute -inset-6 rounded-[38px] bg-[radial-gradient(closest-side,rgba(20,241,149,0.18),transparent_70%),radial-gradient(closest-side,rgba(153,69,255,0.18),transparent_70%)] blur-2xl" />

              <div className="relative h-full w-full overflow-hidden rounded-[34px] border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,126,103,0.18),transparent_45%),linear-gradient(45deg,rgba(153,69,255,0.14),transparent_55%)]" />

                <div className="relative flex h-full w-full items-center justify-center p-10">
                  <Image
                    src="/jindo.svg"
                    alt="Baekgu — heroic Jindo dog"
                    width={520}
                    height={390}
                    className="h-auto w-full max-w-[520px] drop-shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
                    priority
                  />
                </div>

                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--cyan)] shadow-[0_0_14px_rgba(20,241,149,0.55)]" />
                  THE TRUE ALPHA OF DOG COINS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="legend" className="relative py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-[family:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
              The Legend
            </h2>
            <p className="mt-4 text-base leading-7 text-white/75">
              Baekgu wasn’t a meme. He was real — a Korean Jindo who crossed
              roughly 300km to return home. No hype. No shortcuts. Just
              relentless loyalty.
            </p>
            <p className="mt-4 text-base leading-7 text-white/75">
              $BAEK is that same energy in crypto: decentralization that
              outlasts centralized failures. When platforms go dark, the pack
              keeps moving.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-xl bg-[color:var(--purple)]/20 p-2">
                  <PawPrint className="h-5 w-5 text-[color:var(--gold)]" />
                </div>
                <div>
                  <div className="text-sm font-bold tracking-wide text-white">
                    The Pack Rule
                  </div>
                  <div className="mt-1 text-sm leading-6 text-white/70">
                    We don’t chase noise. We walk the distance — together.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[34px] bg-[radial-gradient(closest-side,rgba(20,241,149,0.14),transparent_68%),radial-gradient(closest-side,rgba(153,69,255,0.14),transparent_68%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-xs font-semibold tracking-[0.22em] text-white/60">
                JOURNEY MAP — 300KM
              </div>
              <JourneySvg ref={journeyRef} />
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-semibold tracking-[0.18em] text-white/55">
                <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  POINT A
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-right">
                  POINT B
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pack" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-[family:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            Why $BAEK?
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/75">
            Three principles. One pack. Built to outlast.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <GlowCard
              icon={<Shield className="h-6 w-6" />}
              title="Unshakable Loyalty"
              copy="Built on the strongest narrative in crypto. We don’t fold."
            />
            <GlowCard
              icon={<Network className="h-6 w-6" />}
              title="True Decentralization"
              copy="When Web2 platforms go dark, the pack survives on Solana."
            />
            <GlowCard
              icon={<Crown className="h-6 w-6" />}
              title="The New Alpha"
              copy="Move over, standard dog coins. Baekgu is here to lead."
            />
          </div>
        </div>
      </section>

      <section id="tokenomics" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-[family:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
                Tokenomics
              </h2>
              <p className="mt-4 text-base leading-7 text-white/75">
                Simple. Clean. Pack-friendly.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3">
                <TokenPill text="0% Buy/Sell Tax" />
                <TokenPill text="LP Burned" />
                <TokenPill text="Contract Renounced" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[34px] bg-[radial-gradient(closest-side,rgba(255,215,0,0.14),transparent_65%),radial-gradient(closest-side,rgba(20,241,149,0.12),transparent_65%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="text-xs font-semibold tracking-[0.22em] text-white/60">
                  VAULT LOCKS UNTIL MARCH 1
                </div>

                <div
                  ref={vaultRef}
                  className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-6 py-6"
                >
                  <div className="rounded-2xl bg-[color:var(--gold)]/15 p-3">
                    <Vault className="h-9 w-9 text-[color:var(--gold)]" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold tracking-tight">
                      Locked
                    </div>
                    <div className="mt-1 text-sm text-white/65">
                      Opens exactly at 00:00 UTC.
                    </div>
                  </div>
                </div>

                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm font-bold tracking-wide text-white/90 transition-colors hover:bg-white/10"
                >
                  Get launch alerts
                  <Send className="h-4 w-4 text-[color:var(--cyan)]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-semibold tracking-wide text-white/60">
            © 2026 Baekgu ($BAEK). The Pack Survives.
          </div>

          <div className="flex items-center gap-4">
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold tracking-wide text-white/75 transition-colors hover:bg-white/10"
            >
              <Twitter className="h-4 w-4 text-[color:var(--cyan)]" />
              X
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold tracking-wide text-white/75 transition-colors hover:bg-white/10"
            >
              <Send className="h-4 w-4 text-[color:var(--purple)]" />
              Telegram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Header() {
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md">
          <a
            href="#"
            className="inline-flex items-center gap-2 font-[family:var(--font-display)] text-base tracking-[0.14em] text-[color:var(--gold)]"
          >
            <PawPrint className="h-5 w-5" />
            BAEKGU
          </a>

          <nav className="hidden items-center gap-6 text-xs font-semibold tracking-[0.22em] text-white/70 md:flex">
            <a className="hover:text-white" href="#legend">
              THE LEGEND
            </a>
            <a className="hover:text-white" href="#pack">
              THE PACK
            </a>
            <a className="hover:text-white" href="#tokenomics">
              TOKENOMICS
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/75 transition-colors hover:bg-white/10"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/75 transition-colors hover:bg-white/10"
            >
              <Send className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlowCard({
  icon,
  title,
  copy,
}: {
  icon: ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-white/20">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-10 bg-[radial-gradient(closest-side,rgba(20,241,149,0.22),transparent_70%),radial-gradient(closest-side,rgba(153,69,255,0.22),transparent_70%)]" />
      </div>

      <div className="relative">
        <div className="inline-flex rounded-xl bg-[color:var(--purple)]/15 p-2 text-[color:var(--cyan)]">
          {icon}
        </div>
        <div className="mt-4 text-lg font-extrabold tracking-tight text-white">
          {title}
        </div>
        <div className="mt-2 text-sm leading-6 text-white/70">{copy}</div>
      </div>
    </div>
  );
}

function TokenPill({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-bold tracking-wide text-white/85 backdrop-blur-sm">
      {text}
      <span className="ml-3 h-2 w-2 rounded-full bg-[color:var(--cyan)] shadow-[0_0_16px_rgba(20,241,149,0.55)]" />
    </div>
  );
}

const CircuitSvg = forwardRef<SVGSVGElement>(function CircuitSvg(_, ref) {
  return (
    <svg
      ref={ref}
      className="h-full w-full"
      viewBox="0 0 1200 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="c"
          x1="0"
          y1="0"
          x2="1200"
          y2="700"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#14F195" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#9945FF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#14F195" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g
        opacity="0.9"
        stroke="url(#c)"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path
          className="circuit-path"
          d="M80 560H320C356 560 370 542 390 520L520 380C548 352 568 340 610 340H820"
        />
        <path
          className="circuit-path"
          d="M160 120H360C410 120 434 146 460 175L560 286C586 315 610 330 650 330H980"
        />
        <path className="circuit-path" d="M240 640V470C240 420 260 395 304 370L420 305" />
        <path className="circuit-path" d="M960 70V240C960 292 940 316 896 345L770 420" />
        <path className="circuit-path" d="M520 620H820C870 620 898 598 930 566L1100 400" />
        <circle cx="80" cy="560" r="6" fill="#14F195" />
        <circle cx="240" cy="640" r="6" fill="#9945FF" />
        <circle cx="960" cy="70" r="6" fill="#14F195" />
        <circle cx="1100" cy="400" r="6" fill="#9945FF" />
      </g>
    </svg>
  );
});

const JourneySvg = forwardRef<SVGSVGElement>(function JourneySvg(_, ref) {
  return (
    <svg
      ref={ref}
      className="mt-6 h-[240px] w-full"
      viewBox="0 0 640 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="j"
          x1="0"
          y1="0"
          x2="640"
          y2="240"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#14F195" />
          <stop offset="0.55" stopColor="#9945FF" />
          <stop offset="1" stopColor="#FFD700" />
        </linearGradient>
      </defs>

      <path
        d="M38 206C86 162 118 168 160 128C206 84 240 76 286 102C330 126 350 154 394 146C436 138 470 110 516 90C558 72 592 82 610 54"
        stroke="url(#j)"
        strokeWidth="4"
        strokeLinecap="round"
        className="journey-line"
      />

      <g opacity="0.9">
        <circle cx="38" cy="206" r="7" fill="#FFD700" />
        <circle cx="610" cy="54" r="7" fill="#14F195" />
      </g>

      <g opacity="0.5" fill="#fff">
        <circle cx="120" cy="170" r="2" />
        <circle cx="160" cy="132" r="2" />
        <circle cx="212" cy="90" r="2" />
        <circle cx="286" cy="106" r="2" />
        <circle cx="394" cy="150" r="2" />
        <circle cx="470" cy="112" r="2" />
        <circle cx="520" cy="92" r="2" />
      </g>
    </svg>
  );
});
