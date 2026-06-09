"use client";

import dynamic from "next/dynamic";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const Cal = dynamic(
  () => import("@calcom/embed-react").then((mod) => mod.default),
  { ssr: false }
);

export default function Contact() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#4d4641" } },
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-text": "#292421",
            "cal-text-error": "#ff302a",
            "cal-border-subtle": "#F9F7F3",
            "cal-text-muted": "#a79e90",
            "cal-bg-emphasis": "#e1d9c7",
            "cal-bg": "transparent",
            "cal-border-booker-width": "0px",
          },
          dark: {},
        },
      });
    })();
  }, []);

  return (
    <div className="col-span-full lg:col-span-6 lg:col-start-2 xl:col-span-8 xl:col-start-3 bg-merino-50/20 backdrop-blur-sm mt-32 lg:mt-64 mb-72 py-16 z-10 outline-1 outline-neutral-200 -outline-offset-1 outline flex items-center">
      <Cal
        className="w-full md:mt-16"
        namespace="30min"
        calLink="plhnk/30min"
      />
    </div>
  );
}
