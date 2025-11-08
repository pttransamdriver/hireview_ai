# HireView AI

> An AI-powered SaaS platform for streamlining the hiring process through automated video interview screening and intelligent candidate ranking.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Status](#project-status)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Contributing](#contributing)

## Overview

HireView AI is a modern hiring platform that revolutionizes the recruitment process by combining video interviewing with AI-powered candidate analysis. The platform enables companies to:

- Create and manage job postings with custom video interview questions
- Screen candidates through automated video interviews
- Rank applicants using AI-powered analysis
- Streamline the hiring workflow with comprehensive dashboards

**Current Status**: Phase 2 Complete (50% done) - Production-ready foundation with core features implemented.

## Features

### Implemented (Phase 1 & 2)

#### Authentication & User Management
- Email/password authentication
- Google OAuth integration
- Role-based access control (Company, Candidate, Admin)
- Secure user profiles with Supabase Auth

#### For Companies
- **Job Management**: Create, edit, publish, and close job postings
- **Custom Interview Questions**: Add video questions with time limits (30-180 seconds)
- **Application Tracking**: View and manage all applications per job
- **Company Dashboard**: Overview of jobs, applications, and subscription status
- **Subscription Tiers**: Basic (5 jobs), Pro (15 jobs), Unlimited plans

#### For Candidates
- **Job Search**: Browse and search published job openings
- **Application Submission**: Apply to jobs with resume upload
- **Candidate Dashboard**: Track application status and progress
- **Profile Management**: Update profile and resume

#### Public Pages
- Landing page with feature showcase
- Pricing page with tier comparison
- How It Works guide
- FAQ section
- Contact form
- Terms of Service & Privacy Policy

### Planned (Phase 3 & 4)

- Video recording interface with Cloudinary integration
- AI ranking engine powered by OpenAI GPT-4o
- Stripe payment processing and subscription management
- Video compilation and hosting
- Admin dashboard for platform management
- Comprehensive testing suite
- Performance optimization

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 18.3
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand 4.4
- **UI Components**: shadcn-ui 0.8, CVA 0.7
- **Notifications**: React Hot Toast 2.4

### Backend
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **API Client**: Axios 1.6
- **Date Utilities**: date-fns 2.30

### External Services
- **Supabase**: Database, Authentication, Storage
- **Cloudinary**: Video storage and processing (Phase 3)
- **Stripe**: Payment processing (Phase 3)
- **OpenAI**: AI-powered ranking (Phase 3)

### Development
- **Package Manager**: npm
- **Linting**: ESLint 9
- **Type Checking**: TypeScript strict mode

## Project Status

### Phase 1: Foundation & Infrastructure ✅ (Complete)
- [x] Project setup and configuration
- [x] Database schema with Row Level Security
- [x] Authentication system (email + OAuth)
- [x] Landing and marketing pages
- [x] Core layouts and navigation

### Phase 2: Core Features & Dashboards ✅ (Complete)
- [x] Job management system
- [x] Application tracking
- [x] Company dashboard
- [x] Candidate dashboard
- [x] Public job board
- [x] Interview question management

### Phase 3: Advanced Features ⏳ (Pending)
- [ ] Video recording interface
- [ ] AI ranking engine
- [ ] Payment processing
- [ ] Video compilation
- [ ] Enhanced analytics

### Phase 4: Testing & Optimization ⏳ (Pending)
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Production deployment
- [ ] Admin dashboard

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Supabase account
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pttransamdriver/hireview_ai.git
cd hireview_ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your actual credentials
```

4. Run database migrations (see [Database Setup](#database-setup))

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required (All Phases)

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change to production URL when deploying
```

### Optional (Phase 3 Features)

```env
# Stripe Payment Processing
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudinary Video Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# OpenAI API
OPENAI_API_KEY=sk-...
```

## Database Setup

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to finish provisioning
3. Copy your project URL and anon key to `.env.local`

### 2. Run Migrations

Execute the SQL migration file located at `supabase/migrations/001_initial_schema.sql` in your Supabase SQL Editor:

1. Open your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `001_initial_schema.sql`
4. Paste and execute

This will create:
- 8 database tables (users, companies, jobs, interview_questions, applications, interview_responses, rankings, payments)
- Row Level Security (RLS) policies for multi-tenant data isolation
- Performance indexes
- Database functions and triggers

### 3. Configure Authentication

1. In Supabase Dashboard, go to Authentication → Settings
2. Enable Email provider
3. (Optional) Enable Google OAuth:
   - Add Google provider
   - Configure OAuth credentials
   - Set redirect URL: `http://localhost:3000/auth/callback`

## Deployment

### Vercel (Recommended)

#### Prerequisites
1. Ensure all changes are committed and pushed to GitHub:
```bash
git add .
git commit -m "Your commit message"
git push
```

2. Your repository already includes the necessary Vercel configuration:
   - `.npmrc` with `legacy-peer-deps=true` (for Next.js 16 + next-cloudinary compatibility)
   - `next.config.ts` with standalone output mode
   - Updated `package-lock.json` with next-cloudinary@6.17.4

#### Deploy Steps

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository (`pttransamdriver/hireview_ai`)
4. Configure environment variables:
   - Add all required variables from `.env.local`
   - Set `NEXT_PUBLIC_APP_URL` to your Vercel domain
5. Click "Deploy"

#### Vercel Configuration

The project includes:
- `next.config.ts` optimized for Vercel deployment
- Standalone output mode for optimal performance
- Image optimization configured for Cloudinary

#### Troubleshooting Vercel Deployment

If you encounter the error:
```
npm error peer next@"^12 || ^13 || ^14" from next-cloudinary@5.20.0
```

This means Vercel is using an old version of your dependencies. Fix:

1. Ensure `.npmrc` and `package-lock.json` are committed:
```bash
git add .npmrc package-lock.json
git commit -m "fix: add npmrc and updated package-lock for Vercel compatibility"
git push
```

2. Trigger a new deployment in Vercel (it will use the updated files)

### Self-Hosting

The project is configured for self-hosting with standalone output:

```bash
npm run build
npm run start
```

Deploy the `.next` folder to your Node.js hosting provider.

### Environment Configuration

For production deployment, update these environment variables:
- `NEXT_PUBLIC_APP_URL` → Your production domain
- Supabase redirect URLs → Add your production domain
- Stripe webhook URLs → Configure production webhooks (Phase 3)

## Project Structure

```
hireview_ai/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/                # Login page
│   │   └── signup/               # Signup page
│   ├── (public)/                 # Public marketing pages
│   │   ├── pricing/              # Pricing page
│   │   ├── how-it-works/         # How It Works guide
│   │   ├── faq/                  # FAQ page
│   │   ├── contact/              # Contact form
│   │   ├── jobs/                 # Public job board
│   │   ├── terms/                # Terms of Service
│   │   └── privacy/              # Privacy Policy
│   ├── dashboard/
│   │   ├── company/              # Company dashboards
│   │   │   ├── page.tsx          # Company overview
│   │   │   └── jobs/             # Job management
│   │   └── candidate/            # Candidate dashboards
│   │       └── page.tsx          # Candidate overview
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── lib/
│   ├── services/                 # Business logic layer
│   │   ├── auth.ts               # Authentication service
│   │   ├── jobs.ts               # Job management service
│   │   └── applications.ts       # Application management service
│   ├── hooks/                    # Zustand state management
│   │   ├── useAuth.ts            # Auth state
│   │   ├── useJobs.ts            # Job state
│   │   └── useApplications.ts    # Application state
│   ├── types/                    # TypeScript type definitions
│   │   └── database.ts           # Database types
│   └── supabase.ts               # Supabase client configuration
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql # Database schema
├── public/                       # Static assets
├── .npmrc                        # npm configuration (legacy-peer-deps)
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── .env.local.example            # Environment variables template
```

## Architecture

### Service Layer Pattern

All data operations go through service functions in `lib/services/`:

```typescript
// Example: lib/services/jobs.ts
export async function createJob(companyId: string, jobData: JobData) {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .insert({ company_id: companyId, ...jobData })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
```

### State Management with Zustand

Global state is managed using Zustand hooks in `lib/hooks/`:

```typescript
// Example: lib/hooks/useJobs.ts
export const useJobs = create<JobsState>((set, get) => ({
  jobs: [],
  loading: false,
  error: null,

  createJob: async (companyId, jobData) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await createJob(companyId, jobData);
      if (error) throw error;
      set({ jobs: [...get().jobs, data], loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  }
}));
```

### Row Level Security (RLS)

All database tables use Supabase RLS policies for multi-tenant security:

- Users can only access their own data
- Companies can only see their jobs and applications
- Candidates can only see their applications
- Public users can view published jobs only

### Authentication Flow

1. User signs up/logs in via Supabase Auth
2. User profile is created in `users` table
3. Company users get a `companies` record
4. Session is managed by Supabase
5. Protected routes check auth state via `useAuth` hook

## Database Schema

### Core Tables

- **users**: User profiles (auth.users extension)
- **companies**: Company information and subscription details
- **jobs**: Job postings with details
- **interview_questions**: Custom video questions per job
- **applications**: Candidate applications to jobs
- **interview_responses**: Video responses to questions
- **rankings**: AI-generated candidate rankings (Phase 3)
- **payments**: Payment and subscription history (Phase 3)

### Key Relationships

- Users (1:1) Companies
- Companies (1:many) Jobs
- Jobs (1:many) Interview Questions
- Jobs (1:many) Applications
- Applications (1:many) Interview Responses
- Applications (1:1) Rankings

## Contributing

This is a private project. For development:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run type checking: `npm run type-check`
4. Run linting: `npm run lint`
5. Commit: `git commit -m "feat: your feature description"`
6. Push: `git push origin feature/your-feature`

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
- Check the FAQ page
- Review documentation in the `/docs` folder (if available)
- Contact: [Your contact information]

---

**Built with** ❤️ **using Next.js 16, TypeScript, and Supabase**

**Version**: 0.1.0 (Alpha - Phase 2 Complete)
