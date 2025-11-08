"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useJobs } from "@/lib/hooks/useJobs";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import toast from "react-hot-toast";

export default function JobsPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const { jobs, loading: jobsLoading, getCompanyJobs, deleteJob } = useJobs();
  const [company, setCompany] = useState<any>(null);
  const [filter, setFilter] = useState<"all" | "published" | "draft" | "closed">(
    "all"
  );

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
      const { data: companyData, error } = await supabase
        .from("companies")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      setCompany(companyData);

      if (companyData?.id) {
        await getCompanyJobs(companyData.id);
      }
    } catch (error) {
      console.error("Error loading company data:", error);
      toast.error("Failed to load company data");
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(jobId);
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
  };

  const filteredJobs =
    filter === "all" ? jobs : jobs.filter((job) => job.status === filter);

  if (authLoading || jobsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (!user || profile?.role !== "company") {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
        <Link
          href="/dashboard/company/jobs/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + New Job
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "published", "draft", "closed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Posted
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{job.title}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{job.department}</td>
                    <td className="px-6 py-4 text-gray-600">{job.location}</td>
                    <td className="px-6 py-4">
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
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(job.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/company/jobs/${job.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/dashboard/company/jobs/${job.id}/applicants`}
                          className="text-green-600 hover:text-green-700 font-medium text-sm"
                        >
                          Applicants
                        </Link>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              No {filter !== "all" ? filter : ""} jobs found
            </p>
            <Link
              href="/dashboard/company/jobs/new"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Create your first job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

