import { SDKProvider, useLaunchParams } from "@tma.js/sdk-react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import React, { useEffect, type FC } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ErrorBoundary } from "./components/error-boundary";

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === "debug";

  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <SDKProvider acceptCustomStyles>
      <React.StrictMode>
        <ErrorBoundary fallback={ErrorBoundaryError}>
          <BrowserRouter>
            <ConvexProvider client={convex}>
              <App />
            </ConvexProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    </SDKProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);
