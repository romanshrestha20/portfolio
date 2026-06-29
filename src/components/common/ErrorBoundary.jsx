import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error loading component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background-light px-6 text-text-light dark:bg-background-dark dark:text-text-dark">
          <div className="w-full max-w-3xl border-[4px] border-border-light bg-surface-light p-8 text-center shadow-sm dark:border-border-dark dark:bg-surface-dark sm:p-12">
            <p className="type-page text-primary-light dark:text-primary-dark">
              Press Hold
            </p>
            <h1 className="type-display mx-auto mt-4 max-w-2xl text-4xl sm:text-6xl">
              This issue failed to load cleanly.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-textSecondary-light dark:text-textSecondary-dark sm:text-base">
              A section of the portfolio did not render as expected. Reload the page to retry the full issue.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex min-w-[12rem] items-center justify-center rounded-full bg-primary-light px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white dark:bg-primary-dark"
              >
                Reload Issue
              </button>
              <a
                href="#about"
                className="inline-flex min-w-[12rem] items-center justify-center rounded-full border border-border-light px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-text-light dark:border-border-dark dark:text-text-dark"
              >
                Back to Top
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
