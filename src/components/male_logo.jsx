import React from "react"

export default function FemaleLogo({ color, width, height }) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      width={width}
      height={height}
      viewBox="0 0 350.000000 306.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,306.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path
          d="M2030 2330 l0 -120 225 -2 225 -3 -257 -257 -258 -257 -45 27 c-108
67 -215 96 -360 96 -163 1 -265 -30 -395 -116 -107 -72 -175 -149 -233 -264
-159 -315 -56 -706 237 -898 127 -82 239 -117 382 -117 112 0 186 12 259 43
395 166 558 593 372 970 l-48 97 258 258 258 258 0 -228 0 -228 118 3 117 3 3
395 c2 217 0 410 -3 428 l-6 32 -424 0 -425 0 0 -120z m-400 -751 c252 -40
431 -284 390 -530 -25 -150 -128 -291 -254 -349 -190 -89 -390 -57 -532 85
-67 66 -106 133 -129 222 -74 283 140 565 440 582 11 0 49 -4 85 -10z"
        />
      </g>
    </svg>

    // <Image src={male} width={50} height={50} />
  )
}
