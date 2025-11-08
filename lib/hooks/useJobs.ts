"use client";

import { create } from "zustand";
import * as jobsService from "@/lib/services/jobs";
import { Job, InterviewQuestion } from "@/lib/types/database";

interface JobsState {
  jobs: Job[];
  currentJob: Job | null;
  questions: InterviewQuestion[];
  loading: boolean;
  error: any | null;

  // Job actions
  getCompanyJobs: (companyId: string) => Promise<void>;
  getJobById: (jobId: string) => Promise<void>;
  getPublishedJobs: (limit?: number, offset?: number) => Promise<void>;
  searchJobs: (query: string, limit?: number, offset?: number) => Promise<void>;
  createJob: (companyId: string, jobData: any) => Promise<void>;
  updateJob: (jobId: string, updates: Partial<Job>) => Promise<void>;
  deleteJob: (jobId: string) => Promise<void>;
  publishJob: (jobId: string) => Promise<void>;
  closeJob: (jobId: string) => Promise<void>;

  // Question actions
  getJobQuestions: (jobId: string) => Promise<void>;
  addJobQuestion: (
    jobId: string,
    question: string,
    timeLimit: number,
    order: number
  ) => Promise<void>;
  updateJobQuestion: (questionId: string, updates: any) => Promise<void>;
  deleteJobQuestion: (questionId: string) => Promise<void>;

  // Utility
  clearError: () => void;
  reset: () => void;
}

export const useJobs = create<JobsState>((set) => ({
  jobs: [],
  currentJob: null,
  questions: [],
  loading: false,
  error: null,

  getCompanyJobs: async (companyId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await jobsService.getCompanyJobs(companyId);
      if (error) throw error;
      set({ jobs: data || [], loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  getJobById: async (jobId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await jobsService.getJobById(jobId);
      if (error) throw error;
      set({ currentJob: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  getPublishedJobs: async (limit = 20, offset = 0) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await jobsService.getPublishedJobs(limit, offset);
      if (error) throw error;
      set({ jobs: data || [], loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  searchJobs: async (query, limit = 20, offset = 0) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await jobsService.searchJobs(query, limit, offset);
      if (error) throw error;
      set({ jobs: data || [], loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  createJob: async (companyId, jobData) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await jobsService.createJob(companyId, jobData);
      if (error) throw error;
      if (data) {
        set((state) => ({
          jobs: [data, ...state.jobs],
          currentJob: data,
          loading: false,
        }));
      }
    } catch (error) {
      set({ error, loading: false });
    }
  },

  updateJob: async (jobId, updates) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await jobsService.updateJob(jobId, updates);
      if (error) throw error;
      if (data) {
        set((state) => ({
          jobs: state.jobs.map((j) => (j.id === jobId ? data : j)),
          currentJob: state.currentJob?.id === jobId ? data : state.currentJob,
          loading: false,
        }));
      }
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteJob: async (jobId) => {
    set({ loading: true, error: null });
    try {
      const { error } = await jobsService.deleteJob(jobId);
      if (error) throw error;
      set((state) => ({
        jobs: state.jobs.filter((j) => j.id !== jobId),
        currentJob:
          state.currentJob?.id === jobId ? null : state.currentJob,
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  publishJob: async (jobId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await jobsService.publishJob(jobId);
      if (error) throw error;
      if (data) {
        set((state) => ({
          jobs: state.jobs.map((j) => (j.id === jobId ? data : j)),
          currentJob: state.currentJob?.id === jobId ? data : state.currentJob,
          loading: false,
        }));
      }
    } catch (error) {
      set({ error, loading: false });
    }
  },

  closeJob: async (jobId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await jobsService.closeJob(jobId);
      if (error) throw error;
      if (data) {
        set((state) => ({
          jobs: state.jobs.map((j) => (j.id === jobId ? data : j)),
          currentJob: state.currentJob?.id === jobId ? data : state.currentJob,
          loading: false,
        }));
      }
    } catch (error) {
      set({ error, loading: false });
    }
  },

  getJobQuestions: async (jobId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await jobsService.getJobQuestions(jobId);
      if (error) throw error;
      set({ questions: data || [], loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  addJobQuestion: async (jobId, question, timeLimit, order) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await jobsService.addJobQuestion(
        jobId,
        question,
        timeLimit,
        order
      );
      if (error) throw error;
      if (data) {
        set((state) => ({
          questions: [...state.questions, data],
          loading: false,
        }));
      }
    } catch (error) {
      set({ error, loading: false });
    }
  },

  updateJobQuestion: async (questionId, updates) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await jobsService.updateJobQuestion(
        questionId,
        updates
      );
      if (error) throw error;
      if (data) {
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId ? data : q
          ),
          loading: false,
        }));
      }
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteJobQuestion: async (questionId) => {
    set({ loading: true, error: null });
    try {
      const { error } = await jobsService.deleteJobQuestion(questionId);
      if (error) throw error;
      set((state) => ({
        questions: state.questions.filter((q) => q.id !== questionId),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  clearError: () => set({ error: null }),
  reset: () =>
    set({
      jobs: [],
      currentJob: null,
      questions: [],
      loading: false,
      error: null,
    }),
}));

