"use client"

import { motion } from "framer-motion"

const processes = [
  {
    title: "Problem",
    description: "user pain, business context",
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    iconBg: "bg-rose-100"
  },
  {
    title: "Design",
    description: "flows, wireframes, UX decisions",
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    iconBg: "bg-sky-100"
  },
  {
    title: "Build",
    description: "code, APIs, LLMs, prototypes",
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    iconBg: "bg-emerald-100"
  },
  {
    title: "Iterate",
    description: "feedback, metrics, improvements",
    icon: (
      <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    iconBg: "bg-amber-100"
  }
]

export function ProcessCards() {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-5 md:gap-6 w-full max-w-5xl mx-auto px-4"
      initial="hidden"
      animate="visible"
    >
      {processes.map((process, index) => (
        <motion.div
          key={process.title}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 1.8 + index * 0.15,
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
          whileHover={{
            y: -6,
            transition: { type: "spring", stiffness: 400, damping: 20 },
          }}
          className="group relative"
        >
          {/* ✅ Bigger box sizes here */}
          <div
            className={`relative flex flex-col items-center justify-center p-6 rounded-2xl ${process.bgColor} border-2 ${process.borderColor} transition-all duration-300 group-hover:shadow-lg w-[170px] h-[170px] md:w-[200px] md:h-[200px]`}
          >
            {/* Cute corner scribble */}
            <svg className="absolute -top-1 -right-1 w-6 h-6 opacity-30" viewBox="0 0 24 24">
              <motion.path
                d="M4 4 Q 12 2 20 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
              />
            </svg>

            {/* Icon centered */}
            <motion.div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-xl ${process.iconBg} flex items-center justify-center text-foreground/70 mb-3`}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
            >
              {process.icon}
            </motion.div>

            <h3
              className="text-xl md:text-xl font-semibold text-foreground mb-1 text-center leading-tight"
              
            >
              {process.title}
            </h3>

            <p className="text-[11px] md:text-[13px] text-muted-foreground leading-snug text-center px-2">
              {process.description}
            </p>

            {/* Small floating dot decoration */}
            <motion.div
              className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-current opacity-20"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            />
          </div>

          {/* Cute connecting arrow to next card */}
          {index < processes.length - 1 && (
            <motion.svg
              className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-6"
              viewBox="0 0 24 24"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 0.4, x: 0 }}
              transition={{ delay: 2.4 + index * 0.15 }}
            >
              <path
                d="M5 12h10m0 0l-4-4m4 4l-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}
