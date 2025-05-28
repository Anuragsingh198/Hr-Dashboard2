'use client';

import { useBookmarks } from '@/context/BookmarkContext';
import { useTheme } from '@/context/ThemeContext';
import UserCard from '@/components/UserCard';

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  const { theme } = useTheme();

  const containerClasses = `mt-6 p-4 rounded-md border ${
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white'
      : 'bg-white border-gray-200 text-gray-900'
  }`;

  return (
    <div className={containerClasses}>
      <h1 className="text-2xl font-semibold mb-4">Bookmarked Employees</h1>

      {bookmarks.length === 0 ? (
        <p className="text-sm text-gray-500">No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
