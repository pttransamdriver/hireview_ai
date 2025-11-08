import Link from "next/link";

export default function CompanyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Company Dashboard
            </h1>
            <Link
              href="/dashboard/company/jobs/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + New Job
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="space-y-2 bg-white rounded-lg p-4 shadow-sm">
              <Link
                href="/dashboard/company"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Overview
              </Link>
              <Link
                href="/dashboard/company/jobs"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Job Postings
              </Link>
              <Link
                href="/dashboard/company/applicants"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Applicants
              </Link>
              <Link
                href="/dashboard/company/analytics"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Analytics
              </Link>
              <Link
                href="/dashboard/company/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Settings
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
}

