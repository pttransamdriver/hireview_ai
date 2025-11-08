"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useJobs } from "@/lib/hooks/useJobs";
import { useApplications } from "@/lib/hooks/useApplications";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CompanyDashboard() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const { jobs, loading: jobsLoading, getCompanyJobs } = useJobs();
  const { applications, loading: appsLoading, getJobApplications } =
    useApplications();
  const [company, setCompany] = useState<any>(null);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingReview: 0,
  });

  // Check authentication
  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== "company")) {
      router.push("/login");
    }
  }, [user, profile, authLoading, router]);

  // Load company data
  useEffect(() => {
    if (user && profile?.role === "company") {
      loadCompanyData();
    }
  }, [user, profile]);

  const loadCompanyData = async () => {
    try {
      // Get company profile
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (companyError) throw companyError;
      setCompany(companyData);

      // Get jobs
      if (companyData?.id) {
        await getCompanyJobs(companyData.id);

        // Get applications for all jobs
        const { data: jobsData } = await supabase
          .from("jobs")
          .select("id")
          .eq("company_id", companyData.id);

        if (jobsData && jobsData.length > 0) {
          const { data: appsData } = await supabase
            .from("applications")
            .select("*")
            .in(
              "job_id",
              jobsData.map((j) => j.id)
            );

          // Calculate stats
          const activeJobs = jobsData.filter(
            (j) => jobs.find((job) => job.id === j.id)?.status === "published"
          ).length;

          const pendingReview = appsData?.filter(
            (a) => a.status === "submitted"
          ).length || 0;

          setStats({
            totalJobs: jobsData.length,
            activeJobs,
            totalApplications: appsData?.length || 0,
            pendingReview,
          });
        }
      }
    } catch (error) {
      console.error("Error loading company data:", error);
      toast.error("Failed to load company data");
    }
  };

  if (authLoading || jobsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || profile?.role !== "company") {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Welcome back, {company?.name || "Company"}!
        </h2>
        <p className="text-gray-600">
          Manage your job postings, review applications, and track your hiring
          progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Jobs</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalJobs}
              </p>
            </div>
            <div className="text-4xl text-blue-100">📋</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Jobs</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.activeJobs}
              </p>
            </div>
            <div className="text-4xl text-green-100">✓</div>
          </div>
        </div>

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
            <div className="text-4xl text-purple-100">👥</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Pending Review
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.pendingReview}
              </p>
            </div>
            <div className="text-4xl text-orange-100">⏳</div>
          </div>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Jobs</h3>
          <Link
            href="/dashboard/company/jobs"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all →
          </Link>
        </div>

        {jobs.length > 0 ? (
          <div className="space-y-3">
            {jobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                  <p className="text-sm text-gray-600">
                    {job.department} • {job.location}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.status === "published"
                        ? "bg-green-100 text-green-800"
                        : job.status === "draft"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {job.status}
                  </span>
                  <Link
                    href={`/dashboard/company/jobs/${job.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No jobs posted yet</p>
            <Link
              href="/dashboard/company/jobs/new"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Create your first job
            </Link>
          </div>
        )}
      </div>

      {/* Subscription Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Current Plan: {company?.subscription_tier?.toUpperCase()}
            </h3>
            <p className="text-gray-600 text-sm">
              You can post up to {company?.posting_limit} jobs with your current
              plan.
            </p>
          </div>
          <Link
            href="/dashboard/company/settings"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Upgrade →
          </Link>
        </div>
      </div>
    </div>
  );
}

