export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary-light dark:text-primary-dark animate-pulse">
          Welcome to My Portfolio!
        </h1>
        <div className="w-16 h-16 mx-auto mb-4 border-t-4 border-solid rounded-full border-primary-light dark:border-primary-dark animate-spin"></div>
        <p className="font-mono text-lg text-info-light dark:text-info-dark">
          Please wait while we load the content...
        </p>
      </div>
    </div>
  );
}
