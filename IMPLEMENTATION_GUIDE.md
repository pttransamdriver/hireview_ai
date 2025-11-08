# Hire View AI - Implementation Guide for Next Phase

## 🎯 Phase 2: Core Features (Company & Candidate Dashboards)

This guide provides patterns and best practices for implementing the remaining features.

## 📋 Implementation Checklist

### Company Dashboard
- [ ] Create dashboard layout with sidebar navigation
- [ ] Implement job management (CRUD operations)
- [ ] Build applicant list with filtering
- [ ] Create analytics dashboard
- [ ] Add subscription management
- [ ] Implement job posting form

### Candidate Dashboard
- [ ] Create dashboard layout
- [ ] Show applied jobs list
- [ ] Display interview status
- [ ] Show ranking scores
- [ ] Build profile management
- [ ] Add application history

### Job Board
- [ ] Create public job listing page
- [ ] Implement job search and filtering
- [ ] Build job detail page
- [ ] Create application form
- [ ] Add resume upload

### Video Recording
- [ ] Implement MediaRecorder API
- [ ] Create video preview
- [ ] Add Cloudinary upload
- [ ] Implement video playback
- [ ] Add duration tracking

## 🏗️ Architecture Patterns

### Creating a New Service

```typescript
// lib/services/jobs.ts
import { supabase } from "@/lib/supabase";
import { Job } from "@/lib/types/database";

export async function getJobs(companyId: string) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("company_id", companyId);
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createJob(job: Omit<Job, "id" | "created_at" | "updated_at">) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .insert([job])
      .select()
      .single();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
```

### Creating a New Hook

```typescript
// lib/hooks/useJobs.ts
import { create } from "zustand";
import * as jobsService from "@/lib/services/jobs";

interface JobsState {
  jobs: any[];
  loading: boolean;
  error: any | null;
  
  getJobs: (companyId: string) => Promise<void>;
  createJob: (job: any) => Promise<void>;
  updateJob: (id: string, updates: any) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}

export const useJobs = create<JobsState>((set) => ({
  jobs: [],
  loading: false,
  error: null,

  getJobs: async (companyId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await jobsService.getJobs(companyId);
      if (error) throw error;
      set({ jobs: data || [], loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // ... other methods
}));
```

### Creating a Protected Page

```typescript
// app/dashboard/company/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export default function CompanyDashboard() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    // Check if user is authenticated and is a company
    if (!loading && (!user || profile?.role !== "company")) {
      router.push("/login");
    }
  }, [user, profile, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user || profile?.role !== "company") return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard content */}
    </div>
  );
}
```

### Creating an API Route

```typescript
// app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("company_id");

    if (!companyId) {
      return NextResponse.json(
        { error: "company_id is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("company_id", companyId);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("jobs")
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## 🎨 UI Component Patterns

### Form Component

```typescript
"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function JobForm({ onSubmit }: { onSubmit: (data: any) => Promise<void> }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
      toast.success("Job created successfully!");
      setFormData({ title: "", description: "", department: "", location: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* More fields... */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Job"}
      </button>
    </form>
  );
}
```

### List Component

```typescript
"use client";

import { useEffect } from "react";
import { useJobs } from "@/lib/hooks/useJobs";

export default function JobsList({ companyId }: { companyId: string }) {
  const { jobs, loading, getJobs } = useJobs();

  useEffect(() => {
    getJobs(companyId);
  }, [companyId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-gray-600 mt-2">{job.description}</p>
          <div className="flex gap-4 mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Edit
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## 🎥 Video Recording Pattern

```typescript
"use client";

import { useRef, useState } from "react";

export default function VideoRecorder() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setVideoBlob(blob);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="space-y-4">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full bg-black rounded-lg"
      />
      <div className="flex gap-4">
        <button
          onClick={startRecording}
          disabled={recording}
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!recording}
          className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
        >
          Stop Recording
        </button>
      </div>
    </div>
  );
}
```

## 🔄 Data Flow Pattern

```
User Action
    ↓
Component State Update
    ↓
Call Service Function
    ↓
Service calls Supabase
    ↓
Supabase returns data
    ↓
Update Zustand Store
    ↓
Component re-renders
    ↓
Show success/error toast
```

## 📱 Responsive Design Pattern

```typescript
// Always use Tailwind responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>

// Mobile-first approach
<div className="px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

## 🧪 Testing Pattern

```typescript
// Example test structure
describe("JobsList", () => {
  it("should display jobs", () => {
    // Test implementation
  });

  it("should handle loading state", () => {
    // Test implementation
  });

  it("should handle errors", () => {
    // Test implementation
  });
});
```

## 🚀 Deployment Checklist

- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Authentication configured
- [ ] Stripe keys added
- [ ] OpenAI API key added
- [ ] Cloudinary credentials added
- [ ] YouTube API key added
- [ ] Tests passing
- [ ] Build successful
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Performance optimized

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

**Use these patterns consistently throughout the project for maintainability and scalability.**

