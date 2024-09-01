"use client"

import React, { useContext } from "react"
import Logo from "./logo"
import { CodeXml, CreditCard, Sun } from "lucide-react"
import CustomSwitch from "./custom-switch"
import { ThemeContext } from "@/context/theme"
import GithubLogo from "./github_logo"
import Link from "next/link"

export default function Sidebar() {
  const { isLightTheme, updateTheme } = useContext(ThemeContext)
  const textColor = isLightTheme ? "text-black" : "text-white"
  const iconColor = isLightTheme ? "black" : "#C8BCF6"

  return (
    <div
      id="sidebar"
      className={
        (isLightTheme ? "bg-white" : "bg-[#09090a]") +
        " min-w-[250px] p-5 h-full flex flex-col border-white/20 border-r-[1px] shadow-black/20 shadow-lg stroke-white stroke-2"
      }
    >
      <div className="flex items-center gap-3">
        <Logo />
        <div className="flex flex-col">
          <span className={`${textColor} text-lg font-bold`}>CredX</span>
          <span className={`${textColor} text-sm font-medium`}>
            Know before you apply.
          </span>
        </div>
      </div>

      <div
        className={
          (isLightTheme ? "bg-[#F5F5F5]" : "bg-[#1F1F22]") +
          ` font-bold justify-center ${textColor} mt-12 w-full h-[50px] rounded-xl flex gap-3 items-center px-3`
        }
      >
        version: 1.0.1
      </div>
      <div className="flex flex-col h-full justify-between">
        <div
          className={`${textColor} mt-12 w-full flex flex-col gap-5 text-sm`}
        >
          <Link href="/predict-approval">
            <div className="flex items-center gap-3 hover:cursor-pointer hover:text-[15px]">
              <CreditCard color={iconColor} />
              <span>Predict Approval</span>
            </div>
          </Link>
          <Link href="/about-developer">
            <div className="flex items-center gap-3 hover:cursor-pointer hover:text-[15px]">
              <CodeXml color={iconColor} />
              <span>About developer</span>
            </div>
          </Link>
        </div>

        <div
          className={`${textColor} mt-12 w-full flex flex-col gap-5 text-sm`}
        >
          <div className="flex items-center gap-3 hover:cursor-pointer hover:text-[15px]">
            <GithubLogo color={iconColor} />

            <span>Source code</span>
          </div>
          <div className="flex items-center gap-3 ">
            <Sun color={iconColor} />
            <span className="text-sm">Light Mode</span>
            <CustomSwitch
              isLightTheme={isLightTheme}
              updateTheme={updateTheme}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
