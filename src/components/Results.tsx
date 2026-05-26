import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import {
  rgbToHsl,
  determineUndertone,
  determineValue,
  calculateContrast,
  determineSeason,
  getSeasonColors,
  getSeasonDescription,
} from '../utils/colorAnalysis';

interface ResultsProps {
  skinColor: string;
  hairColor: string;
  eyeColor: string;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ skinColor, hairColor, eyeColor, onReset }) => {
  const resultCardRef = useRef<HTMLDivElement>(null);

  // Parse RGB color string to numbers
  const parseRgb = (rgbString: string): [number, number, number] => {
    const match = rgbString.match(/\d+/g);
    if (!match) return [0, 0, 0];
    return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
  };

  // Calculate season
  const [skinR, skinG, skinB] = parseRgb(skinColor);
  const [hairR, hairG, hairB] = parseRgb(hairColor);

  const [skinH, , skinL] = rgbToHsl(skinR, skinG, skinB);
  const [, , hairL] = rgbToHsl(hairR, hairG, hairB);

  const undertone = determineUndertone(skinH);
  const value = determineValue(hairL);
  const contrast = calculateContrast(skinL, hairL);

  const season = determineSeason(undertone, value, contrast);
  const colors = getSeasonColors(season);
  const description = getSeasonDescription(season);

  const seasonGradients: Record<string, string> = {
    Spring: 'from-yellow-300 to-orange-300',
    Autumn: 'from-orange-400 to-red-600',
    Summer: 'from-pink-300 to-purple-300',
    Winter: 'from-blue-600 to-indigo-900',
  };

  const seasonGradient = seasonGradients[season] || 'from-purple-400 to-pink-400';

  const downloadResult = async () => {
    if (!resultCardRef.current) return;

    try {
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${season}-Color-Season.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading result:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-3xl w-full">
        {/* Result Card */}
        <div
          ref={resultCardRef}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Header with season gradient */}
          <div className={`bg-gradient-to-r ${seasonGradient} p-8 text-white text-center`}>
            <h1 className="text-5xl font-bold mb-2">You are a</h1>
            <h2 className="text-6xl font-black mb-4">{season}</h2>
            <p className="text-lg font-light">{description}</p>
          </div>

          {/* Color Analysis Details */}
          <div className="p-8 bg-gradient-to-b from-gray-50 to-white border-t-4 border-gray-200">
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <p className="text-sm text-gray-500 font-semibold mb-2">UNDERTONE</p>
                <div className="text-2xl font-bold text-gray-800 capitalize bg-gray-100 rounded-lg py-3">
                  {undertone}
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 font-semibold mb-2">VALUE</p>
                <div className="text-2xl font-bold text-gray-800 capitalize bg-gray-100 rounded-lg py-3">
                  {value}
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 font-semibold mb-2">CONTRAST</p>
                <div className="text-2xl font-bold text-gray-800 capitalize bg-gray-100 rounded-lg py-3">
                  {contrast}
                </div>
              </div>
            </div>

            {/* Your Detected Colors */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Your Colors</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div
                    className="w-full h-24 rounded-xl shadow-lg mb-2"
                    style={{ backgroundColor: skinColor }}
                  ></div>
                  <p className="text-sm font-semibold text-gray-700">Skin</p>
                </div>
                <div className="text-center">
                  <div
                    className="w-full h-24 rounded-xl shadow-lg mb-2"
                    style={{ backgroundColor: hairColor }}
                  ></div>
                  <p className="text-sm font-semibold text-gray-700">Hair</p>
                </div>
                <div className="text-center">
                  <div
                    className="w-full h-24 rounded-xl shadow-lg mb-2"
                    style={{ backgroundColor: eyeColor }}
                  ></div>
                  <p className="text-sm font-semibold text-gray-700">Eye</p>
                </div>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="p-8 bg-white">
            <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider">Your {season} Palette</h3>
            <div className="grid grid-cols-4 gap-4">
              {colors.map((color, index) => (
                <div key={index} className="text-center">
                  <div
                    className="color-card mb-2"
                    style={{ backgroundColor: color.hex }}
                  >
                    {color.hex}
                  </div>
                  <p className="text-xs font-semibold text-gray-700">{color.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Monetization Section - In Result Card */}
          <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 border-t-2 border-purple-200">
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Ready to Shop?</h3>
            <a
              href="https://gumroad.com/YOUR_USERNAME/YOUR_PRODUCT_ID" // Replace with actual Gumroad link
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full block text-center mb-3"
            >
              📖 Get Your Complete 12-Season Guide ($2.99)
            </a>
            <p className="text-xs text-gray-600 text-center">
              Unlock detailed styling tips, makeup matching, and wardrobe suggestions for your season.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button onClick={downloadResult} className="btn-primary">
            📥 Download Your Result
          </button>
          <button onClick={onReset} className="btn-secondary">
            🔄 Try Again
          </button>
        </div>

        {/* Monetization - Bottom Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200 text-center">
          <p className="text-gray-700 mb-4">Loved this tool? Support us!</p>
          <a
            href="https://buymeacoffee.com/YOUR_USERNAME" // Replace with actual Ko-fi link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block btn-secondary"
          >
            ☕ Buy me a Coffee
          </a>
        </div>
      </div>
    </div>
  );
};
