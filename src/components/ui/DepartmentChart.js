'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { generateDepartmentStats } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

const data = generateDepartmentStats();

export default function DepartmentChart() {
  const { theme } = useTheme();
  const [activeBar, setActiveBar] = useState('avgRating');

  const handleLegendClick = (dataKey) => {
    setActiveBar(dataKey);
  };

  const baseBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  const getButtonClass = (key, base, active) => (
    `px-3 py-1.5 text-sm rounded-full ${
      activeBar === key
        ? active
        : base
    }`
  );

  return (
    <div className={`${baseBg} ${borderColor} p-6 rounded-lg shadow-md border`}>
      <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>
        Department Performance
      </h3>

      <div className="flex space-x-4 mb-6">
        <button
          className={getButtonClass(
            'avgRating',
            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700',
            theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
          )}
          onClick={() => handleLegendClick('avgRating')}
        >
          Avg. Rating
        </button>
        <button
          className={getButtonClass(
            'employeeCount',
            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700',
            theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
          )}
          onClick={() => handleLegendClick('employeeCount')}
        >
          Employee Count
        </button>
        <button
          className={getButtonClass(
            'bookmarkCount',
            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700',
            theme === 'dark' ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-800'
          )}
          onClick={() => handleLegendClick('bookmarkCount')}
        >
          Bookmarks
        </button>
      </div>

      <div className="h-80 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="department"
              angle={-45}
              textAnchor="end"
              height={70}
              tick={{ fontSize: 12, fill: theme === 'dark' ? '#E5E7EB' : '#374151' }}
            />
            <YAxis
              tick={{ fill: theme === 'dark' ? '#E5E7EB' : '#374151' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1F2937' : '#ffffff',
                borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
                color: theme === 'dark' ? '#F9FAFB' : '#111827',
              }}
            />
            <Legend />
            {activeBar === 'avgRating' && (
              <Bar
                dataKey="avgRating"
                name="Average Rating"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
            )}
            {activeBar === 'employeeCount' && (
              <Bar
                dataKey="employeeCount"
                name="Employee Count"
                fill="hsl(var(--chart-2))"
                radius={[4, 4, 0, 0]}
              />
            )}
            {activeBar === 'bookmarkCount' && (
              <Bar
                dataKey="bookmarkCount"
                name="Bookmarks"
                fill="hsl(var(--chart-3))"
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}