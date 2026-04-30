"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    eruda?: { init: () => void };
  }
}

export function MobileConsole() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (typeof window === "undefined") return;
    if (window.eruda) return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/eruda";
    script.async = true;
    script.onload = () => {
      window.eruda?.init();
    };
    document.body.appendChild(script);
  }, []);

  return null;
}
