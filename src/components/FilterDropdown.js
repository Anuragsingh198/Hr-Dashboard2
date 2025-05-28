'use client';

import { useState, useContext } from 'react';
import { ChevronDown, Filter, Check } from 'lucide-react';
import { cn, departments } from '@/lib/utils';
import { ThemeContext } from '@/context/ThemeContext';

export default function FilterDropdown({
  selectedDepartments,
  onDepartmentChange,
  onClearAll,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  const toggleDepartment = (dept) => {
    if (!selectedDepartments) {
      onDepartmentChange([dept]);
      return;
    }

    if (selectedDepartments.includes(dept)) {
      const newDepts = selectedDepartments.filter((d) => d !== dept);
      onDepartmentChange(newDepts.length > 0 ? newDepts : null);
    } else {
      onDepartmentChange([...selectedDepartments, dept]);
    }
  };

  const hasActiveFilters = Boolean(selectedDepartments);

  const buttonClasses = cn(
    "inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors",
    hasActiveFilters
      ? (isDark
        ? "border-gray-700 text-white-300 bg-blue-900/30 focus:ring-blue-400"
        : "border-blue-300 text-blue-700 bg-blue-50 focus:ring-blue-500")
      : (isDark
        ? "border-gray-700 text-white-300 bg-gray-800 hover:bg-gray-700 focus:ring-gray-600"
        : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500")
  );

  const containerBg = isDark ? "bg-gray-800 ring-black ring-opacity-50 divide-gray-700" : "bg-white ring-black ring-opacity-5 divide-gray-100";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
      >
        <Filter
          className={cn(
            "h-4 w-4 mr-2",
            hasActiveFilters
              ? "text-blue-500"
              : isDark
                ? "text-white bg-gray-700"
                : "text-gray-700"
          )}
        />
        Filters
        <ChevronDown className="h-4 w-4 ml-2" />
        {hasActiveFilters && (
          <span
            className={cn(
              "ml-1.5 inline-flex items-center justify-center h-5 w-5 rounded-full text-xs font-semibold",
              isDark
                ? "bg-gray-800 text-white"
                : "bg-blue-100 text-blue-800"
            )}
          >
            {selectedDepartments?.length || 0}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className={`origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg ring-1 divide-y z-10
            ${containerBg}
          `}
        >
          {/* Departments */}
          <div className="py-3 px-4">
            <h3 className={isDark ? "text-sm font-medium text-gray-100 mb-2" : "text-sm font-medium text-gray-900 mb-2"}>
              Department
            </h3>
            <div className="space-y-2 mt-1">
              {departments.map((dept) => {
                const isSelected = selectedDepartments?.includes(dept);
                return (
                  <div
                    key={dept}
                    onClick={() => toggleDepartment(dept)}
                    className={`flex items-center cursor-pointer p-1.5 rounded-md transition-colors
                      ${isDark
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-50"
                      }
                    `}
                  >
                    <div
                      className={cn(
                        "h-4 w-4 border rounded flex items-center justify-center mr-2 transition-colors",
                        isSelected
                          ? "border-blue-500 bg-blue-500 text-white"
                          : isDark
                            ? "border-gray-600"
                            : "border-gray-300"
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span className={isDark ? "text-sm text-gray-300" : "text-sm text-gray-700"}>
                      {dept}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="py-2 px-4 flex justify-between">
            <button
              onClick={onClearAll}
              className={cn(
                "text-sm hover:text-gray-700 focus:outline-none",
                isDark
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500"
              )}
              disabled={!hasActiveFilters}
            >
              Clear all
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-sm font-medium hover:text-blue-800 focus:outline-none",
                isDark
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600"
              )}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
