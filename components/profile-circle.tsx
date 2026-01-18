"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CuteAnnotation } from "./cute-annotation"
import myImage from "../components/assets/adhinene.jpeg"

export function ProfileCircle() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Annotations around the circle - just simple labels */}
      <div className="hidden md:block">
        <CuteAnnotation text="I Code" position="top-left" delay={1.0}/>
        <CuteAnnotation text="I Design" position="top-right" delay={1.2} />
        <CuteAnnotation text="I Build" position="bottom-left" delay={1.4} />
        <CuteAnnotation text="I Iterate" position="bottom-right" delay={1.6} />
      </div>

      {/* Mobile annotations - simple badge style */}
      <motion.div
        className="md:hidden absolute -top-20 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 w-[280px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {["Code", "Design", "Build", "Iterate"].map((skill, i) => (
          <motion.span
            key={skill}
            className="px-3 py-1 rounded-full bg-card border border-border text-sm"
            style={{ fontFamily: "var(--font-handwritten)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.1, type: "spring" }}
          >
            I {skill}
          </motion.span>
        ))}
      </motion.div>

      {/* Profile circle container */}
      <motion.div
        className="relative w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          type: "spring",
          stiffness: 180,
          damping: 18,
        }}
      >
        {/* Outer decorative ring - hand-drawn style */}
        <svg className="absolute inset-[-16px] w-[calc(100%+32px)] h-[calc(100%+32px)]">
          <motion.circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeDasharray="6 8 2 8"
            opacity="0.4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
        </svg>

        {/* Middle decorative ring */}
        <svg className="absolute inset-[-8px] w-[calc(100%+16px)] h-[calc(100%+16px)]">
          <motion.circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 12"
            opacity="0.5"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
        </svg>

        {/* Cute decorative dots around the circle */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          const radius = 58
          const x = 50 + Math.cos(angle) * radius
          const y = 50 + Math.sin(angle) * radius
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                background: i % 2 === 0 ? "var(--primary)" : "var(--accent)",
                opacity: 0.6,
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          )
        })}

        {/* Main profile circle */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden border-[3px] border-card shadow-2xl shadow-primary/10"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Image fills the circle perfectly */}
          <Image
            src={myImage}
            alt="Profile"
            fill
            priority
            sizes="(min-width: 1024px) 256px, (min-width: 768px) 224px, 176px"
            className="object-cover"
          />

          {/* Subtle overlay glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        </motion.div>

        {/* Floating sparkles */}
        <motion.svg
          className="absolute -top-4 -right-4 w-6 h-6"
          viewBox="0 0 24 24"
          animate={{ rotate: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
            fill="var(--primary)"
            opacity="0.5"
          />
        </motion.svg>

        <motion.svg
          className="absolute -bottom-3 -left-3 w-5 h-5"
          viewBox="0 0 24 24"
          animate={{ rotate: [0, -15, 0], scale: [1, 1.2, 1] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <path
            d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
            fill="var(--accent)"
            opacity="0.5"
          />
        </motion.svg>
      </motion.div>
    </div>
  )
}
