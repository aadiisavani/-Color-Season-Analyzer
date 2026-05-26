# Color Season Analyzer - Project Setup

## Project Overview

A viral React + TypeScript + Tailwind CSS web app for seasonal color analysis. Users upload a selfie, click three color points (skin, hair, eye), and get their color season (Spring, Summer, Autumn, Winter) with a personalized 8-color palette.

**Tech Stack**: React 18 + TypeScript + Vite + Tailwind CSS + html2canvas

## Quick Start

```bash
npm install
npm run dev
```

The app will run at `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Upload.tsx      # Image upload with drag-and-drop
│   ├── Eyedropper.tsx  # Click to extract RGB colors
│   └── Results.tsx     # Season results + color palette
├── utils/
│   └── colorAnalysis.ts # RGB→HSL conversion, season logic
├── App.tsx             # State management
├── App.css             # App-specific styles
├── index.css           # Tailwind CSS + custom components
├── main.tsx            # React entry point
└── vite.config.ts      # Vite configuration
```

## Key Features

1. **Color Math**: Converts RGB pixels to HSL to extract undertone, value, and contrast
2. **Season Logic**: Determines season based on 3 questions (warm/cool, light/dark, high/low contrast)
3. **Monetization**: Built-in Gumroad ($2.99 PDF upsell) and Ko-fi tip jar links
4. **Download**: Users can download their result as an image for sharing on TikTok/Instagram

## Deployment

Ready for **Vercel** deployment:
- Connect GitHub repo to Vercel
- Auto-deploys on every push
- Includes automatic SSL and global CDN

## Development Checklist

- [x] Scaffold React + TypeScript + Vite project
- [x] Install and configure Tailwind CSS
- [x] Create color analysis utilities (RGB→HSL, season logic)
- [x] Build Upload component with drag-and-drop
- [x] Build Eyedropper component with canvas color detection
- [x] Build Results component with color palette and monetization
- [x] Implement state management with React hooks
- [x] Configure Tailwind + create custom button styles
- [x] Fix CSS/TypeScript compilation errors
- [x] Build and verify production build

## Next Steps for v2

1. **Affiliate Links**: Add Amazon, ASOS, Shein, H&M shopping links
2. **Google AdSense**: Banner ads on results page
3. **Advanced Analytics**: Track seasons, referral sources
4. **Mobile Optimization**: Fine-tune for mobile conversion
5. **Social Sharing**: Built-in share buttons (Twitter, Pinterest, TikTok)

## Monetization Endpoints

- Gumroad link (replace with actual link): `https://gumroad.com/...`
- Ko-fi link (replace with actual link): `https://ko-fi.com/...`

## Dependencies

- `react` - UI library
- `react-dom` - React rendering
- `typescript` - Type safety
- `vite` - Build tool
- `tailwindcss` - Utility CSS
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes
- `html2canvas` - Download results as PNG

## Notes

- The app is optimized for mobile-first design
- Natural lighting requirement is critical for accurate color detection
- Season determination uses mathematical color analysis, not AI
- No backend required - fully client-side processing
