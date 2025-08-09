import Image from "next/image"
import React from "react"
import logo from "../../public/logo.svg"

export default function Logo() {
  return (
    <div className="rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 w-[50px] h-[50px] flex justify-center items-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <Image alt="CredX logo" src={logo} width="30" height="30" />
    </div>
  )
}
