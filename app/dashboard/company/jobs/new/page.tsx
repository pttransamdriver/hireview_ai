"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useJobs } from "@/lib/hooks/useJobs";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function NewJobPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const { createJob } = useJobs();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    location: "",
    salary_min: "",
    salary_max: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get company ID
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .select("id")
        .eq("user_id", user?.id)
        .single();

      if (companyError) throw companyError;

      // Create job
      await createJob(companyData.id, {
        title: formData.title,
        description: formData.description,
        department: formData.department,
        location: formData.location,
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
        status: "draft",
      });

      toast.success("Job created successfully!");
      router.push("/dashboard/company/jobs");
    } catch (error: any) {
      console.error("Error creating job:", error);
      toast.error(error.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  if (!user || profile?.role !== "company") {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Job</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Senior Software Engineer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              placeholder="e.g., Engineering"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., San Francisco, CA"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Min
              </label>
              <input
                type="number"
                name="salary_min"
                value={formData.salary_min}
                onChange={handleChange}
                placeholder="e.g., 100000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Max
              </label>
              <input
                type="number"
                name="salary_max"
                value={formData.salary_max}
                onChange={handleChange}
                placeholder="e.g., 150000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={8}
              placeholder="Describe the job responsibilities, requirements, and benefits..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
            >
              {loading ? "Creating..." : "Create Job"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          💡 Tip: You can add interview questions and publish the job after
          creation.
        </p>
      </div>
    </div>
  );
}

