"use client"
import { ThemeContext } from "@/context/theme"
import React, { useContext } from "react"

export default function Page() {
  const { isLightTheme } = useContext(ThemeContext)
  const textColor = isLightTheme ? "text-black" : "text-white"

  return (
    <>
      <div
        className={
          (isLightTheme ? "bg-[#EFEFEF]" : "bg-[#09090a]") +
          " h-[100vh] w-full flex justify-center items-center"
        }
      >
        <span className={`${textColor}`}>Hello</span>
      </div>
    </>
  )
}
