# Phase 2 - Quick Reference Guide

## 📚 Services

### Job Management Service
**File:** `lib/services/jobs.ts`

**Key Functions:**
```typescript
// Get all jobs for a company
getCompanyJobs(companyId: string)

// Get a single job
getJobById(jobId: string)

// Get published jobs for job board
getPublishedJobs(limit?: number, offset?: number)

// Search published jobs
searchJobs(query: string, limit?: number, offset?: number)

// Create a new job
createJob(companyId: string, jobData: Omit<Job, "id" | "created_at" | "updated_at">)

// Update a job
updateJob(jobId: string, updates: Partial<Job>)

// Delete a job
deleteJob(jobId: string)

// Publish/close jobs
publishJob(jobId: string)
closeJob(jobId: string)

// Interview questions
getJobQuestions(jobId: string)
addJobQuestion(jobId: string, question: string, timeLimit: number, order: number)
updateJobQuestion(questionId: string, updates: Partial<InterviewQuestion>)
deleteJobQuestion(questionId: string)
```

### Application Management Service
**File:** `lib/services/applications.ts`

**Key Functions:**
```typescript
// Get applications for a job
getJobApplications(jobId: string)

// Get applications for a candidate
getCandidateApplications(candidateId: string)

// Get single application
getApplicationById(applicationId: string)

// Create application
createApplication(jobId: string, candidateId: string, resumeUrl?: string)

// Update application status
updateApplicationStatus(applicationId: string, status: "submitted" | "ranked" | "selected" | "rejected")

// Update ranking score
updateApplicationRankingScore(applicationId: string, rankingScore: number)

// Delete application
deleteApplication(applicationId: string)

// Interview responses
getApplicationResponses(applicationId: string)
createInterviewResponse(applicationId: string, questionId: string, videoUrl: string, duration: number, transcription?: string)
updateInterviewResponse(responseId: string, updates: Partial<InterviewResponse>)

// Check for duplicate applications
checkExistingApplication(jobId: string, candidateId: string)
```

---

## 🎣 Hooks

### useJobs Hook
**File:** `lib/hooks/useJobs.ts`

**Usage:**
```typescript
const { 
  jobs, 
  currentJob, 
  questions, 
  loading, 
  error,
  getCompanyJobs,
  createJob,
  updateJob,
  deleteJob,
  publishJob,
  closeJob,
  getJobQuestions,
  addJobQuestion,
  updateJobQuestion,
  deleteJobQuestion,
  clearError,
  reset
} = useJobs();
```

### useApplications Hook
**File:** `lib/hooks/useApplications.ts`

**Usage:**
```typescript
const { 
  applications, 
  currentApplication, 
  responses, 
  loading, 
  error,
  getJobApplications,
  getCandidateApplications,
  createApplication,
  updateApplicationStatus,
  updateApplicationRankingScore,
  deleteApplication,
  getApplicationResponses,
  createInterviewResponse,
  updateInterviewResponse,
  checkExistingApplication,
  clearError,
  reset
} = useApplications();
```

---

## 🏢 Company Dashboard

### Overview Page
**File:** `app/dashboard/company/page.tsx`

**Features:**
- Dashboard statistics (jobs, applications, pending)
- Recent jobs list
- Subscription tier info
- Protected route (company role required)

**Usage:**
```typescript
// Automatically loads company data and jobs
// Shows stats and recent jobs
// Links to job management
```

### Jobs Management
**File:** `app/dashboard/company/jobs/page.tsx`

**Features:**
- List all company jobs
- Filter by status
- Edit/delete actions
- Create new job link

**Usage:**
```typescript
// View all jobs with filtering
// Click "Edit" to modify job
// Click "Applicants" to see applications
// Click "Delete" to remove job
```

### Create Job
**File:** `app/dashboard/company/jobs/new/page.tsx`

**Features:**
- Form to create new job
- Fields: title, department, location, salary, description
- Validation and error handling

**Usage:**
```typescript
// Fill in job details
// Click "Create Job"
// Redirects to jobs list
```

---

## 👤 Candidate Dashboard

### Overview Page
**File:** `app/dashboard/candidate/page.tsx`

**Features:**
- Application statistics
- Recent applications list
- Success tips
- Protected route (candidate role required)

**Usage:**
```typescript
// View application stats
// See recent applications
// Click "View" to see details
// Browse jobs link
```

---

## 🌐 Public Job Board

### Jobs Listing
**File:** `app/(public)/jobs/page.tsx`

**Features:**
- Browse all published jobs
- Search by keywords
- Filter by location and department
- View salary ranges
- Responsive design

**Usage:**
```typescript
// Search for jobs
// Filter by location/department
// Click job to view details
// Apply to jobs
```

---

## 🔐 Protected Routes

All dashboard pages check authentication:

```typescript
useEffect(() => {
  if (!authLoading && (!user || profile?.role !== "expected_role")) {
    router.push("/login");
  }
}, [user, profile, authLoading, router]);
```

**Company Dashboard:** Requires `role === "company"`
**Candidate Dashboard:** Requires `role === "candidate"`

---

## 📊 Data Flow

### Creating a Job
1. User fills form on `/dashboard/company/jobs/new`
2. Form submits to `createJob()` service
3. Service creates job in Supabase
4. Hook updates state
5. Redirect to jobs list

### Applying for a Job
1. User views job on `/jobs/[id]`
2. User clicks "Apply"
3. Application created via `createApplication()` service
4. User redirected to interview recording
5. Application status: "submitted"

### Ranking Candidates
1. Company views applicants
2. AI scores interview responses
3. `updateApplicationRankingScore()` updates score
4. Application status: "ranked"
5. Company can select/reject candidates

---

## 🛠️ Common Tasks

### Get all jobs for a company
```typescript
const { getCompanyJobs } = useJobs();
await getCompanyJobs(companyId);
```

### Create a new job
```typescript
const { createJob } = useJobs();
await createJob(companyId, {
  title: "Senior Engineer",
  description: "...",
  department: "Engineering",
  location: "San Francisco",
  status: "draft"
});
```

### Get candidate applications
```typescript
const { getCandidateApplications } = useApplications();
await getCandidateApplications(candidateId);
```

### Update application status
```typescript
const { updateApplicationStatus } = useApplications();
await updateApplicationStatus(applicationId, "selected");
```

---

## 📝 Notes

- All services return `{ data, error }` objects
- All hooks use Zustand for state management
- All pages are protected with role-based access
- All forms include validation and error handling
- All lists support filtering and sorting
- All operations include loading states

---

## 🚀 Next Steps

1. **Job Detail Page** - `/app/(public)/jobs/[id]/page.tsx`
2. **Application Form** - Add to job detail page
3. **Video Recording** - Implement MediaRecorder API
4. **Interview Responses** - Create viewing interface
5. **AI Ranking** - Integrate OpenAI GPT-4o

All services and hooks are ready to support these features!

