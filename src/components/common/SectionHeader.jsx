export default function SectionHeader({ title, subtitle, className }) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-4xl font-extrabold text-primary dark:text-blue-500">
        {title}
      </h2>
      {subtitle && (
        <p className="font-mono text-lg text-gray-600 dark:text-gray-300 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
