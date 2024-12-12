import React, { useState, useEffect } from 'react';

interface DashboardViewProps {
  src: string;
}

export default function DashboardView({ src }: DashboardViewProps) {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [src]);

  const handleError = () => {
    setIsError(true);
  };

  if (!src || isError) {
    return (
      <div className="w-full h-full flex items-center justify-center border border-gray-300">
        <span className="text-gray-500">Add a dashboard to preview</span>
      </div>
    );
  }

  return (
    <iframe
      src={src}
      className="w-full h-full border-none"
      title="Content"
      onError={handleError}
    />
  );
}
