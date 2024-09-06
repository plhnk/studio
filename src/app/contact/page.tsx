"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
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
            // "cal-text-emphasis": "#4D408D",
            // "cal-border-emphasis": "#4D408D",
            "cal-text-error": "#ff302a",
            // "cal-border": "#A090E0",
            // "cal-border-default": "#A090E0",
            "cal-border-subtle": "#F9F7F3",
            // "cal-border-booker": "#A090E0",
            "cal-text-muted": "#a79e90",
            // "cal-text-subtle": "red",
            "cal-bg-emphasis": "#e1d9c7",
            "cal-bg": "transparent",
            "cal-border-booker-width": "0px",
          },
          dark: {
            // no dark theme for now
          },
        },
      });
    })();
  }, []);
  return (
    <div className="col-span-full lg:col-span-6 lg:col-start-2 xl:col-span-8 xl:col-start-3 bg-merino-50/20 backdrop-blur-sm mt-[18vh] py-16 z-10 outline-1 outline-neutral-200 -outline-offset-1 outline flex items-center">
      <Cal
        className="w-full md:mt-16"
        namespace="30min"
        calLink="plhnk/30min"
        //   style={{ width: "100%", height: "100%", overflow: "scroll" }}
        //   config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}
