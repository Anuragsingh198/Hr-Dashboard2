'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/bookmarks', label: 'Bookmarks' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

const getLinkClasses = (href) => {
  const base =
    'text-lg font-medium transition px-2 py-1 rounded-md';
  const active =
    'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-gray-800';
  const inactive =
    'text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700';

  return `${base} ${pathname === href ? active : inactive}`;
};


  return (
    <nav
      className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-700"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
              HR Dashboard
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={getLinkClasses(href)}>
                {label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500"
              aria-label="Toggle Theme"
              title="Toggle light/dark theme"
            >
              {theme === 'dark' ? (
                <Sun size={22} className="text-yellow-300" />
              ) : (
                <Moon size={22} className="text-gray-800" />
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500"
              aria-label="Toggle Theme"
              title="Toggle light/dark theme"
            >
              {theme === 'dark' ? (
                <Sun size={22} className="text-yellow-300" />
              ) : (
                <Moon size={22} className="text-gray-800" />
              )}
            </button>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-gray-800 dark:text-gray-300" />
              ) : (
                <Menu size={24} className="text-gray-800 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 transition-all duration-300">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={getLinkClasses(href)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </nav>
  );
}
