"use client";

import Spinner from '@/components/ui/Spinner';
import UserCard from '@/components/UserCard';
import { useUsers } from '@/context/UserContext';
import SearchBar from '@/components/SearchBar';
import FilterDropdown from '@/components/FilterDropdown';
import useSearch from '@/hooks/useSearch';
import { useTheme } from '@/context/ThemeContext';

export default function DashboardPage() {
  const { users, loading } = useUsers();
  const { theme } = useTheme();

  const {
    searchTerm,
    filters,
    filteredUsers,
    updateSearchTerm,
    updateFilters,
    clearFilters,
  } = useSearch(users);

  if (loading) {
    return (
      <>
        <Spinner />
        <p className="mt-2 text-center">Loading users...</p>
      </>
    );
  }

  const containerClasses = `mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full rounded-md border p-4 ${
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white'
      : 'bg-white border-gray-200 text-gray-900'
  }`;

  const headerWrapperClasses = `flex justify-between items-center mt-3 p-4 rounded-md border ${
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white'
      : 'bg-white border-gray-200 text-gray-900'
  }`;

  return (
    <>
      <div className={headerWrapperClasses}>
        <div className="mb-4 items-center">
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <p className="mt-1 text-sm">List of all employees</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar searchTerm={searchTerm} onChange={updateSearchTerm} />
          <FilterDropdown
            selectedDepartments={filters.departments}
            onDepartmentChange={(departments) => updateFilters({ departments })}
            onClearAll={clearFilters}
          />
        </div>
      </div>

      <div className={containerClasses}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="py-12 flex items-center justify-center col-span-full">
            <div className="text-center">
              <p className="text-lg font-medium">No employees found</p>
              <p className="mt-1 text-gray-500">Try adjusting your search or filters</p>
              {(searchTerm || filters.departments.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
