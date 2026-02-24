"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

type Parts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function clampToZero(ms: number) {
  return ms < 0 ? 0 : ms;
}

function getParts(targetMs: number, nowMs: number): Parts {
  const diff = clampToZero(targetMs - nowMs);
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown({ targetIsoUtc }: { targetIsoUtc: string }) {
  const targetMs = useMemo(() => new Date(targetIsoUtc).getTime(), [targetIsoUtc]);
  const [parts, setParts] = useState<Parts>(() => getParts(targetMs, Date.now()));
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setParts(getParts(targetMs, Date.now()));
    }, 250);

    return () => clearInterval(interval);
  }, [targetMs]);

  useEffect(() => {
    if (!wrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(wrapRef.current, {
        scale: 1.05,
        duration: 0.9,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="select-none">
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        <TimeBlock label="DAYS" value={String(parts.days)} />
        <TimeBlock label="HRS" value={pad2(parts.hours)} />
        <TimeBlock label="MIN" value={pad2(parts.minutes)} />
        <TimeBlock label="SEC" value={pad2(parts.seconds)} />
      </div>
    </div>
  );
}

function TimeBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-sm sm:px-5 sm:py-6">
      <div className="text-center font-mono text-3xl leading-none tracking-tight text-[color:var(--gold)] drop-shadow-[0_0_18px_rgba(255,215,0,0.25)] sm:text-5xl">
        {value}
      </div>
      <div className="mt-2 text-center text-[11px] font-semibold tracking-[0.22em] text-white/60">
        {label}
      </div>
    </div>
  );
}
