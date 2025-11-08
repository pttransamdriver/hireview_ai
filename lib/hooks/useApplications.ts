"use client";

import { create } from "zustand";
import * as applicationsService from "@/lib/services/applications";
import { Application, InterviewResponse } from "@/lib/types/database";

interface ApplicationsState {
  applications: any[];
  currentApplication: Application | null;
  responses: InterviewResponse[];
  loading: boolean;
  error: any | null;

  // Application actions
  getJobApplications: (jobId: string) => Promise<void>;
  getCandidateApplications: (candidateId: string) => Promise<void>;
  getApplicationById: (applicationId: string) => Promise<void>;
  createApplication: (
    jobId: string,
    candidateId: string,
    resumeUrl?: string
  ) => Promise<void>;
  updateApplicationStatus: (
    applicationId: string,
    status: "submitted" | "ranked" | "selected" | "rejected"
  ) => Promise<void>;
  updateApplicationRankingScore: (
    applicationId: string,
    rankingScore: number
  ) => Promise<void>;
  deleteApplication: (applicationId: string) => Promise<void>;

  // Response actions
  getApplicationResponses: (applicationId: string) => Promise<void>;
  createInterviewResponse: (
    applicationId: string,
    questionId: string,
    videoUrl: string,
    duration: number,
    transcription?: string
  ) => Promise<void>;
  updateInterviewResponse: (
    responseId: string,
    updates: Partial<InterviewResponse>
  ) => Promise<void>;

  // Utility
  checkExistingApplication: (
    jobId: string,
    candidateId: string
  ) => Promise<boolean>;
  clearError: () => void;
  reset: () => void;
}

export const useApplications = create<ApplicationsState>((set) => ({
  applications: [],
  currentApplication: null,
  responses: [],
  loading: false,
  error: null,

  getJobApplications: async (jobId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await applicationsService.getJobApplications(
        jobId
      );
      if (error) throw error;
      set({ applications: data || [], loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  getCandidateApplications: async (candidateId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } =
        await applicationsService.getCandidateApplications(candidateId);
      if (error) throw error;
      set({ applications: data || [], loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  getApplicationById: async (applicationId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await applicationsService.getApplicationById(
        applicationId
      );
      if (error) throw error;
      set({ currentApplication: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  createApplication: async (jobId, candidateId, resumeUrl) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await applicationsService.createApplication(
        jobId,
        candidateId,
        resumeUrl
      );
      if (error) throw error;
      set((state) => ({
        applications: [data, ...state.applications],
        currentApplication: data,
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  updateApplicationStatus: async (applicationId, status) => {
    set({ loading: true, error: null });
    try {
      const { data, error } =
        await applicationsService.updateApplicationStatus(applicationId, status);
      if (error) throw error;
      set((state) => ({
        applications: state.applications.map((a) =>
          a.id === applicationId ? data : a
        ),
        currentApplication:
          state.currentApplication?.id === applicationId
            ? data
            : state.currentApplication,
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  updateApplicationRankingScore: async (applicationId, rankingScore) => {
    set({ loading: true, error: null });
    try {
      const { data, error } =
        await applicationsService.updateApplicationRankingScore(
          applicationId,
          rankingScore
        );
      if (error) throw error;
      set((state) => ({
        applications: state.applications.map((a) =>
          a.id === applicationId ? data : a
        ),
        currentApplication:
          state.currentApplication?.id === applicationId
            ? data
            : state.currentApplication,
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteApplication: async (applicationId) => {
    set({ loading: true, error: null });
    try {
      const { error } = await applicationsService.deleteApplication(
        applicationId
      );
      if (error) throw error;
      set((state) => ({
        applications: state.applications.filter((a) => a.id !== applicationId),
        currentApplication:
          state.currentApplication?.id === applicationId
            ? null
            : state.currentApplication,
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  getApplicationResponses: async (applicationId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } =
        await applicationsService.getApplicationResponses(applicationId);
      if (error) throw error;
      set({ responses: data || [], loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  createInterviewResponse: async (
    applicationId,
    questionId,
    videoUrl,
    duration,
    transcription
  ) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await applicationsService.createInterviewResponse(
        applicationId,
        questionId,
        videoUrl,
        duration,
        transcription
      );
      if (error) throw error;
      if (data) {
        set((state) => ({
          responses: [...state.responses, data],
          loading: false,
        }));
      }
    } catch (error) {
      set({ error, loading: false });
    }
  },

  updateInterviewResponse: async (responseId, updates) => {
    set({ loading: true, error: null });
    try {
      const { data, error } =
        await applicationsService.updateInterviewResponse(responseId, updates);
      if (error) throw error;
      if (data) {
        set((state) => ({
          responses: state.responses.map((r) =>
            r.id === responseId ? data : r
          ),
          loading: false,
        }));
      }
    } catch (error) {
      set({ error, loading: false });
    }
  },

  checkExistingApplication: async (jobId, candidateId) => {
    try {
      const { exists, error } =
        await applicationsService.checkExistingApplication(jobId, candidateId);
      if (error) throw error;
      return exists;
    } catch (error) {
      console.error("Error checking existing application:", error);
      return false;
    }
  },

  clearError: () => set({ error: null }),
  reset: () =>
    set({
      applications: [],
      currentApplication: null,
      responses: [],
      loading: false,
      error: null,
    }),
}));

