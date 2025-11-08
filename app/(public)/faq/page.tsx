"use client";

import { useState } from "react";
import Link from "next/link";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is Hire View AI?",
          a: "Hire View AI is an AI-powered interview screening platform that helps companies streamline their hiring process by automatically screening candidates through video interviews and intelligent ranking.",
        },
        {
          q: "How does the AI ranking work?",
          a: "Our AI analyzes video responses on four key metrics: clarity (how well candidates articulate their thoughts), confidence (tone and body language), relevance (how well they answer the question), and time compliance (staying within the time limit). Each metric is scored 0-100, and the final score is an average of all metrics.",
        },
        {
          q: "Is my data secure?",
          a: "Yes, we use enterprise-grade security with Supabase (PostgreSQL), encrypted data transmission, and comply with GDPR and CCPA regulations. All videos are stored securely and auto-deleted after 30 days.",
        },
      ],
    },
    {
      category: "For Companies",
      questions: [
        {
          q: "How many candidates can I screen?",
          a: "There's no limit on the number of candidates you can screen. Your plan determines how many job postings you can create (Basic: 10, Pro: 1,000, Unlimited: unlimited).",
        },
        {
          q: "Can I customize interview questions?",
          a: "Yes, you can create custom questions for each job posting. You can set the time limit for each question (30-180 seconds) and add as many questions as you need.",
        },
        {
          q: "How do I review candidate responses?",
          a: "You can view ranked candidates in your dashboard with their scores and compiled interview videos. You can also download individual responses or the full interview compilation.",
        },
        {
          q: "Can I integrate with my ATS?",
          a: "We offer API access on Pro and Unlimited plans. You can integrate with most popular ATS systems. Contact our support team for integration assistance.",
        },
      ],
    },
    {
      category: "For Candidates",
      questions: [
        {
          q: "How do I apply for a job?",
          a: "Browse available jobs on our job board, click apply, submit your resume and basic information, then record video responses to the interview questions.",
        },
        {
          q: "Can I re-record my responses?",
          a: "Yes, you can re-record your responses before submitting your application. Once submitted, responses cannot be changed.",
        },
        {
          q: "How long does the interview take?",
          a: "The time depends on the number of questions and time limits set by the company. Most interviews take 5-15 minutes to complete.",
        },
        {
          q: "When will I hear back?",
          a: "You'll receive your ranking and scores immediately after submitting your interview. Companies will contact you directly if they want to move forward.",
        },
      ],
    },
    {
      category: "Pricing & Billing",
      questions: [
        {
          q: "Is there a free trial?",
          a: "Yes, we offer a 14-day free trial for all plans. No credit card required to get started.",
        },
        {
          q: "Can I change my plan?",
          a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, Mastercard, American Express) and bank transfers for annual plans.",
        },
        {
          q: "Do you offer refunds?",
          a: "We offer a 30-day money-back guarantee if you're not satisfied with our service.",
        },
      ],
    },
    {
      category: "Technical",
      questions: [
        {
          q: "What browsers are supported?",
          a: "We support all modern browsers: Chrome, Firefox, Safari, and Edge. Mobile browsers are also supported for candidate interviews.",
        },
        {
          q: "What are the video quality requirements?",
          a: "We recommend a minimum internet speed of 2 Mbps for smooth video recording. Video quality is automatically optimized based on your connection.",
        },
        {
          q: "Can I download interview videos?",
          a: "Yes, companies can download individual videos or compiled interview videos from their dashboard.",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Hire View AI
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {faqs.map((section, sectionIndex) => (
          <div key={section.category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.category}</h2>
            <div className="space-y-4">
              {section.questions.map((item, itemIndex) => {
                const globalIndex = sectionIndex * 100 + itemIndex;
                const isOpen = openIndex === globalIndex;

                return (
                  <div key={item.q} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 text-left">{item.q}</h3>
                      <svg
                        className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Didn't find your answer?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help. Contact us anytime.
          </p>
          <Link href="/contact" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}

