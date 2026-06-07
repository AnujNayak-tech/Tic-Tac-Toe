type AnujErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type AnujEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: AnujErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __anujEvents?: AnujEvents;
  }
}

export function reportAnujError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__anujEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
