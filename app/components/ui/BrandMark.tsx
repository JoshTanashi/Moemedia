"use client";

import { useId } from "react";

// The Moemedia wave mark, hand-built as SVG from the brand board.
// Three ribbons: green (back-left), teal (middle), cyan tail (right).
// Gradient ids are scoped with useId so several marks can coexist on a page.
export function BrandMark({ className = "" }: { className?: string }) {
  const id = useId();
  const g = (name: string) => `${name}-${id}`;

  return (
    <svg
      className={className}
      viewBox="0 0 120 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={g("green")} x1="0%" y1="100%" x2="70%" y2="0%">
          <stop offset="0%" stopColor="#2fd67f" />
          <stop offset="100%" stopColor="#3ceb8b" />
        </linearGradient>
        <linearGradient id={g("teal")} x1="0%" y1="100%" x2="80%" y2="0%">
          <stop offset="0%" stopColor="#00cfa7" />
          <stop offset="100%" stopColor="#2adfc0" />
        </linearGradient>
        <linearGradient id={g("cyan")} x1="0%" y1="0%" x2="100%" y2="60%">
          <stop offset="0%" stopColor="#00cfa7" />
          <stop offset="100%" stopColor="#00b6e6" />
        </linearGradient>
      </defs>
      <path
        className="brand-ribbon brand-ribbon--1"
        fill={`url(#${g("green")})`}
        d="M 2 80 C 14 78, 26 68, 34 54 C 41 42, 46 28, 56 18 C 60 14, 66 11, 72 11 C 64 4, 52 7, 45 17 C 37 28, 33 42, 26 54 C 20 64, 12 74, 2 80 Z"
      />
      <path
        className="brand-ribbon brand-ribbon--2"
        fill={`url(#${g("teal")})`}
        d="M 24 92 C 36 90, 48 80, 56 66 C 63 54, 68 40, 78 30 C 82 26, 88 23, 94 23 C 86 16, 74 19, 67 29 C 59 40, 55 54, 48 66 C 42 76, 34 86, 24 92 Z"
      />
      <path
        className="brand-ribbon brand-ribbon--3"
        fill={`url(#${g("cyan")})`}
        d="M 94 23 C 97 28, 98 35, 100 42 C 102 50, 108 56, 116 58 C 108 63, 98 61, 92 53 C 87 47, 85 38, 86 30 C 87 26, 90 24, 94 23 Z"
      />
    </svg>
  );
}
