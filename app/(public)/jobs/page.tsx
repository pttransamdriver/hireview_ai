"use client";

import { useEffect, useState } from "react";
import { useJobs } from "@/lib/hooks/useJobs";
import Link from "next/link";
import toast from "react-hot-toast";

export default function JobsPage() {
  const { jobs, loading, getPublishedJobs, searchJobs } = useJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  // Load jobs on mount
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      await getPublishedJobs(50, 0);
    } catch (error) {
      console.error("Error loading jobs:", error);
      toast.error("Failed to load jobs");
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadJobs();
      return;
    }

    try {
      await searchJobs(searchQuery, 50, 0);
    } catch (error) {
      console.error("Error searching jobs:", error);
      toast.error("Failed to search jobs");
    }
  };

  // Filter jobs based on location and department
  const filteredJobs = jobs.filter((job) => {
    const matchesLocation =
      !locationFilter ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesDepartment =
      !departmentFilter ||
      job.department.toLowerCase().includes(departmentFilter.toLowerCase());
    return matchesLocation && matchesDepartment;
  });

  // Get unique locations and departments
  const locations = [...new Set(jobs.map((j) => j.location))];
  const departments = [...new Set(jobs.map((j) => j.department))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Next Opportunity
          </h1>
          <p className="text-xl text-gray-600">
            Browse open positions and apply with video interviews
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, company, or keywords..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Search
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setLocationFilter("");
                  setDepartmentFilter("");
                  setSearchQuery("");
                  loadJobs();
                }}
                className="w-full px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Jobs List */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading jobs...</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.id}`}
                    className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {job.department} • {job.location}
                        </p>
                      </div>
                      {job.salary_min && job.salary_max && (
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(job.salary_min / 1000).toFixed(0)}k - $
                            {(job.salary_max / 1000).toFixed(0)}k
                          </p>
                          <p className="text-gray-600 text-sm">per year</p>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {job.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        Posted{" "}
                        {new Date(job.created_at).toLocaleDateString()}
                      </p>
                      <span className="text-blue-600 font-medium">
                        View Details →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600 mb-4">No jobs found</p>
                <button
                  onClick={() => {
                    setLocationFilter("");
                    setDepartmentFilter("");
                    setSearchQuery("");
                    loadJobs();
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters and try again
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

