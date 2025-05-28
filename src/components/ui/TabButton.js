'use client';

export default function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium text-sm rounded-t-md transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-transparent text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}
