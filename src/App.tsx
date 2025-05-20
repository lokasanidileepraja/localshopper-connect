
import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to MyStore</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => console.log('clicked')}
      >
        Click me
      </button>
    </div>
  );
}
