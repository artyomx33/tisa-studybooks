import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-tisa-purple mb-4">
            TISAverse Studybooks
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Beautiful, Interactive Educational Workbooks
          </p>
          <div className="w-24 h-1 bg-tisa-purple mx-auto mb-8"></div>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 animate-scale-in"
        >
          <h2 className="text-2xl font-bold text-tisa-purple mb-6">
            ✅ Phase 1: Foundation - Ready to Build!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Tech Stack</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-tisa-purple mr-2">✓</span>
                  Next.js 16.0.7
                </li>
                <li className="flex items-center">
                  <span className="text-tisa-purple mr-2">✓</span>
                  React 19.2.1
                </li>
                <li className="flex items-center">
                  <span className="text-tisa-purple mr-2">✓</span>
                  TypeScript 5.9.3
                </li>
                <li className="flex items-center">
                  <span className="text-tisa-purple mr-2">✓</span>
                  Tailwind CSS 4.1.17
                </li>
                <li className="flex items-center">
                  <span className="text-tisa-purple mr-2">✓</span>
                  motion 4.0.2
                </li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-tisa-purple mr-2">✓</span>
                  13 Page Type Components
                </li>
                <li className="flex items-center">
                  <span className="text-tisa-purple mr-2">✓</span>
                  A4 Page Rendering
                </li>
                <li className="flex items-center">
                  <span className="text-tisa-purple mr-2">✓</span>
                  Smooth Animations
                </li>
                <li className="flex items-center">
                  <span className="text-tisa-purple mr-2">✓</span>
                  PDF Export
                </li>
                <li className="flex items-center">
                  <span className="text-tisa-purple mr-2">✓</span>
                  Drawing Canvas
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-tisa-cream p-6 rounded-lg mb-8">
            <p className="text-gray-800">
              <strong>Status:</strong> Project foundation created with all latest stable dependencies.
              Ready to build Phase 1 (Week 1-4 timeline).
            </p>
          </div>

          {/* Next Steps */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Next Steps</h3>
            <ol className="space-y-2 text-gray-700 list-decimal list-inside">
              <li>
                <strong>Week 1:</strong> Create BasePage component + PurpleBar + markdown parser
              </li>
              <li>
                <strong>Week 2:</strong> Build all 13 page type components
              </li>
              <li>
                <strong>Week 3:</strong> Navigation, PDF export, progress tracking
              </li>
              <li>
                <strong>Week 4:</strong> Integration, analytics, polish
              </li>
            </ol>
          </div>
        </div>

        {/* Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up"
        >
          <Link
            href="/docs"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-bold text-tisa-purple mb-2">📚 Documentation</h3>
            <p className="text-gray-700">
              Complete guides, architecture, and implementation plans
            </p>
          </Link>

          <Link
            href="/workbooks"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-bold text-tisa-purple mb-2">📖 Workbooks</h3>
            <p className="text-gray-700">
              View rendered workbooks and test pages
            </p>
          </Link>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-tisa-purple mb-2">🚀 Deploy</h3>
            <p className="text-gray-700">
              Ready for production deployment to Vercel
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600"
        >
          <p>
            TISAverse Studybooks • Powered by Next.js 16 + React 19 + Tailwind CSS
          </p>
          <p className="mt-2 text-sm">
            Building beautiful educational experiences through code ✨
          </p>
        </div>
      </div>
    </main>
  );
}
