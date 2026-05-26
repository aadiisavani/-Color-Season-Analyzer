// Convert RGB to HSL
export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [h * 360, s * 100, l * 100];
};

// Determine undertone (warm/cool) based on hue
export const determineUndertone = (hue: number): 'warm' | 'cool' => {
  // Warm: 0-60° (red/orange/yellow) and 300-360° (red)
  // Cool: 60-300° (yellow-green to blue-red)
  if ((hue >= 0 && hue <= 60) || (hue >= 300 && hue <= 360)) {
    return 'warm';
  }
  return 'cool';
};

// Determine value (light/dark) based on lightness
export const determineValue = (lightness: number): 'light' | 'dark' => {
  return lightness > 50 ? 'light' : 'dark';
};

// Calculate contrast between skin and hair
export const calculateContrast = (skinLightness: number, hairLightness: number): 'high' | 'low' => {
  const contrast = Math.abs(skinLightness - hairLightness);
  return contrast > 30 ? 'high' : 'low';
};

// Determine season based on undertone, value, and contrast
export const determineSeason = (
  undertone: 'warm' | 'cool',
  value: 'light' | 'dark',
  contrast: 'high' | 'low'
) => {
  if (undertone === 'warm' && value === 'light' && contrast === 'high') {
    return 'Spring';
  } else if (undertone === 'warm' && value === 'dark' && contrast === 'low') {
    return 'Autumn';
  } else if (undertone === 'cool' && value === 'light' && contrast === 'low') {
    return 'Summer';
  } else if (undertone === 'cool' && value === 'dark' && contrast === 'high') {
    return 'Winter';
  }

  // Fallback
  return 'Unknown';
};

// Get color palette for season
export const getSeasonColors = (
  season: string
): { name: string; hex: string; rgb: string }[] => {
  const palettes: Record<string, { name: string; hex: string; rgb: string }[]> = {
    Spring: [
      { name: 'Peach', hex: '#FFCC99', rgb: 'rgb(255, 204, 153)' },
      { name: 'Coral', hex: '#FF7F50', rgb: 'rgb(255, 127, 80)' },
      { name: 'Golden Yellow', hex: '#FFD700', rgb: 'rgb(255, 215, 0)' },
      { name: 'Aqua', hex: '#00CED1', rgb: 'rgb(0, 206, 209)' },
      { name: 'Mint Green', hex: '#98FF98', rgb: 'rgb(152, 255, 152)' },
      { name: 'Light Pink', hex: '#FFB6C1', rgb: 'rgb(255, 182, 193)' },
      { name: 'Warm Beige', hex: '#F5DEB3', rgb: 'rgb(245, 222, 179)' },
      { name: 'Bright White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)' },
    ],
    Autumn: [
      { name: 'Terracotta', hex: '#CD5C5C', rgb: 'rgb(205, 92, 92)' },
      { name: 'Olive Green', hex: '#6B8E23', rgb: 'rgb(107, 142, 35)' },
      { name: 'Mustard', hex: '#FFDB58', rgb: 'rgb(255, 219, 88)' },
      { name: 'Rust', hex: '#B7410E', rgb: 'rgb(183, 65, 14)' },
      { name: 'Burnt Orange', hex: '#CC5500', rgb: 'rgb(204, 85, 0)' },
      { name: 'Warm Brown', hex: '#8B4513', rgb: 'rgb(139, 69, 19)' },
      { name: 'Gold', hex: '#FFD700', rgb: 'rgb(255, 215, 0)' },
      { name: 'Cream', hex: '#FFFDD0', rgb: 'rgb(255, 253, 208)' },
    ],
    Summer: [
      { name: 'Dusty Rose', hex: '#D8BFD8', rgb: 'rgb(216, 191, 216)' },
      { name: 'Lavender', hex: '#E6E6FA', rgb: 'rgb(230, 230, 250)' },
      { name: 'Powder Blue', hex: '#B0E0E6', rgb: 'rgb(176, 224, 230)' },
      { name: 'Soft Gray', hex: '#C0C0C0', rgb: 'rgb(192, 192, 192)' },
      { name: 'Mauve', hex: '#E0B0FF', rgb: 'rgb(224, 176, 255)' },
      { name: 'Soft Taupe', hex: '#B38B6D', rgb: 'rgb(179, 139, 109)' },
      { name: 'Light Aqua', hex: '#AFEEEE', rgb: 'rgb(175, 238, 238)' },
      { name: 'Pearl Pink', hex: '#FDEEF4', rgb: 'rgb(253, 238, 244)' },
    ],
    Winter: [
      { name: 'Ruby Red', hex: '#E0115F', rgb: 'rgb(224, 17, 95)' },
      { name: 'Emerald', hex: '#50C878', rgb: 'rgb(80, 200, 120)' },
      { name: 'Royal Blue', hex: '#4169E1', rgb: 'rgb(65, 105, 225)' },
      { name: 'Black', hex: '#000000', rgb: 'rgb(0, 0, 0)' },
      { name: 'Icy White', hex: '#F0F8FF', rgb: 'rgb(240, 248, 255)' },
      { name: 'Deep Purple', hex: '#663399', rgb: 'rgb(102, 51, 153)' },
      { name: 'Magenta', hex: '#FF00FF', rgb: 'rgb(255, 0, 255)' },
      { name: 'Navy', hex: '#000080', rgb: 'rgb(0, 0, 128)' },
    ],
  };

  return palettes[season] || [];
};

// Get season description
export const getSeasonDescription = (season: string): string => {
  const descriptions: Record<string, string> = {
    Spring: 'You are a True Spring! Your warm undertone and high contrast means you look best in fresh, clear, bright colors.',
    Autumn: 'You are a True Autumn! Your warm undertone and low contrast means you look best in rich, earthy, muted colors.',
    Summer: 'You are a True Summer! Your cool undertone and low contrast means you look best in soft, muted, pastel colors.',
    Winter: 'You are a True Winter! Your cool undertone and high contrast means you look best in bold, striking, jewel tones.',
  };

  return descriptions[season] || 'Discover your color season!';
};
