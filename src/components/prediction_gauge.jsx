import React from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement } from "chart.js"

ChartJS.register(ArcElement)

export default function PredictionGauge({ color, animationDuration, data }) {
  return (
    <>
      <Doughnut
        data={{
          labels: ["Red", "Blue"],
          datasets: [
            {
              cutout: "80%",
              label: "# of Votes",
              data: data,
              borderWidth: 0,
              borderRadius: 5,
              circumference: 180,
              rotation: -90,
              backgroundColor: color,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          animation: {
            duration: animationDuration,
          },
        }}
      />
    </>
  )
}
