"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    let raf = 0;
    const onFrame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(onFrame);
    };

    raf = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return children;
}
