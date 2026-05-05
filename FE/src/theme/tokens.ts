/* ─────────────────────────────────────────────────────────
   Wave Layers · 디자인 토큰
   ───────────────────────────────────────────────────────── */

import type { AccentName } from '../data/types';

export const WL = {
  ocean:    '#439BF5',
  aqua:     '#ABF7EE',
  lime:     '#B9E68B',
  sun:      '#FFC93C',
  ink:      '#0F2A3D',
  paper:    '#F8F6F1',
  paperWarm:'#F1ECE3',
};

export const ACCENT_MAP: Record<AccentName, string> = {
  Ocean: WL.ocean,
  Sun:   WL.sun,
  Lime:  WL.lime,
  Aqua:  WL.aqua,
};

export const FF = {
  bebas: '"Bebas Neue", sans-serif',
  han:   '"Black Han Sans", "Pretendard", sans-serif',
  serif: '"Gowun Batang", serif',
  sans:  '"Pretendard", -apple-system, sans-serif',
  mono:  'ui-monospace, monospace',
};
