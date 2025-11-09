import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Streamline Your Hiring with AI-Powered Interview Screening
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Screen candidates 10x faster with AI-powered video interviews. Transform your hiring process with intelligent, fair, and human-centered candidate evaluation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=company" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
              For Employers
            </Link>
            <Link href="/signup?role=candidate" className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold">
              For Job Seekers
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">Interviews Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
              <p className="text-gray-600">Time Reduction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose Hire View AI?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-semibold mb-2">Save Time</h4>
            <p className="text-gray-600">Reduce screening time by 90% with AI-powered automated initial interviews and smart candidate ranking.</p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-xl font-semibold mb-2">Better Matches</h4>
            <p className="text-gray-600">Find the right candidates faster with intelligent matching based on skills, experience, and cultural fit.</p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <div className="text-4xl mb-4">😊</div>
            <h4 className="text-xl font-semibold mb-2">Improved Experience</h4>
            <p className="text-gray-600">Provide candidates with a modern, fair interview experience that respects their time and unique strengths.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Hiring?</h3>
          <p className="text-lg mb-8 opacity-90">Join hundreds of companies already using Hire View AI to find their best talent.</p>
          <Link href="/signup" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Hire View AI</h4>
              <p className="text-sm">Next generation candidate screening with AI-powered video interviews.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Hire View AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
