
"use client";

import Navbar from "@/components/ui/navbar";
import { useTheme } from "@/context/ThemeContext";
import clsx from "clsx";

export default function AppShell({ children }) {
  const { theme } = useTheme();

  return (
    <div
      className={clsx(
        "min-h-screen transition-colors duration-300",
        {
          "bg-gray-50 text-gray-900": theme === "light",
          "bg-gray-900 text-gray-100": theme === "dark",
        }
      )}
    >
      <Navbar />
      <main className="p-4 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
