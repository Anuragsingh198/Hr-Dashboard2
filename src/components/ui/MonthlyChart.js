'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { generateMonthlyStats } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

const data = generateMonthlyStats();

export default function MonthlyTrendChart() {
  const { theme } = useTheme();

  const baseBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  const axisTickColor = theme === 'dark' ? '#E5E7EB' : '#374151';
  const tooltipBg = theme === 'dark' ? '#1F2937' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#4B5563' : '#E5E7EB';
  const tooltipText = theme === 'dark' ? '#F9FAFB' : '#111827';

  return (
    <div className={`${baseBg} ${borderColor} p-6 rounded-lg shadow-md border`}>
      <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>Monthly Trends</h3>
      <div className="h-80 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fill: axisTickColor }} />
            <YAxis yAxisId="left" orientation="left" tick={{ fill: axisTickColor }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: axisTickColor }} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                borderColor: tooltipBorder,
                color: tooltipText,
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="bookmarks"
              name="Bookmarks"
              stroke="hsl(var(--chart-1))"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="promotions"
              name="Promotions"
              stroke="hsl(var(--chart-2))"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgRating"
              name="Avg. Rating"
              stroke="hsl(var(--chart-3))"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}