import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "$99",
      period: "/year",
      description: "Perfect for small teams",
      features: [
        "10 job postings",
        "Unlimited candidates",
        "AI-powered screening",
        "Video interviews",
        "Basic analytics",
        "Email support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$499",
      period: "/year",
      description: "For growing companies",
      features: [
        "1,000 job postings",
        "Unlimited candidates",
        "AI-powered screening",
        "Video interviews",
        "Advanced analytics",
        "Priority support",
        "Custom branding",
        "API access",
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Unlimited",
      price: "$1,999",
      period: "/year",
      description: "For enterprise",
      features: [
        "Unlimited job postings",
        "Unlimited candidates",
        "AI-powered screening",
        "Video interviews",
        "Advanced analytics",
        "24/7 support",
        "Custom branding",
        "API access",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your hiring needs. All plans include our AI-powered screening technology.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border-2 p-8 transition ${
                plan.highlighted
                  ? "border-blue-600 bg-blue-50 shadow-lg scale-105"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4">
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes, we offer a 14-day free trial for all plans. No credit card required to get started.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards (Visa, Mastercard, American Express) and bank transfers for annual plans.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer discounts for annual billing?</h3>
              <p className="text-gray-600">Yes, all our pricing is for annual billing. We offer 20% discount if you pay for 2 years upfront.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8 opacity-90">Join hundreds of companies already using Hire View AI to find their best talent.</p>
          <Link href="/signup?role=company" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold">
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </main>
  );
}

