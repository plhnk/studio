"use client";
import { useEffect } from "react";
import Router from "next/router";
import * as Fathom from "fathom-client";

export default function Analytics() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      Fathom.load("TUODWMRV", {
        includedDomains: ["studio.hanaoka.co"],
      });

      const onRouteChangeComplete = () => {
        Fathom.trackPageview();
      };
      Router.events.on("routeChangeComplete", onRouteChangeComplete);

      return () => {
        Router.events.off("routeChangeComplete", onRouteChangeComplete);
      };
    }
  }, []);
  return null;
}
