import { SDKProvider } from "@tma.js/sdk-react";
import { type FC } from "react";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import React from "react";
import { BrowserRouter } from "react-router-dom";

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

const Inner: FC = () => {
  return (
    <SDKProvider acceptCustomStyles>
      <React.StrictMode>
        <ErrorBoundary fallback={ErrorBoundaryError}>
          <BrowserRouter>
            <App />
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
