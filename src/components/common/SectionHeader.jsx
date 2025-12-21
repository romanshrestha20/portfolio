export default function SectionHeader({ title, subtitle, className }) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-4xl font-extrabold text-primary dark:text-primary-light">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 font-mono text-lg text-textSecondary-light dark:text-textSecondary-dark">
          {subtitle}
        </p>
      )}
    </div>
  );
}
