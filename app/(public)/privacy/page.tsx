export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              Hire View AI ("we", "us", "our", or "Company") operates the hireviewai.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Types of Data Collected:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Personal Data:</strong> Email address, name, phone number, address, cookies and usage data</li>
              <li><strong>Video Data:</strong> Interview recordings and transcriptions</li>
              <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time and date of visit</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use of Data</h2>
            <p>Hire View AI uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Video Data Retention</h2>
            <p>
              Interview videos and related data are automatically deleted 30 days after the interview is completed. Companies can download videos before the deletion period if they wish to retain them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. GDPR Compliance</h2>
            <p>
              If you are a resident of the European Economic Area (EEA), you have certain data protection rights. Hire View AI aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
            </p>
            <p className="mt-4">Your rights include:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The right to access your personal data</li>
              <li>The right to correct inaccurate data</li>
              <li>The right to request deletion of your data</li>
              <li>The right to restrict processing of your data</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. CCPA Compliance</h2>
            <p>
              If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA). You have the right to know what personal information is collected, used, shared or sold, and the right to delete personal information collected from you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Services</h2>
            <p>
              Our Service may contain links to third-party sites that are not operated by us. This Privacy Policy does not apply to third-party websites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party services before providing your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the bottom of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-4">
              Email: privacy@hireviewai.com<br />
              Address: 123 Tech Street, San Francisco, CA 94105
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-12">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}

