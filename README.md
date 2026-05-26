# Color Season Analyzer

A beautiful React + TypeScript + Tailwind CSS web app that determines your color season (Spring, Summer, Autumn, or Winter) based on your skin tone, hair color, and eye color.

## Features

- 📸 **Image Upload**: Upload a selfie with natural lighting
- 👁️ **Color Detection**: Click three specific areas to extract RGB values
- 🎨 **Color Analysis**: Converts RGB to HSL and analyzes undertone, value, and contrast
- 🌈 **Personalized Palette**: Get 8 colors tailored to your season
- 📥 **Download Results**: Save your color palette as an image
- 💰 **Monetization Ready**: Built-in Gumroad and Ko-fi integration

## Tech Stack

- **React** 18 with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for modern, responsive styling
- **html2canvas** for downloading results as images

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will run at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Upload.tsx      # Initial image upload component
│   ├── Eyedropper.tsx  # Color selection interface
│   └── Results.tsx     # Results and color palette display
├── utils/
│   └── colorAnalysis.ts # Color math and season logic
├── App.tsx             # Main app component
├── App.css             # App-specific styles
├── index.css           # Tailwind CSS imports
└── main.tsx            # Entry point
```

## Color Analysis Logic

The app determines your season through three questions:

1. **Undertone (Warm/Cool)**: Based on hue values
2. **Value (Light/Dark)**: Based on hair and eye lightness
3. **Contrast (High/Low)**: Based on difference between skin and hair lightness

| Season | Undertone | Value | Contrast |
|--------|-----------|-------|----------|
| Spring | Warm | Light | High |
| Autumn | Warm | Dark | Low |
| Summer | Cool | Light | Low |
| Winter | Cool | Dark | High |

## Monetization

### Included
- ✅ Gumroad button for $2.99 PDF guide upsell
- ✅ Ko-fi tip jar for donations
- ✅ Download functionality for viral sharing

### For v2
- Affiliate links to ASOS, Amazon, Shein, H&M
- Google AdSense banner ads
- Dynamic color product recommendations

## Deployment

The app is ready to deploy on **Vercel**:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy on every push

## License

MIT

## Support

For issues or suggestions, please create an issue in the repository.

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
