"use client";

import React from "react";

const GlobalErrorBoundary = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <html lang="en">
      <body style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Application Error</h1>
        <p>{error.message}</p>
        <button onClick={reset}>Reload</button>
      </body>
    </html>
  );
};

export default GlobalErrorBoundary;
