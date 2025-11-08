import { supabase } from "@/lib/supabase";
import { Job, InterviewQuestion } from "@/lib/types/database";

/**
 * Get all jobs for a company
 */
export async function getCompanyJobs(companyId: string) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data: data as Job[], error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Get a single job by ID
 */
export async function getJobById(jobId: string) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (error) throw error;
    return { data: data as Job, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Get all published jobs (for job board)
 */
export async function getPublishedJobs(limit = 20, offset = 0) {
  try {
    const { data, error, count } = await supabase
      .from("jobs")
      .select("*", { count: "exact" })
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { data: data as Job[], count, error: null };
  } catch (error) {
    return { data: null, count: null, error };
  }
}

/**
 * Search published jobs
 */
export async function searchJobs(query: string, limit = 20, offset = 0) {
  try {
    const { data, error, count } = await supabase
      .from("jobs")
      .select("*", { count: "exact" })
      .eq("status", "published")
      .or(
        `title.ilike.%${query}%,description.ilike.%${query}%,department.ilike.%${query}%,location.ilike.%${query}%`
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { data: data as Job[], count, error: null };
  } catch (error) {
    return { data: null, count: null, error };
  }
}

/**
 * Create a new job
 */
export async function createJob(
  companyId: string,
  jobData: Omit<Job, "id" | "created_at" | "updated_at">
) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .insert({
        ...jobData,
        company_id: companyId,
      })
      .select()
      .single();

    if (error) throw error;
    return { data: data as Job, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Update a job
 */
export async function updateJob(jobId: string, updates: Partial<Job>) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .update(updates)
      .eq("id", jobId)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Job, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Delete a job
 */
export async function deleteJob(jobId: string) {
  try {
    const { error } = await supabase.from("jobs").delete().eq("id", jobId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error };
  }
}

/**
 * Publish a job (change status to published)
 */
export async function publishJob(jobId: string) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .update({ status: "published" })
      .eq("id", jobId)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Job, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Close a job (change status to closed)
 */
export async function closeJob(jobId: string) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .update({ status: "closed" })
      .eq("id", jobId)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Job, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Get interview questions for a job
 */
export async function getJobQuestions(jobId: string) {
  try {
    const { data, error } = await supabase
      .from("interview_questions")
      .select("*")
      .eq("job_id", jobId)
      .order("order", { ascending: true });

    if (error) throw error;
    return { data: data as InterviewQuestion[], error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Add an interview question to a job
 */
export async function addJobQuestion(
  jobId: string,
  question: string,
  timeLimit: number,
  order: number
) {
  try {
    const { data, error } = await supabase
      .from("interview_questions")
      .insert({
        job_id: jobId,
        question,
        time_limit: timeLimit,
        order,
      })
      .select()
      .single();

    if (error) throw error;
    return { data: data as InterviewQuestion, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Update an interview question
 */
export async function updateJobQuestion(
  questionId: string,
  updates: Partial<InterviewQuestion>
) {
  try {
    const { data, error } = await supabase
      .from("interview_questions")
      .update(updates)
      .eq("id", questionId)
      .select()
      .single();

    if (error) throw error;
    return { data: data as InterviewQuestion, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Delete an interview question
 */
export async function deleteJobQuestion(questionId: string) {
  try {
    const { error } = await supabase
      .from("interview_questions")
      .delete()
      .eq("id", questionId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error };
  }
}

