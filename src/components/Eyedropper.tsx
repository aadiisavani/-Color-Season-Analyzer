import React, { useRef, useState, useEffect } from 'react';

interface EyedropperProps {
  imageSrc: string;
  onColorsDetected: (skinColor: string, hairColor: string, eyeColor: string) => void;
}

export const Eyedropper: React.FC<EyedropperProps> = ({ imageSrc, onColorsDetected }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [clicks, setClicks] = useState<number>(0);
  const [colors, setColors] = useState<{ skin?: string; hair?: string; eye?: string }>({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((event.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((event.clientY - rect.top) / rect.height) * canvas.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(x, y, 1, 1);
    const [r, g, b] = imageData.data;
    const rgbColor = `rgb(${r}, ${g}, ${b})`;

    const newClicks = clicks + 1;
    const newColors = { ...colors };

    if (newClicks === 1) {
      newColors.skin = rgbColor;
    } else if (newClicks === 2) {
      newColors.hair = rgbColor;
    } else if (newClicks === 3) {
      newColors.eye = rgbColor;
    }

    setColors(newColors);
    setClicks(newClicks);

    // When all three colors are selected, call the callback
    if (newClicks === 3) {
      setTimeout(() => {
        onColorsDetected(newColors.skin!, newColors.hair!, newColors.eye!);
      }, 500);
    }
  };

  const steps = ['Center of forehead or cheek (Skin Tone)', 'Mid-tone section of hair (Hair Color)', 'Iris of eye (Eye Color)'];
  const currentStep = clicks < 3 ? steps[clicks] : 'Complete!';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Color Detection
          </h1>
          <p className="text-gray-600 text-lg">Click on your photo in this order:</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="aspect-video bg-gray-200 relative cursor-crosshair">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full h-full cursor-crosshair object-cover"
              style={{ display: 'block' }}
            />
            {clicks < 3 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
                <div className="text-center">
                  <div className="text-white text-xl font-bold mb-2">Click #{clicks + 1}</div>
                  <div className="text-white text-lg">{currentStep}</div>
                </div>
              </div>
            )}
          </div>

          {/* Progress Indicators */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => (
                <div key={index} className="flex-1">
                  <div
                    className={`flex items-center ${index < steps.length - 1 ? 'mb-4' : ''}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${
                        index < clicks ? 'bg-green-500' : index === clicks ? 'bg-purple-500' : 'bg-gray-300'
                      }`}
                    >
                      {index < clicks ? '✓' : index + 1}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className={`text-sm font-semibold ${index < clicks ? 'text-green-600' : 'text-gray-700'}`}>
                        {step}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Color Preview */}
            {clicks > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                {colors.skin && (
                  <div className="text-center">
                    <div className="w-full h-16 rounded-lg shadow mb-2" style={{ backgroundColor: colors.skin }}></div>
                    <p className="text-sm font-semibold text-gray-700">Skin</p>
                  </div>
                )}
                {colors.hair && (
                  <div className="text-center">
                    <div className="w-full h-16 rounded-lg shadow mb-2" style={{ backgroundColor: colors.hair }}></div>
                    <p className="text-sm font-semibold text-gray-700">Hair</p>
                  </div>
                )}
                {colors.eye && (
                  <div className="text-center">
                    <div className="w-full h-16 rounded-lg shadow mb-2" style={{ backgroundColor: colors.eye }}></div>
                    <p className="text-sm font-semibold text-gray-700">Eye</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {clicks < 3 && (
          <button
            onClick={() => {
              setClicks(0);
              setColors({});
            }}
            className="btn-secondary w-full"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};
