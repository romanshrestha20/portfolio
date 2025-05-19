export default function Loader() {
  return (
    <div className="min-h-screen dark:bg-gray-800 bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold dark:text-blue-400 text-blue-600 mb-4 animate-pulse">
          Welcome to My Portfolio!
        </h1>
        <div className="border-t-4 border-blue-600 dark:border-blue-400 border-solid w-16 h-16 rounded-full animate-spin mb-4 mx-auto"></div>
        <p className="font-mono text-lg dark:text-blue-300 text-blue-500">
          Please wait while we load the content...
        </p>
      </div>
    </div>
  );
}
