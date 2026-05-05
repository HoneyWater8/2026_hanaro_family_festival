// 하나로 가족한마당 — Color Tokens (JS)
// 3 palettes + semantic role mapping.

export const palettes = {
  coral: {
    label: 'Coral · Festival & Warm',
    ink:          '#2A1810',
    ink2:         '#5B3A28',
    muted:        '#8B6F5E',
    primary:      '#E85A3C',
    primaryDeep:  '#C8432A',
    accent:       '#E8B93C',
    sage:         '#6B8F5E',
    cream:        '#FFF8EE',
    paper:        '#FFFDF8',
    line:         'rgba(42,24,16,0.12)',
  },
  hanbok: {
    label: 'Hanbok · Traditional & Formal',
    ink:          '#1F2340',
    ink2:         '#3B3F6B',
    muted:        '#7B7FA3',
    primary:      '#C23B4A',
    primaryDeep:  '#9B1E2C',
    accent:       '#D9A441',
    sage:         '#3D6A5C',
    cream:        '#F5EEE0',
    paper:        '#FBF6ED',
    line:         'rgba(31,35,64,0.14)',
  },
  sage: {
    label: 'Sage · Nature & Calm',
    ink:          '#223028',
    ink2:         '#3E5544',
    muted:        '#7A8D7F',
    primary:      '#D97752',
    primaryDeep:  '#B55A3A',
    accent:       '#C9A646',
    sage:         '#4F7A5C',
    cream:        '#F2EFE4',
    paper:        '#FAF8EE',
    line:         'rgba(34,48,40,0.12)',
  },
};

export const semanticRoles = {
  ink:         'Primary text — titles, numbers',
  ink2:        'Body text, paragraph copy',
  muted:       'Captions, labels, secondary info',
  primary:     'Brand accent — key UI highlights',
  primaryDeep: 'Gradient end, kicker text',
  accent:      'Secondary accent — ornaments',
  sage:        'Natural element — park, success state',
  cream:       'Section background gradients',
  paper:       'Card and container backgrounds',
  line:        'Dividers and subtle borders',
};

export const defaultPalette = 'coral';
