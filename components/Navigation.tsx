"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  // Don't show navigation on auth pages
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/signup");

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
              Hire View AI
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/how-it-works"
              className={`text-gray-600 hover:text-gray-900 ${pathname === "/how-it-works" ? "font-semibold" : ""}`}
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className={`text-gray-600 hover:text-gray-900 ${pathname === "/pricing" ? "font-semibold" : ""}`}
            >
              Pricing
            </Link>
            <Link
              href="/jobs"
              className={`text-gray-600 hover:text-gray-900 ${pathname === "/jobs" ? "font-semibold" : ""}`}
            >
              Jobs
            </Link>
            <Link
              href="/contact"
              className={`text-gray-600 hover:text-gray-900 ${pathname === "/contact" ? "font-semibold" : ""}`}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              aria-label="Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
