"use client"
import { ThemeContext } from "@/context/theme"
import Image from "next/image"
import React, { useContext } from "react"
import AnchalPfp from "../../../../public/Anchal.jpg"

export default function AboutDeveloper() {
  const { isLightTheme } = useContext(ThemeContext)
  const textColor = isLightTheme ? "black" : "white"

  return (
    <div className={`p-5 px-20 w-full text-${textColor} flex items-center `}>
      <div className="w-[490px] flex flex-col items-center p-5 gap-5">
        <Image
          className={`rounded-full min-w-[350px] h-[350px] border-2 border-${textColor}`}
          alt="Anchal pfp"
          src={AnchalPfp}
          width={350}
          height={350}
        />
        <span className={`font-bold text-xl`} style={{ color: textColor }}>
          Anchal Gupta
        </span>
      </div>
      <div className="w-[490px] flex flex-col items-center p-5 gap-5">
        <span className="font-bold text-xl">
          Hii. I am Anchal Gupta, currently completing my graduation from &quot;
          Indira Gandhi Delhi Technical University for Women&quot; . I am
          pursuing B.Tech in Information Technology. I am a programming
          enthusiast and currently do web development and Machine learning with
          python
        </span>
      </div>
    </div>
  )
}
