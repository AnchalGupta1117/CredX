import PredictionGauge from "@/components/prediction_gauge"
import React from "react"
import CountUp from "react-countup"

export default function Result({ probability, isLightTheme }) {
  const percentage = Math.floor(parseFloat(probability) * 100)
  const eligible = percentage > 50
  console.log(percentage)
  let text = ""
  text = eligible
    ? `Yay!! Based on the data you provided, you have ${percentage}% chances of
        getting your credit card approved 🎉`
    : `Sorry!! Based on the data you provided, you have just ${percentage}% chances of
        getting your credit card approved 😥`
  return (
    <div className="w-full flex flex-col items-center">
      <span className="text-[25px] font-bold w-full">Results:</span>
      <div className="h-[220px] flex items-center">
        <div className="w-[300px] h-[300px] relative">
          <div className="absolute top-0 w-full h-full">
            <PredictionGauge
              color={isLightTheme ? ["#EFEFEF"] : ["#1f1f22"]}
              animationDuration={0}
              data={[5]}
            />
          </div>
          <div className="absolute top-0 w-full h-full">
            <PredictionGauge
              color={
                isLightTheme
                  ? ["#7650FF", "rgba(0, 0, 0, 0)"]
                  : ["#C8BCF6", "rgba(0, 0, 0, 0)"]
              }
              animationDuration={1000}
              data={[percentage, 100 - percentage]}
            />
          </div>
          <div className="w-full flex flex-col items-center absolute top-[165px]">
            <span className="font-bold text-4xl">
              <CountUp end={percentage} duration={1} />%
            </span>
          </div>
        </div>
      </div>
      <span
        className={
          (isLightTheme
            ? eligible
              ? "text-green-700"
              : "text-red-700"
            : eligible
            ? "text-green-200"
            : "text-red-200") + ` font-bold text-lg text-center`
        }
      >
        {text}
      </span>
    </div>
  )
}
