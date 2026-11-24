"use client";

import React, { createContext, useContext, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
}

interface SmoothScrollContextType {
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
  lockScroll: () => void;
  unlockScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollTo: () => {},
  lockScroll: () => {},
  unlockScroll: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const lockCountRef = useRef<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const lockScroll = useCallback(() => {
    lockCountRef.current += 1;
    if (lockCountRef.current > 0) {
      lenisRef.current?.stop();
      if (typeof document !== "undefined") {
        document.documentElement.classList.add("lenis-stopped");
      }
    }
  }, []);

  const unlockScroll = useCallback(() => {
    lockCountRef.current = Math.max(0, lockCountRef.current - 1);
    if (lockCountRef.current === 0) {
      lenisRef.current?.start();
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("lenis-stopped");
      }
    }
  }, []);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: ScrollToOptions) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.immediate ? 0 : (options?.duration ?? 1.3),
          immediate: options?.immediate ?? false,
        });
      } else if (typeof target === "number") {
        if (typeof window !== "undefined") {
          window.scrollTo({
            top: target,
            behavior: options?.immediate ? "auto" : "smooth",
          });
        }
      } else if (typeof target === "string" && target.startsWith("#")) {
        if (typeof document !== "undefined") {
          const el = document.querySelector(target);
          el?.scrollIntoView({ behavior: options?.immediate ? "auto" : "smooth" });
        }
      }
    },
    []
  );

  // Next.js App Router navigation reset / hash navigation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => {
        scrollTo(hash, { duration: 1.3 });
      });
    } else {
      scrollTo(0, { immediate: true });
    }
  }, [pathname, scrollTo]);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, lockScroll, unlockScroll }}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </SmoothScrollContext.Provider>
  );
}
