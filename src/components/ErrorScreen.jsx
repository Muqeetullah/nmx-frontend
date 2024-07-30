import React from "react";

function FallbackScreen({ error, resetErrorBoundary }) {
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen  text-red-700 p-6 rounded-lg shadow-lg">
      <p className="text-3xl font-bold mb-4">Something went wrong:</p>
      <pre className="text-lg whitespace-pre-wrap">{error.message}</pre>
      <button
        className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
}

export default FallbackScreen;
