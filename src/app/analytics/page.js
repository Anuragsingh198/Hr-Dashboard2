"use client";

import { useUsers } from "@/context/UserContext";
import { useBookmarks } from "@/context/BookmarkContext";
import { useTheme } from "@/context/ThemeContext";
import DepartmentChart from "@/components/ui/DepartmentChart";
import MonthlyTrendChart from "@/components/ui/MonthlyChart";

export default function AnalyticsPage() {
  const { users } = useUsers();
  const { bookmarks } = useBookmarks();
  const { theme } = useTheme();

  const totalEmployees = users.length;
  const totalBookmarks = bookmarks.length;

  const avgPerformance =
    users.length > 0
      ? users.reduce(
          (sum, user) =>
            sum +
            (typeof user.performanceRating === "number"
              ? user.performanceRating
              : Math.floor(Math.random() * 5) + 1),
          0
        ) / users.length
      : 0;

  const promotedCount = users.filter((user) => user.promoted).length;

  const departmentPerformance = users.reduce((acc, user) => {
    const dept = user.company?.department;
    if (!dept) return acc;
    const rating =
      typeof user.performanceRating === "number"
        ? user.performanceRating
        : Math.floor(Math.random() * 5) + 1;
    if (!acc[dept]) {
      acc[dept] = { count: 0, total: 0 };
    }
    acc[dept].count++;
    acc[dept].total += rating;
    return acc;
  }, {});

  const topDepartments = Object.entries(departmentPerformance)
    .map(([dept, stats]) => ({
      department: dept,
      avgRating: stats.total / stats.count,
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 3);

  const statCards = [
    {
      title: "Total Employees",
      value: totalEmployees,
      change: "+12% from last month",
      positive: true,
    },
    {
      title: "Bookmarked Employees",
      value: totalBookmarks,
      change: `${Math.round((totalBookmarks / totalEmployees) * 100)}% of total`,
      positive: totalBookmarks > 0,
    },
    {
      title: "Average Performance",
      value: avgPerformance.toFixed(1),
      change: "+0.3 from last quarter",
      positive: true,
    },
    {
      title: "Recently Promoted",
      value: promotedCount,
      change: `${Math.round((promotedCount / totalEmployees) * 100)}% promotion rate`,
      positive: true,
    },
  ];

  const bgColors = ["bg-amber-500", "bg-gray-400", "bg-orange-600"];
  const darkBgColors = ["bg-yellow-600", "bg-gray-500", "bg-orange-700"];

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Performance Analytics
        </h1>
        <p className={`mt-1 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Track department performance and employee trends
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-lg shadow-md border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <p className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {stat.title}
            </p>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
            <div
              className={`mt-2 flex items-center text-sm ${
                stat.positive
                  ? theme === "dark"
                    ? "text-green-400"
                    : "text-green-600"
                  : theme === "dark"
                  ? "text-red-400"
                  : "text-red-600"
              }`}
            >
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`p-6 rounded-lg shadow-md mb-8 border ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-gray-900"
        }`}
      >
        <h3 className="text-lg font-medium mb-4">Top Performing Departments</h3>
        <div className="space-y-4">
          {topDepartments.map((dept, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 flex items-center justify-center">
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-white text-xs ${
                    theme === "dark" ? darkBgColors[index] : bgColors[index]
                  }`}
                >
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 ml-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{dept.department}</span>
                  <span className="text-sm font-medium">{dept.avgRating.toFixed(1)}</span>
                </div>
                <div
                  className={`w-full h-2 rounded-full ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`h-2 rounded-full ${
                      theme === "dark" ? darkBgColors[index] : bgColors[index]
                    }`}
                    style={{ width: `${(dept.avgRating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DepartmentChart />
        <MonthlyTrendChart />
      </div>
    </div>
  );
}
