'use client';

import { Search, X } from 'lucide-react';

export default function SearchBar({
  searchTerm,
  onChange,
  onClear,
  placeholder = 'Search employees...'
}) {
  const handleClear = () => {
    onChange('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="relative flex-1 max-w-xl items-center">
      <div className="absolute inset-y-0 left-0 pl-3 mt-2 pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
        placeholder={placeholder}
      />
      {searchTerm && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
