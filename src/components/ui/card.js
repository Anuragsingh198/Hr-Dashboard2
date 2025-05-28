import React from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div className={`rounded-xl border bg-white dark:bg-gray-800 shadow ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return <div className={`p-4 border-b ${className}`}>{children}</div>;
}

export function CardContent({ className = "", children }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}
