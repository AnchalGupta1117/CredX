import React, { useState } from "react"
import FemaleLogo from "@/components/female_logo"
import MaleLogo from "@/components/male_logo"
import { MdiFaceMan } from "./male_icon"
import { MdiFaceWoman } from "./woman_icon"

export default function GenderSelect({
  textColor,
  isLightTheme,
  input,
  setInput,
}) {
  const selectedBgColor = "[#C8BCF6]/20"
  const selectedIconColor = isLightTheme ? "#7650FF" : "#C8BCF6"
  const selectedTextColor = isLightTheme ? "text-[#7650FF]" : "text-[#C8BCF6]"
  const selectedBorderColor = isLightTheme
    ? "border-[#7650FF]"
    : "border-[#C8BCF6]"
  return (
    <div className="flex justify-between">
      <div
        onClick={() =>
          setInput((prev) => {
            return {
              ...prev,
              ["gender"]: 1,
            }
          })
        }
        className={
          (input.gender == 1
            ? `bg-${selectedBgColor} ${selectedBorderColor} border-[2.5px]`
            : "border-transparent  border-[2.5px]") +
          ` h-[100px] w-[45%] rounded-2xl flex items-center p-3 gap-3 hover:cursor-pointer`
        }
      >
        <MdiFaceMan color={input.gender == 1 ? selectedIconColor : textColor} />

        <span
          className={
            (input.gender == 1 ? `${selectedTextColor}` : textColor) +
            " text-2xl font-bold"
          }
        >
          Male
        </span>
      </div>
      <div
        onClick={() =>
          setInput((prev) => {
            return {
              ...prev,
              ["gender"]: 0,
            }
          })
        }
        className={
          (input.gender == 0
            ? `bg-${selectedBgColor} ${selectedBorderColor} border-[2.5px]`
            : "border-transparent  border-[2.5px]") +
          ` h-[100px] w-[45%] rounded-2xl flex items-center p-3 gap-3 hover:cursor-pointer`
        }
      >
        <MdiFaceWoman
          color={input.gender == 0 ? selectedIconColor : textColor}
        />

        <span
          className={
            (input.gender == 0 ? `${selectedTextColor}` : textColor) +
            " text-2xl font-bold"
          }
        >
          Female
        </span>
      </div>
    </div>
  )
}
