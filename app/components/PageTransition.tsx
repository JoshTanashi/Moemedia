"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LEAVE_DURATION = 300;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<"enter" | "idle" | "leave">("idle");
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current === pathname) {
      setDisplayChildren(children);
      return;
    }

    setPhase("leave");
    const leaveTimer = window.setTimeout(() => {
      setDisplayChildren(children);
      prevPathname.current = pathname;
      setPhase("enter");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("idle"));
      });
    }, LEAVE_DURATION);

    return () => window.clearTimeout(leaveTimer);
  }, [pathname, children]);

  return <div className={`page-transition--${phase}`}>{displayChildren}</div>;
}
