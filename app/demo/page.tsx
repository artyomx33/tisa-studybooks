'use client';

/**
 * Demo Page
 *
 * Showcases all design system components for testing and verification.
 */

import { BasePage, PageHeader, PurpleBar } from '@/components/design-system';
import { LEVEL_COLORS, OWL_COLORS, TISA_COLORS } from '@/config/design-tokens';
import type { GradeLevel } from '@/config/design-tokens';

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8" style={{ color: TISA_COLORS.purple }}>
          TISAverse Studybooks - Component Demo
        </h1>

        {/* Design Tokens Display */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Design Tokens</h2>

          {/* TISA Brand Colors */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">TISA Brand Colors</h3>
            <div className="flex gap-4">
              {Object.entries(TISA_COLORS).map(([name, color]) => (
                <div key={name} className="text-center">
                  <div
                    className="w-20 h-20 rounded-lg shadow-md"
                    style={{ backgroundColor: color }}
                  />
                  <div className="text-sm mt-1 font-medium">{name}</div>
                  <div className="text-xs text-gray-500">{color}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Level Colors */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Level Colors (by Grade)</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {Object.entries(LEVEL_COLORS).map(([grade, colors]) => (
                <div key={grade} className="text-center">
                  <div
                    className="h-16 rounded-lg shadow-md"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <div className="text-sm mt-1 font-medium">{grade.replace('_', ' ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Owl Colors */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Owl System Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {Object.entries(OWL_COLORS).map(([owl, data]) => (
                <div key={owl} className="text-center">
                  <div
                    className="h-16 rounded-lg shadow-md flex items-center justify-center"
                    style={{ backgroundColor: data.bg }}
                  >
                    <span
                      className="text-2xl font-bold"
                      style={{ color: data.color }}
                    >
                      {owl.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm mt-1 font-medium">{data.name}</div>
                  <div className="text-xs text-gray-500">{data.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BasePage Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">BasePage Component</h2>
          <p className="text-gray-600 mb-4">
            A4 container (210mm x 297mm) with PurpleBar footer. Each grade level has its own color scheme.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Grade 3 Example */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Grade 3 - Economics Fairy Tales</h3>
              <div className="transform scale-50 origin-top-left" style={{ width: '200%' }}>
                <BasePage
                  gradeLevel="grade_3"
                  pageNumber={12}
                  workbookTitle="Economics through Fairy Tales"
                >
                  <PageHeader
                    gradeLevel="grade_3"
                    lessonNumber={2}
                    lessonTitle="Money"
                    blockName="Kingdom Chronicle"
                    componentNumber={1}
                  />
                  <div className="flex-1 p-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-800 mb-2">Sample Story Content</h4>
                      <p className="text-gray-700" style={{ fontFamily: 'Crimson Text, serif' }}>
                        Once upon a time, in the Kingdom of Econoland, there lived a wise king
                        who wanted to teach his subjects about the importance of money...
                      </p>
                    </div>
                  </div>
                </BasePage>
              </div>
            </div>

            {/* Grade 5 Example */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Grade 5 - My Company</h3>
              <div className="transform scale-50 origin-top-left" style={{ width: '200%' }}>
                <BasePage
                  gradeLevel="grade_5"
                  pageNumber={45}
                  workbookTitle="My Company"
                >
                  <PageHeader
                    gradeLevel="grade_5"
                    lessonNumber={5}
                    lessonTitle="Business Planning"
                    blockName="Owl Practica Challenge"
                    componentNumber={3}
                  />
                  <div className="flex-1 p-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-bold text-red-800 mb-2">Sample Task Content</h4>
                      <p className="text-gray-700">
                        Create a business plan for your imaginary company. Include:
                      </p>
                      <ul className="list-disc list-inside mt-2 text-gray-600">
                        <li>Company name and logo</li>
                        <li>Product or service description</li>
                        <li>Target customers</li>
                      </ul>
                    </div>
                  </div>
                </BasePage>
              </div>
            </div>
          </div>
        </section>

        {/* All Grade Colors Preview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">All Grade Level Headers</h2>
          <div className="space-y-4">
            {(Object.keys(LEVEL_COLORS) as GradeLevel[]).map((grade) => (
              <PageHeader
                key={grade}
                gradeLevel={grade}
                lessonNumber={1}
                lessonTitle={`Sample Lesson for ${grade.replace('_', ' ')}`}
                blockName="Demo Block"
                componentNumber={1}
              />
            ))}
          </div>
        </section>

        {/* PurpleBar Standalone */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">PurpleBar Component</h2>
          <p className="text-gray-600 mb-4">
            The ever-present TISA purple footer. Height: 18mm (68px on screen).
          </p>
          <div className="max-w-md">
            <PurpleBar
              pageNumber={42}
              workbookTitle="Economics through Fairy Tales"
            />
          </div>
        </section>

        {/* Status */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Week 1 Foundation Status</h2>
          <ul className="space-y-2">
            <li className="flex items-center text-green-700">
              <span className="mr-2">✓</span> Design Tokens Created
            </li>
            <li className="flex items-center text-green-700">
              <span className="mr-2">✓</span> TypeScript Types Defined
            </li>
            <li className="flex items-center text-green-700">
              <span className="mr-2">✓</span> BasePage Component
            </li>
            <li className="flex items-center text-green-700">
              <span className="mr-2">✓</span> PurpleBar Component
            </li>
            <li className="flex items-center text-green-700">
              <span className="mr-2">✓</span> PageHeader Component
            </li>
            <li className="flex items-center text-green-700">
              <span className="mr-2">✓</span> Content Loader
            </li>
            <li className="flex items-center text-green-700">
              <span className="mr-2">✓</span> Page Renderer (with placeholders)
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t">
            <a
              href="/"
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              ← Back to Home
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
