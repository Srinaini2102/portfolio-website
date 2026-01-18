"use client"

import { motion } from "framer-motion"

interface SketchAnnotationProps {
  text: string
  description: string
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  delay?: number
}

export function SketchAnnotation({ text, description, position, delay = 0 }: SketchAnnotationProps) {
  const positionClasses = {
    "top-left": "bottom-full right-full mb-2 mr-[-20px]",
    "top-right": "bottom-full left-full mb-2 ml-[-20px]",
    "bottom-left": "top-full right-full mt-2 mr-[-20px]",
    "bottom-right": "top-full left-full mt-2 ml-[-20px]"
  }

  const arrowPaths = {
    "top-left": "M 80 60 Q 60 80 40 70 Q 30 65 25 55",
    "top-right": "M 20 60 Q 40 80 60 70 Q 70 65 75 55",
    "bottom-left": "M 80 20 Q 60 0 40 10 Q 30 15 25 25",
    "bottom-right": "M 20 20 Q 40 0 60 10 Q 70 15 75 25"
  }

  const arrowHeadTransform = {
    "top-left": "translate(20, 50) rotate(-30)",
    "top-right": "translate(70, 50) rotate(30)",
    "bottom-left": "translate(20, 30) rotate(30)",
    "bottom-right": "translate(70, 30) rotate(-30)"
  }

  const textAlign = position.includes("left") ? "text-right" : "text-left"

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} w-[180px] md:w-[220px]`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: "easeOut"
      }}
    >
      <div className={`${textAlign}`}>
        <motion.p 
          className="font-[var(--font-handwritten)] text-2xl md:text-3xl text-foreground leading-tight"
          style={{ fontFamily: "var(--font-handwritten)" }}
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: delay + 0.2 }}
        >
          {text}
        </motion.p>
        <motion.p 
          className="text-xs md:text-sm text-muted-foreground mt-1 leading-snug"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.4 }}
        >
          {description}
        </motion.p>
      </div>
      
      {/* Sketchy Arrow SVG */}
      <motion.svg
        viewBox="0 0 100 80"
        className={`w-20 h-16 md:w-24 md:h-20 absolute ${
          position.includes("left") ? "right-[-30px]" : "left-[-30px]"
        } ${
          position.includes("top") ? "bottom-[-50px]" : "top-[-50px]"
        }`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.1 }}
      >
        {/* Main curved line */}
        <motion.path
          d={arrowPaths[position]}
          fill="none"
          stroke="var(--sketch-stroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 200,
            filter: "url(#sketchy)"
          }}
          initial={{ strokeDashoffset: 200 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
        />
        
        {/* Arrow head */}
        <motion.g transform={arrowHeadTransform[position]}>
          <motion.path
            d="M 0 0 L 8 5 L 2 10"
            fill="none"
            stroke="var(--sketch-stroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.8 }}
          />
        </motion.g>
        
        {/* SVG Filter for sketchy effect */}
        <defs>
          <filter id="sketchy">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
          </filter>
        </defs>
      </motion.svg>
    </motion.div>
  )
}
