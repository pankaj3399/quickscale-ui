import React, { useState, useEffect } from "react";

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 1 : 100
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-start text-2xl font-bold">
          Easily Extract Data from Your PDFs
        </h1>
        <p className="mb-6 text-start">
          Upload your document, and our AI will handle the rest. Fast, accurate,
          and hassle-free.
        </p>
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gradient-to-b from-purple-100 to-gray-50 px-10 py-[120px]">
          <div className="flex flex-col items-center justify-center">
            <h2 className="mb-4 text-2xl font-semibold">
              Processing your document...
            </h2>
            <div className="relative h-4 w-full rounded-full bg-gray-200">
              <div
                className="absolute left-0 h-4 rounded-full bg-green-400"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-4 text-gray-600">
              We're extracting data from your PDF. This may take a few moments.
            </p>
            <p className="mt-2 text-gray-400">{progress}%</p>
            <button
              type="submit"
              className="rounded bg-blue-100 bg-opacity-20 px-4 py-2 text-[#393D59] hover:bg-blue-200 focus:outline-none"
            >
              Start Extraction
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-[#585858]">
          Click here to begin extracting data from your document.
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
