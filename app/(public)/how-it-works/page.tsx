import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "1",
      title: "Create Job Posting",
      description: "Post your job opening with custom interview questions tailored to your role.",
      icon: "📝",
    },
    {
      number: "2",
      title: "Candidates Apply",
      description: "Candidates discover your job and apply with their resume and basic information.",
      icon: "👥",
    },
    {
      number: "3",
      title: "Record Interviews",
      description: "Candidates record timed video responses to your interview questions.",
      icon: "🎥",
    },
    {
      number: "4",
      title: "AI Screening",
      description: "Our AI analyzes clarity, confidence, relevance, and time compliance automatically.",
      icon: "🤖",
    },
    {
      number: "5",
      title: "Review Results",
      description: "Get ranked candidates with detailed scoring and compiled interview videos.",
      icon: "📊",
    },
    {
      number: "6",
      title: "Make Offers",
      description: "Contact top candidates and move forward with your hiring process.",
      icon: "✅",
    },
  ];

  const benefits = [
    {
      title: "Save 90% of Screening Time",
      description: "Automate initial screening and focus on top candidates",
    },
    {
      title: "Fair & Unbiased Evaluation",
      description: "AI scoring removes human bias from initial screening",
    },
    {
      title: "Better Candidate Experience",
      description: "Modern, convenient interview process candidates appreciate",
    },
    {
      title: "Detailed Analytics",
      description: "Understand your hiring funnel with comprehensive metrics",
    },
    {
      title: "Compiled Video Interviews",
      description: "Easy-to-review candidate videos in one place",
    },
    {
      title: "Scalable Hiring",
      description: "Screen hundreds of candidates without increasing workload",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Hire View AI Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A simple, streamlined process to find your best talent faster
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="text-6xl mb-4">{step.icon}</div>
                <div className="inline-block bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {parseInt(step.number) < 6 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* For Companies */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">For Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Streamlined Hiring</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span className="text-gray-700">Post jobs and customize interview questions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span className="text-gray-700">Automatically screen candidates with AI</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span className="text-gray-700">Get ranked candidates with detailed scores</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span className="text-gray-700">Review compiled interview videos</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h4 className="font-semibold text-gray-900 mb-4">Key Metrics</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Average Time Saved</p>
                  <p className="text-2xl font-bold text-blue-600">90%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Candidates Screened</p>
                  <p className="text-2xl font-bold text-blue-600">Unlimited</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Setup Time</p>
                  <p className="text-2xl font-bold text-blue-600">5 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Candidates */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">For Candidates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-emerald-50 rounded-lg p-8 shadow-md">
              <h4 className="font-semibold text-gray-900 mb-4">Why Candidates Love It</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Flexibility</p>
                  <p className="text-lg font-semibold text-gray-900">Record on your schedule</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fairness</p>
                  <p className="text-lg font-semibold text-gray-900">AI-powered, unbiased evaluation</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Transparency</p>
                  <p className="text-lg font-semibold text-gray-900">Know your ranking and scores</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Simple Application Process</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-emerald-600 font-bold mr-3">✓</span>
                  <span className="text-gray-700">Browse available job openings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 font-bold mr-3">✓</span>
                  <span className="text-gray-700">Submit your resume and basic info</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 font-bold mr-3">✓</span>
                  <span className="text-gray-700">Record video responses to questions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 font-bold mr-3">✓</span>
                  <span className="text-gray-700">Get instant feedback and ranking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your hiring?</h2>
          <p className="text-lg mb-8 opacity-90">Start screening candidates smarter today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=company" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold">
              For Companies
            </Link>
            <Link href="/signup?role=candidate" className="inline-block px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-blue-700 font-semibold">
              For Candidates
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

