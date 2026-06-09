"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as Fathom from "fathom-client";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      Fathom.load("TUODWMRV", {
        includedDomains: ["studio.hanaoka.co"],
      });
    }
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      Fathom.trackPageview();
    }
  }, [pathname, searchParams]);

  return null;
}
