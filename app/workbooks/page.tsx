/**
 * Workbook Catalog Page
 *
 * Displays all 10 TISA MBA workbooks in a grid layout
 * with grade-level grouping and progress indicators.
 */

import { WORKBOOKS, GRADE_NAMES } from '@/config/workbooks';
import { TISA_COLORS, FONTS } from '@/config/design-tokens';
import WorkbookCatalogClient from '@/components/workbook/WorkbookCatalogClient';

export const metadata = {
  title: 'Workbook Catalog | TISAverse Studybooks',
  description: 'Browse all TISA MBA workbooks for grades 2-7',
};

export default function WorkbookCatalogPage() {
  // Group workbooks by grade
  const workbooksByGrade = WORKBOOKS.reduce((acc, wb) => {
    if (!acc[wb.grade]) {
      acc[wb.grade] = [];
    }
    acc[wb.grade].push(wb);
    return acc;
  }, {} as Record<number, typeof WORKBOOKS>);

  const grades = Object.keys(workbooksByGrade).map(Number).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="py-8 px-6"
        style={{ backgroundColor: TISA_COLORS.purple }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ backgroundColor: TISA_COLORS.gold }}
            >
              📚
            </div>
            <div>
              <h1
                className="text-3xl font-bold text-white"
                style={{ fontFamily: FONTS.display }}
              >
                TISAverse Studybooks
              </h1>
              <p className="text-purple-200">
                Interactive workbooks for grades 2-7
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex gap-6 mt-6">
            <StatBadge
              icon="📖"
              label="Workbooks"
              value={WORKBOOKS.length}
            />
            <StatBadge
              icon="✅"
              label="Ready"
              value={WORKBOOKS.filter((w) => w.status === 'ready').length}
            />
            <StatBadge
              icon="📝"
              label="Total Pages"
              value={WORKBOOKS.reduce((sum, w) => sum + w.totalPages, 0)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {grades.map((grade) => (
          <section key={grade} className="mb-12">
            {/* Grade Header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: getGradeColor(grade),
                }}
              >
                {grade}
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: FONTS.display, color: '#374151' }}
              >
                {GRADE_NAMES[grade]}
              </h2>
              <div className="flex-1 h-px bg-gray-200 ml-4" />
            </div>

            {/* Workbook Grid - Client component for real progress */}
            <WorkbookCatalogClient workbooks={workbooksByGrade[grade]} />
          </section>
        ))}

        {/* Footer Note */}
        <div className="text-center py-8 text-gray-500">
          <p>More workbooks coming soon!</p>
          <p className="text-sm mt-2">
            Part of the TISAverse educational ecosystem
          </p>
        </div>
      </main>
    </div>
  );
}

function StatBadge({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
      <span className="text-xl">{icon}</span>
      <div>
        <div className="text-white font-bold">{value}</div>
        <div className="text-purple-200 text-xs">{label}</div>
      </div>
    </div>
  );
}

function getGradeColor(grade: number): string {
  const colors: Record<number, string> = {
    2: '#1E3A5F', // Navy
    3: '#2D5A27', // Forest
    4: '#4A7C59', // Sage
    5: '#722F37', // Wine
    6: '#C4536A', // Rose
    7: '#E07B39', // Sunset
  };
  return colors[grade] || '#6B7280';
}
