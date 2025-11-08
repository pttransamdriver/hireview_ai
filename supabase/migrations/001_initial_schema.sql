-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('company', 'candidate', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'basic' CHECK (subscription_tier IN ('basic', 'pro', 'unlimited')),
  posting_count INTEGER NOT NULL DEFAULT 0,
  posting_limit INTEGER NOT NULL DEFAULT 10,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  department TEXT,
  location TEXT,
  salary_min DECIMAL(10, 2),
  salary_max DECIMAL(10, 2),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Interview Questions table
CREATE TABLE IF NOT EXISTS public.interview_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  time_limit INTEGER NOT NULL DEFAULT 90 CHECK (time_limit >= 30 AND time_limit <= 180),
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'ranked', 'selected', 'rejected')),
  ranking_score DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Interview Responses table
CREATE TABLE IF NOT EXISTS public.interview_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.interview_questions(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  transcription TEXT,
  duration INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Rankings table
CREATE TABLE IF NOT EXISTS public.rankings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL UNIQUE REFERENCES public.applications(id) ON DELETE CASCADE,
  clarity_score DECIMAL(5, 2) NOT NULL,
  confidence_score DECIMAL(5, 2) NOT NULL,
  relevance_score DECIMAL(5, 2) NOT NULL,
  time_compliance_score DECIMAL(5, 2) NOT NULL,
  final_score DECIMAL(5, 2) NOT NULL,
  analysis TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  stripe_payment_id TEXT UNIQUE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  subscription_tier TEXT NOT NULL CHECK (subscription_tier IN ('basic', 'pro', 'unlimited')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_companies_user_id ON public.companies(user_id);
CREATE INDEX idx_jobs_company_id ON public.jobs(company_id);
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_applications_job_id ON public.applications(job_id);
CREATE INDEX idx_applications_candidate_id ON public.applications(candidate_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_interview_responses_application_id ON public.interview_responses(application_id);
CREATE INDEX idx_rankings_application_id ON public.rankings(application_id);
CREATE INDEX idx_payments_company_id ON public.payments(company_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for companies table
CREATE POLICY "Companies can view their own data" ON public.companies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Companies can update their own data" ON public.companies
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for jobs table
CREATE POLICY "Anyone can view published jobs" ON public.jobs
  FOR SELECT USING (status = 'published');

CREATE POLICY "Companies can view their own jobs" ON public.jobs
  FOR SELECT USING (
    company_id IN (
      SELECT id FROM public.companies WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Companies can create jobs" ON public.jobs
  FOR INSERT WITH CHECK (
    company_id IN (
      SELECT id FROM public.companies WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for applications table
CREATE POLICY "Candidates can view their own applications" ON public.applications
  FOR SELECT USING (auth.uid() = candidate_id);

CREATE POLICY "Companies can view applications for their jobs" ON public.applications
  FOR SELECT USING (
    job_id IN (
      SELECT id FROM public.jobs WHERE company_id IN (
        SELECT id FROM public.companies WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Candidates can create applications" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = candidate_id);

