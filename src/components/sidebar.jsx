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
  const textColor = isLightTheme ? "text-gray-800" : "text-white"
  const iconColor = isLightTheme ? "#4C1D95" : "#C8BCF6"

  return (
    <div
      id="sidebar"
      className={
        (isLightTheme 
          ? "bg-gradient-to-br from-purple-50 to-indigo-100" 
          : "bg-gradient-to-br from-gray-900 via-purple-900/20 to-violet-900/30") +
        " min-w-[250px] p-5 h-full flex flex-col border-white/20 border-r-[1px] shadow-xl backdrop-blur-sm"
      }
    >
      <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-300">
        <Logo />
        <div className="flex flex-col">
          <span className={`${textColor} text-lg font-bold bg-gradient-to-r ${
            isLightTheme 
              ? "from-purple-700 to-indigo-700" 
              : "from-purple-300 to-indigo-300"
          } bg-clip-text text-transparent`}>CredX</span>
          <span className={`${textColor} text-sm font-medium opacity-80`}>
            Know before you apply.
          </span>
        </div>
      </div>

      <div
        className={
          (isLightTheme 
            ? "bg-gradient-to-r from-purple-200 to-indigo-200 text-purple-800" 
            : "bg-gradient-to-r from-purple-900/40 to-violet-800/40 text-purple-200") +
          ` font-bold justify-center mt-12 w-full h-[50px] rounded-xl flex gap-3 items-center px-3 shadow-lg border border-white/10`
        }
      >
        version: 1.0.1
      </div>
      <div className="flex flex-col h-full justify-between">
        <div
          className={`${textColor} mt-12 w-full flex flex-col gap-5 text-sm`}
        >
          <Link href="/predict-approval">
            <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:cursor-pointer group border-2 border-transparent ${
              isLightTheme 
                ? "hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 hover:shadow-lg hover:text-purple-700 hover:border-purple-200" 
                : "hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-violet-700/30 hover:shadow-xl hover:text-purple-200 hover:border-purple-500/30"
            }`}>
              <CreditCard 
                color={iconColor} 
                className="group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" 
                size={20}
              />
              <span className="group-hover:translate-x-2 transition-all duration-300 font-medium">Predict Approval</span>
            </div>
          </Link>
          <Link href="/about-developer">
            <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:cursor-pointer group border-2 border-transparent ${
              isLightTheme 
                ? "hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 hover:shadow-lg hover:text-blue-700 hover:border-blue-200" 
                : "hover:bg-gradient-to-r hover:from-blue-800/30 hover:to-cyan-700/30 hover:shadow-xl hover:text-blue-200 hover:border-blue-500/30"
            }`}>
              <CodeXml 
                color={iconColor} 
                className="group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300" 
                size={20}
              />
              <span className="group-hover:translate-x-2 transition-all duration-300 font-medium">About developer</span>
            </div>
          </Link>
        </div>

        <div
          className={`${textColor} mt-12 w-full flex flex-col gap-5 text-sm`}
        >
          <a 
            href="https://github.com/AnchalGupta1117/CredX" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:cursor-pointer group border-2 border-transparent ${
              isLightTheme 
                ? "hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 hover:shadow-lg hover:text-green-700 hover:border-green-200" 
                : "hover:bg-gradient-to-r hover:from-green-800/30 hover:to-emerald-700/30 hover:shadow-xl hover:text-green-200 hover:border-green-500/30"
            }`}
          >
            <GithubLogo 
              color={iconColor} 
              className="group-hover:scale-125 group-hover:rotate-180 transition-all duration-500" 
            />
            <span className="group-hover:translate-x-2 transition-all duration-300 font-medium">Source code</span>
          </a>
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
