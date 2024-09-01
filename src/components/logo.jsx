import Image from "next/image"
import React from "react"
import logo from "../../public/logo.svg"

export default function Logo() {
  return (
    <div className="rounded-xl bg-[#09090a] w-[50px] h-[50px] flex justify-center items-center">
      <Image alt="FraudX logo" src={logo} width="30" height="30" />
    </div>
  )
}
