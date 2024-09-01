import { MoveRight } from "lucide-react"
import React from "react"

export default function ProcessInfo() {
  return (
    <div className="w-full flex flex-col items-center gap-5">
      <span className="font-bold text-lg text-center w-full">
        Fill the form and our ML model will predict the chances of your credit
        card approval based on the info you provided
      </span>
      <div className="h-[220px] flex justify-evenly w-full items-center">
        <div className="flex justify-center font-bold text-lg text-center items-center rounded-xl border-2 border-current h-[120px] w-[120px]">
          {" "}
          Form details{" "}
        </div>
        <MoveRight size={50} />
        <div className="flex justify-center font-bold text-lg text-center items-center rounded-xl border-2 border-current h-[120px] w-[120px]">
          {" "}
          ML model{" "}
        </div>
        <MoveRight size={50} />
        <div className="flex justify-center font-bold text-lg text-center items-center rounded-xl border-2 border-current h-[120px] w-[120px]">
          {" "}
          Prediction result{" "}
        </div>
      </div>
    </div>
  )
}
