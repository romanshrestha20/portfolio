export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-light px-6 text-text-light dark:bg-background-dark dark:text-text-dark">
      <div className="w-full max-w-3xl border-y-[4px] border-border-light py-12 text-center dark:border-border-dark sm:py-16">
        <p className="type-page text-primary-light dark:text-primary-dark">
          Issue Loading
        </p>
        <h1 className="type-display mx-auto mt-4 max-w-2xl text-5xl sm:text-7xl">
          Roman Review
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-mono text-xs uppercase tracking-[0.24em] text-textSecondary-light dark:text-textSecondary-dark sm:text-sm">
          Preparing the portfolio archive, case studies, and contact desk.
        </p>
        <div className="mx-auto mt-8 flex w-full max-w-md items-center gap-3 sm:mt-10">
          <span className="h-[4px] flex-1 rounded-full bg-border-light/40 dark:bg-border-dark/30" />
          <span className="h-[4px] w-24 animate-pulse rounded-full bg-primary-light dark:bg-primary-dark" />
          <span className="h-[4px] flex-1 rounded-full bg-border-light/40 dark:bg-border-dark/30" />
        </div>
      </div>
    </div>
  );
}
