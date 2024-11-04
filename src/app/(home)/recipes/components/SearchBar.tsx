// File: app/recipes/components/SearchBar.tsx

'use client';

import { useState, useEffect } from 'react';

interface SearchBarProps {
  initialQuery: string;
  setQuery: (query: string) => void;
}

export default function SearchBar({ initialQuery, setQuery }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(searchTerm);
    }, 500); // Debounce delay of 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setQuery]);

  return (
    <div className="flex justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search recipes..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
