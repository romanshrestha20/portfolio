export default function SectionHeader({
  title,
  subtitle,
  className,
  number,
  eyebrow,
}) {
  return (
    <div className={`mb-12 text-center ${className}`}>
      <div className="mx-auto mb-5 flex max-w-fit items-center gap-3">
        {number && (
          <span className="type-page text-primary-light dark:text-primary-dark">
            {number}
          </span>
        )}
        <div className="h-1 w-14 bg-border-light dark:bg-border-dark" />
        {eyebrow && (
          <span className="type-byline text-textSecondary-light dark:text-textSecondary-dark">
            {eyebrow}
          </span>
        )}
      </div>
      <h2 className="type-display text-4xl text-text-light dark:text-text-dark sm:text-5xl md:text-6xl lg:text-7xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-4xl font-mono text-[10px] uppercase tracking-[0.18em] text-textSecondary-light dark:text-textSecondary-dark sm:text-[11px] sm:tracking-[0.28em]">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-5 h-1 w-20 bg-border-light dark:bg-border-dark" />
    </div>
  );
}
