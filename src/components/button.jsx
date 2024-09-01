import React from "react"

export default function PrimaryButton({
  isLightTheme,
  clickFunction,
  disabled,
  width,
  height,
  buttonText,
}) {
  return (
    <div
      onClick={!disabled ? clickFunction : null}
      style={{ width: width, height: height }}
      className={
        (disabled
          ? (isLightTheme ? "bg-[#9479ff]/50" : "bg-[#C8BCF6]/50") +
            " bg-[#C8BCF6]/50 hover:cursor-default"
          : "hover:cursor-pointer" +
            (isLightTheme ? " hover:bg-[#ad96ff]" : " hover:bg-[#b5a2ff]")) +
        ` transition-all duration-100 rounded-md flex justify-center text-themesurface items-center font-medium` +
        (isLightTheme
          ? "  bg-[#9479ff] text-white"
          : "  bg-[#C8BCF6] text-[#09090a]")
      }
    >
      {buttonText}
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
