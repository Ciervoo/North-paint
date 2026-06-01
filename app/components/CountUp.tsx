"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function CountUp({ end, suffix = "" }: { end: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numeric = parseFloat(end.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) { setDisplay(end); return; }
    const prefix = end.replace(/[0-9.]+.*/, "");
    const postfix = end.replace(/^[^0-9]*[0-9.]+/, "");
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = numeric / (duration / step);
    const timer = setInterval(() => {
      start = Math.min(start + increment, numeric);
      setDisplay(prefix + (Number.isInteger(numeric) ? Math.round(start) : start.toFixed(1)) + postfix);
      if (start >= numeric) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return <span ref={ref}>{display}{suffix}</span>;
}
