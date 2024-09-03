"use client"
import Sidebar from "@/components/sidebar"
import React, { useContext } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { ThemeContext } from "@/context/theme"

export default function Layout({ children }) {
  const { isLightTheme } = useContext(ThemeContext)

  const customColors = {
    dark: { 500: "#C8BCF6" },
    light: {
      500: "#7650FF",
    },
  }

  const darkTheme = createTheme({
    palette: {
      mode: isLightTheme ? "light" : "dark",
      ...(isLightTheme
        ? {
            // palette values for light mode
            primary: customColors.light,
          }
        : {
            // palette values for dark mode
            primary: customColors.dark,
          }),
    },
  })

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className="h-full flex w-full">
          <Sidebar />
          <div className="h-full overflow-y-auto">{children}</div>
        </div>
      </ThemeProvider>
    </>
  )
}
