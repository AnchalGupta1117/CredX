"use client"
import { ThemeContext } from "@/context/theme"
import React, { useContext, useEffect, useState } from "react"
import Form from "./components/form"
import axios from "axios"
import { creditCardApprovalTips } from "@/helpers/tips"
import { RefreshCcw } from "lucide-react"
import Result from "./components/result"
import ProcessInfo from "./components/process_info"

export default function PredictApproval() {
  const { isLightTheme } = useContext(ThemeContext)
  const textColor = isLightTheme ? "black" : "white"
  const cardBgColor = isLightTheme ? "bg-white" : "bg-[#161618]"

  const [input, setInput] = useState({
    gender: 0,
    ownedRealty: 1,
    income: undefined,
    incomeType: 1,
    education: 1,
    housingType: 1,
    jobTitle: 1,
    totalFamilyMembers: undefined,
    age: undefined,
    workingExperience: undefined,
    totalBadDebt: undefined,
  })

  const [prediction, setPrediction] = useState("")
  const [probability, setProbability] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [isPredicting, setIsPredicting] = useState(false)
  const [randomTips, setRandomTips] = useState(["", "", "", "", "", "", ""])

  const predictApproval = async () => {
    try {
      setButtonDisabled(true)
      setIsPredicting(true)
      console.log("Prediction started")
      console.log("Input object:", input)

      const payload = [
        input.gender,
        input.ownedRealty,
        input.income,
        input.incomeType,
        input.education,
        input.housingType,
        input.jobTitle,
        input.totalFamilyMembers,
        input.age,
        input.workingExperience,
        input.totalBadDebt,
      ]
      
      // Try configured/remote backend first.
      // Use localhost fallback only during local development.
      const configuredBackend = process.env.NEXT_PUBLIC_BACKEND_URL?.trim()
      const backends = [
        configuredBackend || "https://credx-backend.onrender.com/predict",
      ]

      if (window.location.hostname === "localhost") {
        backends.push("http://localhost:3001/predict")
      }
      
      let res
      let lastError
      
      for (const backendUrl of backends) {
        try {
          console.log(`Trying backend: ${backendUrl}`)
          res = await axios.post(
            backendUrl,
            payload,
            {
              headers: {
                "Content-Type": "application/json",
              },
              timeout: 15000, // 15 second timeout per attempt
            }
          )
          console.log(`Success with backend: ${backendUrl}`)
          break
        } catch (err) {
          console.log(`Failed with backend ${backendUrl}:`, err.message)
          lastError = err
          continue
        }
      }
      
      if (!res) {
        throw lastError || new Error("All backends failed")
      }
      
      console.log("API Response:", res.data)
      setPrediction(res.data.prediction)
      setProbability(res.data.probability)
      
    } catch (error) {
      console.error("Prediction error:", error)
      console.error("Error response:", error.response?.data)
      
      // Show user-friendly error message
      if (error.code === 'ECONNABORTED') {
        alert("Request timed out. Backend server might be slow or down.")
      } else if (error.code === 'ERR_NETWORK') {
        alert("Network error. Please check your internet connection.")
      } else {
        alert(`Prediction failed: ${error.message}. Check console for details.`)
      }
    } finally {
      console.log("Prediction ended")
      setButtonDisabled(false)
      setIsPredicting(false)
    }
  }

  const getRandomTips = () => {
    const tempRandomTips = []
    for (let i = 0; i < 7; i++) {
      tempRandomTips.push(
        creditCardApprovalTips[Math.floor(Math.random() * 98)]
      )
    }
    setRandomTips(tempRandomTips)
  }

  useEffect(() => {
    getRandomTips()
  }, [])

  useEffect(() => {
    // Check if all required fields are filled
    const requiredFieldsFilled = 
      input.income !== undefined && input.income !== "" &&
      input.totalFamilyMembers !== undefined && input.totalFamilyMembers !== "" &&
      input.workingExperience !== undefined && input.workingExperience !== "" &&
      input.age !== undefined && input.age !== "" &&
      (input.totalBadDebt !== undefined && input.totalBadDebt !== "");
    
    console.log("Validation check:", {
      income: input.income,
      totalFamilyMembers: input.totalFamilyMembers,
      workingExperience: input.workingExperience,
      age: input.age,
      totalBadDebt: input.totalBadDebt,
      requiredFieldsFilled
    });
    
    setButtonDisabled(!requiredFieldsFilled);
  }, [input])

  return (
    <>
      <div className={`p-5 px-10 w-full min-h-screen ${
        isLightTheme 
          ? "bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50" 
          : "bg-gradient-to-br from-gray-900 via-purple-900/20 to-indigo-900/30"
      }`}>
        <div
          className={`flex flex-col gap-5 h-full text-${textColor} shadow-black/20`}
        >
          <div className="flex flex-col gap-3 w-full">
            <span className={`text-[32px] font-bold w-full ${
              isLightTheme 
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent" 
                : "bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent"
            }`}>
              Predict Approval
            </span>
            <div className={`w-full h-[3px] rounded-full ${
              isLightTheme 
                ? "bg-gradient-to-r from-purple-500 to-indigo-500" 
                : "bg-gradient-to-r from-purple-300 to-indigo-300"
            }`}></div>
          </div>
          <div className="flex w-full gap-10 h-full">
            <div className="w-2/5 h-full flex flex-col">
              <div className="h-[90%]">
                <Form
                  isPredicting={isPredicting}
                  buttonDisabled={buttonDisabled}
                  predictApproval={predictApproval}
                  input={input}
                  setInput={setInput}
                  textColor={textColor}
                  isLightTheme={isLightTheme}
                />
              </div>
            </div>
            <div
              className={`w-3/5 h-full shadow-black/20 shadow-2xl ${
                isLightTheme 
                  ? "bg-gradient-to-br from-white to-purple-50 border border-purple-200/50" 
                  : "bg-gradient-to-br from-gray-800/50 to-purple-900/30 border border-purple-500/20"
              } text-${textColor} rounded-2xl flex flex-col items-center justify-between p-5 backdrop-blur-sm`}
            >
              <div className="flex flex-col justify-between h-full w-full">
                <div>
                  {probability ? (
                    <Result probability={probability} isLightTheme={isLightTheme} />
                  ) : (
                    <ProcessInfo />
                  )}
                </div>
                <div className="w-full mt-10 flex flex-col gap-2">
                  <div className="w-full flex justify-between">
                    <span className="font-bold text-lg w-full">
                      Some tips to improve your chances:
                    </span>
                    <RefreshCcw
                      className="hover:cursor-pointer"
                      onClick={getRandomTips}
                    />
                  </div>
                  <div className="w-full h-[2px] bg-[#cfcfcf] rounded-full"></div>
                  <div className="flex flex-col mt-3 gap-3">
                    {randomTips.map((i, idx) => {
                      return <span key={idx}> » &nbsp; {i}</span>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
