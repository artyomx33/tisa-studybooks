'use client';

/**
 * StickerPage Component
 *
 * Interactive sticker sheet with:
 * - Peelable stickers
 * - Drop zones for placement
 * - Tracking of used stickers
 * - Visual feedback on placement
 */

import { useState } from 'react';
import { FONTS, LEVEL_COLORS } from '@/config/design-tokens';
import type { ContentItem, StickerFrontmatter } from '@/types/content';
import type { GradeLevel } from '@/config/design-tokens';

interface StickerPageProps {
  content: ContentItem<StickerFrontmatter>;
  gradeLevel: GradeLevel;
  onComplete?: () => void;
}

interface StickerPlacement {
  stickerId: string;
  position: { x: number; y: number };
}

export default function StickerPage({
  content,
  gradeLevel,
  onComplete: _onComplete,
}: StickerPageProps) {
  const { frontmatter } = content;
  const stickersNeeded = frontmatter.stickers_needed;
  const stickers = stickersNeeded?.stickers || [];
  const levelColors = LEVEL_COLORS[gradeLevel];

  const [usedStickers, setUsedStickers] = useState<Set<string>>(new Set());
  const [placements, setPlacements] = useState<StickerPlacement[]>([]);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  const handleStickerClick = (stickerId: string) => {
    if (usedStickers.has(stickerId)) return;
    setSelectedSticker(selectedSticker === stickerId ? null : stickerId);
  };

  const handleDropZoneClick = (zoneIndex: number) => {
    if (!selectedSticker) return;

    // Mark sticker as used
    setUsedStickers((prev) => new Set([...prev, selectedSticker]));

    // Add placement
    setPlacements((prev) => [
      ...prev,
      {
        stickerId: selectedSticker,
        position: { x: zoneIndex * 100, y: 0 },
      },
    ]);

    setSelectedSticker(null);
  };

  const usedCount = usedStickers.size;
  const totalCount = stickers.length;

  return (
    <div className="sticker-page h-full flex flex-col p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2
          className="text-xl font-bold"
          style={{ fontFamily: FONTS.display, color: levelColors.primary }}
        >
          Sticker Activity
        </h2>
        <p className="text-sm text-gray-600">
          Select a sticker, then click on a drop zone to place it
        </p>
        <div className="mt-2 text-sm">
          <span
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: levelColors.light + '30', color: levelColors.primary }}
          >
            Used: {usedCount} / {totalCount}
          </span>
        </div>
      </div>

      {/* Sticker Sheet */}
      <div
        className="rounded-lg p-4 mb-4"
        style={{ backgroundColor: '#FEF3C7', border: '2px dashed #F59E0B' }}
      >
        <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
          <span>📋</span> Sticker Sheet
        </h3>
        <div className="flex flex-wrap gap-3">
          {stickers.map((sticker) => {
            const isUsed = usedStickers.has(sticker.id);
            const isSelected = selectedSticker === sticker.id;

            return (
              <button
                key={sticker.id}
                onClick={() => handleStickerClick(sticker.id)}
                disabled={isUsed}
                className={`relative p-3 rounded-lg border-2 transition-all ${
                  isUsed
                    ? 'opacity-30 cursor-not-allowed'
                    : isSelected
                    ? 'scale-110 shadow-lg'
                    : 'hover:scale-105 cursor-pointer'
                }`}
                style={{
                  backgroundColor: 'white',
                  borderColor: isSelected ? levelColors.primary : '#E5E7EB',
                  minWidth: '100px',
                }}
              >
                {/* Sticker visual */}
                <div className="text-3xl mb-1">
                  {getStickerEmoji(sticker.id)}
                </div>
                <div className="text-xs font-medium text-gray-700">
                  {sticker.label}
                </div>

                {/* Used indicator */}
                {isUsed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                    <span className="text-green-500 text-2xl">✓</span>
                  </div>
                )}

                {/* Selection indicator */}
                {isSelected && (
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ backgroundColor: levelColors.primary }}
                  >
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Drop Zones */}
      <div className="flex-1">
        <h3
          className="font-semibold mb-3 flex items-center gap-2"
          style={{ color: levelColors.primary }}
        >
          <span>🎯</span> Drop Zones
        </h3>

        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((zoneIndex) => {
            const placement = placements.find(
              (p) => p.position.x === zoneIndex * 100
            );
            const placedSticker = placement
              ? stickers.find((s) => s.id === placement.stickerId)
              : null;

            return (
              <button
                key={zoneIndex}
                onClick={() => handleDropZoneClick(zoneIndex)}
                className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                  selectedSticker && !placedSticker
                    ? 'border-amber-400 bg-amber-50 animate-pulse'
                    : placedSticker
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                {placedSticker ? (
                  <>
                    <span className="text-4xl">{getStickerEmoji(placedSticker.id)}</span>
                    <span className="text-xs mt-2 text-gray-600">{placedSticker.label}</span>
                  </>
                ) : (
                  <>
                    <span className="text-gray-400 text-2xl">+</span>
                    <span className="text-xs text-gray-400 mt-1">Drop here</span>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected sticker indicator */}
        {selectedSticker && (
          <div
            className="mt-4 p-3 rounded-lg text-center text-sm"
            style={{ backgroundColor: levelColors.light + '30' }}
          >
            Selected:{' '}
            <strong>
              {stickers.find((s) => s.id === selectedSticker)?.label}
            </strong>
            <br />
            <span className="text-gray-500">Click a drop zone to place it</span>
          </div>
        )}
      </div>

      {/* Completion */}
      {usedCount === totalCount && totalCount > 0 && (
        <div
          className="p-4 rounded-lg text-center mt-4"
          style={{ backgroundColor: '#ECFDF5', border: '2px solid #10B981' }}
        >
          <span className="text-3xl">🎉</span>
          <p className="font-bold text-green-800 mt-2">All stickers placed!</p>
          <p className="text-sm text-green-600">
            Great job completing the sticker activity!
          </p>
        </div>
      )}
    </div>
  );
}

function getStickerEmoji(stickerId: string): string {
  // Map sticker IDs to emojis
  const emojiMap: Record<string, string> = {
    'personal-insurance': '👤',
    'property-insurance': '🏠',
    'liability-insurance': '⚖️',
    'health-insurance': '❤️',
    'car-insurance': '🚗',
    'life-insurance': '🌟',
    'money': '💰',
    'bank': '🏦',
    'savings': '🐷',
    'investment': '📈',
    'budget': '📊',
    'credit': '💳',
  };

  return emojiMap[stickerId] || '🏷️';
}
