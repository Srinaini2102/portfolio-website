"use client"

import { motion } from "framer-motion"

interface CuteAnnotationProps {
  text: string
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  delay?: number
}

export function CuteAnnotation({ text, position, delay = 0 }: CuteAnnotationProps) {
  // Position annotations closer to the profile
  const containerPositions = {
    "top-left": "absolute -left-[110px] md:-left-[190px] -top-[20px] md:-top-[10px]",
    "top-right": "absolute -right-[110px] md:-right-[190px] -top-[20px] md:-top-[10px]",
    "bottom-left": "absolute -left-[110px] md:-left-[190px] -bottom-[20px] md:-bottom-[10px]",
    "bottom-right": "absolute -right-[110px] md:-right-[190px] -bottom-[20px] md:-bottom-[10px]",
  }

  const isLeft = position.includes("left")
  const textAlign = isLeft ? "text-right" : "text-left"

  // Left side: text then arrow (arrow points toward center)
  // Right side: arrow then text (arrow points toward center)
  const flexDir = isLeft ? "flex-row" : "flex-row-reverse"

  return (
    <motion.div
      className={`${containerPositions[position]} flex ${flexDir} items-center gap-2 md:gap-3`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: delay,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
    >
      {/* Text */}
      <div className={`${textAlign} w-[90px] md:w-[140px]`}>
        <p
          className="text-2xl md:text-4xl font-bold text-foreground leading-tight whitespace-nowrap"
          style={{ fontFamily: "var(--font-handwritten)" }}
        >
          {text}
        </p>
      </div>

      {/* Hand-drawn sketchy arrow pointing TOWARD the circle */}
      <HandDrawnArrow position={position} delay={delay} />
    </motion.div>
  )
}

function HandDrawnArrow({ position, delay }: { position: string; delay: number }) {
  const isLeft = position.includes("left")
  const isTop = position.includes("top")

  const getArrowSvg = () => {
    if (isLeft && isTop) {
      return (
        <svg viewBox="0 0 50 50" className="w-12 h-12 md:w-16 md:h-16">
          {/* Curvy line only */}
          <motion.path
            d="M 5 15 
               Q 8 25, 18 30
               Q 28 35, 38 38
               Q 42 40, 45 42"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2, ease: "easeOut" }}
          />
        </svg>
      )
    } else if (!isLeft && isTop) {
      return (
        <svg viewBox="0 0 50 50" className="w-12 h-12 md:w-16 md:h-16">
          <motion.path
            d="M 45 15 
               Q 42 25, 32 30
               Q 22 35, 12 38
               Q 8 40, 5 42"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2, ease: "easeOut" }}
          />
        </svg>
      )
    } else if (isLeft && !isTop) {
      return (
        <svg viewBox="0 0 50 50" className="w-12 h-12 md:w-16 md:h-16">
          <motion.path
            d="M 5 35 
               Q 8 25, 18 20
               Q 28 15, 38 12
               Q 42 10, 45 8"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2, ease: "easeOut" }}
          />
        </svg>
      )
    } else {
      return (
        <svg viewBox="0 0 50 50" className="w-12 h-12 md:w-16 md:h-16">
          <motion.path
            d="M 45 35 
               Q 42 25, 32 20
               Q 22 15, 12 12
               Q 8 10, 5 8"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2, ease: "easeOut" }}
          />
        </svg>
      )
    }
  }

  return (
    <motion.div
      animate={{ rotate: [-1, 1, -1], y: [-1, 1, -1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {getArrowSvg()}
    </motion.div>
  )
}

