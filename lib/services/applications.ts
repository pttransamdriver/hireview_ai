import { supabase } from "@/lib/supabase";
import { Application, InterviewResponse } from "@/lib/types/database";

/**
 * Get all applications for a job
 */
export async function getJobApplications(jobId: string) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        *,
        candidate:candidate_id(id, email, name),
        job:job_id(title)
      `
      )
      .eq("job_id", jobId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Get all applications for a candidate
 */
export async function getCandidateApplications(candidateId: string) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        *,
        job:job_id(id, title, company_id, location, department),
        company:job_id(company_id)
      `
      )
      .eq("candidate_id", candidateId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Get a single application
 */
export async function getApplicationById(applicationId: string) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (error) throw error;
    return { data: data as Application, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Create a new application
 */
export async function createApplication(
  jobId: string,
  candidateId: string,
  resumeUrl?: string
) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .insert({
        job_id: jobId,
        candidate_id: candidateId,
        resume_url: resumeUrl,
        status: "submitted",
      })
      .select()
      .single();

    if (error) throw error;
    return { data: data as Application, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Update application status
 */
export async function updateApplicationStatus(
  applicationId: string,
  status: "submitted" | "ranked" | "selected" | "rejected"
) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", applicationId)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Application, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Update application ranking score
 */
export async function updateApplicationRankingScore(
  applicationId: string,
  rankingScore: number
) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .update({ ranking_score: rankingScore, status: "ranked" })
      .eq("id", applicationId)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Application, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Delete an application
 */
export async function deleteApplication(applicationId: string) {
  try {
    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", applicationId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error };
  }
}

/**
 * Get interview responses for an application
 */
export async function getApplicationResponses(applicationId: string) {
  try {
    const { data, error } = await supabase
      .from("interview_responses")
      .select(
        `
        *,
        question:question_id(question, time_limit)
      `
      )
      .eq("application_id", applicationId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Create an interview response
 */
export async function createInterviewResponse(
  applicationId: string,
  questionId: string,
  videoUrl: string,
  duration: number,
  transcription?: string
) {
  try {
    const { data, error } = await supabase
      .from("interview_responses")
      .insert({
        application_id: applicationId,
        question_id: questionId,
        video_url: videoUrl,
        duration,
        transcription,
      })
      .select()
      .single();

    if (error) throw error;
    return { data: data as InterviewResponse, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Update an interview response
 */
export async function updateInterviewResponse(
  responseId: string,
  updates: Partial<InterviewResponse>
) {
  try {
    const { data, error } = await supabase
      .from("interview_responses")
      .update(updates)
      .eq("id", responseId)
      .select()
      .single();

    if (error) throw error;
    return { data: data as InterviewResponse, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Check if candidate already applied for a job
 */
export async function checkExistingApplication(
  jobId: string,
  candidateId: string
) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("id")
      .eq("job_id", jobId)
      .eq("candidate_id", candidateId)
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows found
    return { exists: !!data, error: null };
  } catch (error) {
    return { exists: false, error };
  }
}

