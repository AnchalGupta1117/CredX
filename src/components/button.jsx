import React, { useState, useEffect } from "react"

export default function PrimaryButton({
  isLightTheme,
  clickFunction,
  disabled,
  width,
  height,
  buttonText,
  isLoading = false,
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            return 90 // Stop at 90% until actual completion
          }
          return prev + Math.random() * 8 + 2 // Random increment between 2-10%
        })
      }, 500) // Slower interval - 500ms instead of 200ms

      return () => clearInterval(interval)
    } else {
      setProgress(100) // Complete when not loading
      setTimeout(() => setProgress(0), 500) // Longer delay for smoother reset
    }
  }, [isLoading])

  return (
    <div
      onClick={!disabled ? clickFunction : null}
      style={{ width: width, height: height }}
      className={
        (disabled
          ? (isLightTheme ? "bg-[#9479ff]/50" : "bg-[#C8BCF6]/50") +
            " hover:cursor-default"
          : "hover:cursor-pointer" +
            (isLightTheme ? " hover:bg-[#ad96ff]" : " hover:bg-[#b5a2ff]")) +
        ` transition-all duration-300 rounded-md flex justify-center text-themesurface items-center font-medium relative overflow-hidden` +
        (isLightTheme
          ? "  bg-[#9479ff] text-white"
          : "  bg-[#C8BCF6] text-[#09090a]")
      }
    >
      {/* Progress bar that fills from left to right */}
      {isLoading && (
        <div 
          className={`absolute left-0 top-0 h-full rounded-md transition-all duration-300 ${
            isLightTheme ? "bg-[#6B4ECC]" : "bg-[#A691E8]"
          }`}
          style={{
            width: `${progress}%`,
          }}
        />
      )}
      
      {/* Button text */}
      <span className="relative z-10">{buttonText}</span>
    </div>
  )
}

// Copy directly:
{
  /* <PrimaryButton
          clickFunction={}
          disabled={false}
          width="45%"
          height="40px"
          buttonText="Save"
        /> */
}
