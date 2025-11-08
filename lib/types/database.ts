// User types
export type UserRole = "company" | "candidate" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Company types
export type SubscriptionTier = "basic" | "pro" | "unlimited";

export interface Company {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  logo_url?: string;
  website?: string;
  subscription_tier: SubscriptionTier;
  posting_count: number;
  posting_limit: number;
  stripe_customer_id?: string;
  created_at: string;
  updated_at: string;
}

// Job types
export interface Job {
  id: string;
  company_id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  status: "draft" | "published" | "closed";
  created_at: string;
  updated_at: string;
}

// Interview Question types
export interface InterviewQuestion {
  id: string;
  job_id: string;
  question: string;
  time_limit: number; // in seconds
  order: number;
  created_at: string;
}

// Application types
export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  resume_url?: string;
  status: "submitted" | "ranked" | "selected" | "rejected";
  ranking_score?: number;
  created_at: string;
  updated_at: string;
}

// Interview Response types
export interface InterviewResponse {
  id: string;
  application_id: string;
  question_id: string;
  video_url: string;
  transcription?: string;
  duration: number; // in seconds
  created_at: string;
}

// Ranking types
export interface Ranking {
  id: string;
  application_id: string;
  clarity_score: number;
  confidence_score: number;
  relevance_score: number;
  time_compliance_score: number;
  final_score: number;
  analysis?: string;
  created_at: string;
}

// Payment types
export interface Payment {
  id: string;
  company_id: string;
  stripe_payment_id: string;
  amount: number;
  currency: string;
  subscription_tier: SubscriptionTier;
  status: "pending" | "completed" | "failed";
  created_at: string;
}

