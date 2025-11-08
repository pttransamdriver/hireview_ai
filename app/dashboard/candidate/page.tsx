"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useApplications } from "@/lib/hooks/useApplications";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CandidateDashboard() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const { applications, loading: appsLoading, getCandidateApplications } =
    useApplications();
  const [stats, setStats] = useState({
    totalApplications: 0,
    submitted: 0,
    ranked: 0,
    selected: 0,
  });

  // Check authentication
  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== "candidate")) {
      router.push("/login");
    }
  }, [user, profile, authLoading, router]);

  // Load applications
  useEffect(() => {
    if (user && profile?.role === "candidate") {
      loadApplications();
    }
  }, [user, profile]);

  const loadApplications = async () => {
    try {
      await getCandidateApplications(user?.id || "");
    } catch (error) {
      console.error("Error loading applications:", error);
      toast.error("Failed to load applications");
    }
  };

  // Calculate stats
  useEffect(() => {
    if (applications.length > 0) {
      const submitted = applications.filter(
        (a) => a.status === "submitted"
      ).length;
      const ranked = applications.filter((a) => a.status === "ranked").length;
      const selected = applications.filter(
        (a) => a.status === "selected"
      ).length;

      setStats({
        totalApplications: applications.length,
        submitted,
        ranked,
        selected,
      });
    }
  }, [applications]);

  if (authLoading || appsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || profile?.role !== "candidate") {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Welcome back, {profile?.name || "Candidate"}!
        </h2>
        <p className="text-gray-600">
          Track your job applications and interview progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Applications
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalApplications}
              </p>
            </div>
            <div className="text-4xl text-blue-100">📋</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Submitted</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.submitted}
              </p>
            </div>
            <div className="text-4xl text-yellow-100">⏳</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Ranked</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.ranked}
              </p>
            </div>
            <div className="text-4xl text-purple-100">⭐</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Selected</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.selected}
              </p>
            </div>
            <div className="text-4xl text-green-100">✓</div>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Applications
          </h3>
          <Link
            href="/dashboard/candidate/applications"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all →
          </Link>
        </div>

        {applications.length > 0 ? (
          <div className="space-y-3">
            {applications.slice(0, 5).map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div>
                  <h4 className="font-medium text-gray-900">
                    {app.job?.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {app.job?.department} • {app.job?.location}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === "selected"
                        ? "bg-green-100 text-green-800"
                        : app.status === "ranked"
                        ? "bg-purple-100 text-purple-800"
                        : app.status === "submitted"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {app.status}
                  </span>
                  <Link
                    href={`/dashboard/candidate/applications/${app.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No applications yet</p>
            <Link
              href="/jobs"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse jobs
            </Link>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
        <h3 className="font-semibold text-gray-900 mb-3">💡 Tips for Success</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Complete your profile to increase your chances</li>
          <li>✓ Record clear and confident video responses</li>
          <li>✓ Answer all interview questions thoroughly</li>
          <li>✓ Check your email for updates on your applications</li>
        </ul>
      </div>
    </div>
  );
}

