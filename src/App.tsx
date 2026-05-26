import { useState } from 'react'
import './App.css'
import { Upload } from './components/Upload'
import { Eyedropper } from './components/Eyedropper'
import { Results } from './components/Results'

function App() {
  const [step, setStep] = useState<'upload' | 'eyedropper' | 'results'>('upload')
  const [imageSrc, setImageSrc] = useState<string>('')
  const [colors, setColors] = useState<{ skin: string; hair: string; eye: string } | null>(null)

  const handleImageUpload = (src: string) => {
    setImageSrc(src)
    setStep('eyedropper')
  }

  const handleColorsDetected = (skinColor: string, hairColor: string, eyeColor: string) => {
    setColors({ skin: skinColor, hair: hairColor, eye: eyeColor })
    setStep('results')
  }

  const handleReset = () => {
    setStep('upload')
    setImageSrc('')
    setColors(null)
  }

  return (
    <div className="min-h-screen">
      {step === 'upload' && <Upload onImageUpload={handleImageUpload} />}
      {step === 'eyedropper' && <Eyedropper imageSrc={imageSrc} onColorsDetected={handleColorsDetected} />}
      {step === 'results' && colors && (
        <Results
          skinColor={colors.skin}
          hairColor={colors.hair}
          eyeColor={colors.eye}
          onReset={handleReset}
        />
      )}
    </div>
  )
}

export default App
