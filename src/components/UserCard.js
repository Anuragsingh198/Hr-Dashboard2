'use client';
import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, BookmarkCheck, ChevronRight, Award } from 'lucide-react';
import { useBookmarks } from '@/context/BookmarkContext';
import { useUsers } from '@/context/UserContext';
import { ThemeContext } from '@/context/ThemeContext';
import Rating from '@/components/ui/rating';
import { useMemo } from 'react'
const getPerformanceColor = (rating) => {
  if (rating >= 4) return 'bg-green-500';
  if (rating >= 3) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getPerformanceLabel = (rating) => {
  if (rating >= 4) return 'Excellent';
  if (rating >= 3) return 'Good';
  return 'Needs Improvement';
};

export default function UserCard({ user }) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { promoteUser } = useUsers();
  const { theme } = useContext(ThemeContext);

const bookmarked = isBookmarked(user.id);

  const handleBookmarkToggle = (e) => {
    e.preventDefault();
    console.log('Bookmark toggle clicked for user:', user.id);
    bookmarked ? removeBookmark(user.id) : addBookmark(user);
  };
  console.log('user.id:', user.id, typeof user.id);

  const handlePromote = (e) => {
    e.preventDefault();
    promoteUser(user.id);
  };

  return (
    <div className={`rounded-lg shadow-md overflow-hidden transition-all border hover:shadow-lg ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'
    }`}>
      <div className="p-5">
        <div className="flex items-center space-x-4">
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image
              src={user.image || 'https://via.placeholder.com/150'}
              alt={`${user.firstName} ${user.lastName}`}
              className="rounded-full object-cover"
              width={64}
              height={64}
            />
            {user.promoted && (
              <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                <Award className="h-4 w-4" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className={`text-lg font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {user.firstName} {user.lastName}
            </h2>
            <p className={`text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {user.email}
            </p>
            <div className="flex items-center mt-1">
              <span className={`inline-block rounded-full h-2.5 w-2.5 mr-2 ${getPerformanceColor(user.performanceRating)}`}></span>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {user.department}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className={`text-sm font-medium mr-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Performance:</span>
            <Rating value={user.performanceRating} size="sm" />
          </div>
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {getPerformanceLabel(user.performanceRating)}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between space-x-2">
          <Link
            href={`/employee/${user.id}`}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            View <ChevronRight className="ml-1 h-4 w-4" />
          </Link>

          <button
            onClick={handleBookmarkToggle}
            className={`inline-flex justify-center items-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
              bookmarked
                ? 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 hover:bg-amber-200 dark:hover:bg-amber-900/50'
                : theme === 'dark'
                ? 'text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600'
                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
            }`}
          >
          {isBookmarked(user.id) ? <BookmarkCheck /> : <Bookmark />}

          </button>

          <button
            onClick={handlePromote}
            disabled={user.promoted}
            className={`inline-flex justify-center items-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
              user.promoted
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-gray-700 cursor-not-allowed'
                : theme === 'dark'
                ? 'text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600'
                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Award className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
