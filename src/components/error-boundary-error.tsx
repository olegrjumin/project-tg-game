import { FC } from "react";

export const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
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
