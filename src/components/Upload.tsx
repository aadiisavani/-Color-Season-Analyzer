import React, { useRef } from 'react';

interface UploadProps {
  onImageUpload: (imageSrc: string) => void;
}

export const Upload: React.FC<UploadProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        onImageUpload(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        onImageUpload(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Color Season Analyzer
          </h1>
          <p className="text-gray-600 text-lg">Discover your perfect color palette</p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="bg-white rounded-2xl shadow-xl p-8 border-2 border-dashed border-purple-200 hover:border-purple-400 transition-all duration-300 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Selfie</h2>
            <p className="text-gray-600 mb-4">Drag and drop or click to upload</p>
            <p className="text-sm text-gray-500 mb-6">
              📸 Use <span className="font-semibold">natural lighting</span> (like facing a window) for best results
            </p>
            <button className="btn-primary w-full">Choose Photo</button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-bold text-gray-800 mb-2">💡 Tip</h3>
          <p className="text-sm text-gray-700">
            For the most accurate results, use a clear, well-lit selfie with your natural hair and skin visible.
          </p>
        </div>
      </div>
    </div>
  );
};
