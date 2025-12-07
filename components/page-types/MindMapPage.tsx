'use client';

/**
 * MindMapPage Component
 *
 * Interactive mind map with:
 * - Central topic node
 * - Expandable branches
 * - Editable nodes (when allowed)
 * - Visual connections between nodes
 */

import { useState } from 'react';
import { FONTS, LEVEL_COLORS } from '@/config/design-tokens';
import type { ContentItem, MindMapFrontmatter } from '@/types/content';
import type { GradeLevel } from '@/config/design-tokens';

interface MindMapPageProps {
  content: ContentItem<MindMapFrontmatter>;
  gradeLevel: GradeLevel;
  onComplete?: () => void;
}

export default function MindMapPage({
  content,
  gradeLevel,
  onComplete: _onComplete,
}: MindMapPageProps) {
  const { frontmatter } = content;
  const centralTopic = frontmatter.central_topic || 'Main Topic';
  const initialBranches = frontmatter.branches || [];
  const isEditable = frontmatter.editable !== false;
  const levelColors = LEVEL_COLORS[gradeLevel];

  const [branches, setBranches] = useState(initialBranches);
  const [newBranch, setNewBranch] = useState('');

  const addBranch = () => {
    if (newBranch.trim() && isEditable) {
      setBranches([...branches, { label: newBranch.trim(), children: [] }]);
      setNewBranch('');
    }
  };

  return (
    <div className="mind-map-page h-full flex flex-col p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2
          className="text-xl font-bold"
          style={{ fontFamily: FONTS.display, color: levelColors.primary }}
        >
          Mind Map
        </h2>
        <p className="text-sm text-gray-600">
          {isEditable ? 'Click to expand branches or add new ones' : 'Explore the connections'}
        </p>
      </div>

      {/* Mind Map Visualization */}
      <div className="flex-1 relative overflow-auto">
        <div className="min-h-[400px] flex items-center justify-center">
          {/* Central Node */}
          <div className="relative">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-center p-4 shadow-lg z-10 relative"
              style={{
                backgroundColor: levelColors.primary,
                color: 'white',
              }}
            >
              <span className="font-bold" style={{ fontFamily: FONTS.display }}>
                {centralTopic}
              </span>
            </div>

            {/* Branches radiating out */}
            <div className="absolute inset-0 flex items-center justify-center">
              {branches.map((branch, index) => {
                const angle = (index / branches.length) * 360;
                const radius = 180;
                const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                const y = Math.sin((angle - 90) * Math.PI / 180) * radius;

                return (
                  <BranchNode
                    key={index}
                    branch={branch}
                    x={x}
                    y={y}
                    angle={angle}
                    levelColors={levelColors}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add Branch (if editable) */}
      {isEditable && (
        <div className="mt-4 pt-4 border-t flex gap-2">
          <input
            type="text"
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addBranch()}
            placeholder="Add a new branch..."
            className="flex-1 p-3 rounded-lg border-2 focus:outline-none"
            style={{ borderColor: levelColors.light }}
          />
          <button
            onClick={addBranch}
            className="px-4 py-2 rounded-lg font-semibold text-white"
            style={{ backgroundColor: levelColors.primary }}
          >
            Add
          </button>
        </div>
      )}

      {/* Branch list (text view) */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2" style={{ color: levelColors.primary }}>
          Branches:
        </h3>
        <ul className="space-y-1">
          {branches.map((branch, index) => (
            <li key={index} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getBranchColor(index) }}
              />
              <span>{branch.label}</span>
              {branch.children && branch.children.length > 0 && (
                <span className="text-sm text-gray-500">
                  ({branch.children.length} sub-items)
                </span>
              )}
            </li>
          ))}
          {branches.length === 0 && (
            <li className="text-gray-500 italic">No branches yet</li>
          )}
        </ul>
      </div>
    </div>
  );
}

interface BranchNodeProps {
  branch: { label: string; children?: string[] };
  x: number;
  y: number;
  angle: number;
  levelColors: typeof LEVEL_COLORS[keyof typeof LEVEL_COLORS];
  index: number;
}

function BranchNode({ branch, x, y, angle: _angle, levelColors, index }: BranchNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const branchColor = getBranchColor(index);

  return (
    <div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Connection line */}
      <svg
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          width: '200px',
          height: '200px',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <line
          x1="100"
          y1="100"
          x2={100 - x * 0.6}
          y2={100 - y * 0.6}
          stroke={branchColor}
          strokeWidth="3"
          opacity="0.5"
        />
      </svg>

      {/* Branch node */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative z-10 px-4 py-2 rounded-lg shadow-md min-w-[100px] text-center transition-all hover:scale-105"
        style={{
          backgroundColor: branchColor,
          color: 'white',
        }}
      >
        <span className="font-medium">{branch.label}</span>
        {branch.children && branch.children.length > 0 && (
          <span className="ml-2 text-xs opacity-80">
            {isExpanded ? '−' : '+'}
          </span>
        )}
      </button>

      {/* Children (when expanded) */}
      {isExpanded && branch.children && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 space-y-1"
        >
          {branch.children.map((child, childIndex) => (
            <div
              key={childIndex}
              className="px-3 py-1 rounded text-sm whitespace-nowrap"
              style={{
                backgroundColor: branchColor + '30',
                color: levelColors.dark,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getBranchColor(index: number): string {
  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#06B6D4', // cyan
    '#F97316', // orange
  ];
  return colors[index % colors.length];
}
