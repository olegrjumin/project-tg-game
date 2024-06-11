import { SDKProvider, useLaunchParams } from "@tma.js/sdk-react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import React, { useEffect, type FC } from "react";
import App from "./App";
import { ErrorBoundary } from "./components/error-boundary";
import { ErrorBoundaryError } from "./components/error-boundary-error";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === "debug";

  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <React.StrictMode>
      <SDKProvider acceptCustomStyles debug={debug}>
        <ConvexProvider client={convex}>
          <App />
        </ConvexProvider>
      </SDKProvider>
    </React.StrictMode>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);
