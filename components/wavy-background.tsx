"use client"

import { motion } from "framer-motion"

export function WavyBackground() {
  return (
    <div className="fixed inset-x-0 bottom-0 h-screen overflow-hidden pointer-events-none z-0">
      {/* Cute floating bubbles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 8 + Math.random() * 16,
            height: 8 + Math.random() * 16,
            left: `${10 + i * 12}%`,
            bottom: `${15 + Math.random() * 25}%`,
            background: i % 2 === 0 
              ? "var(--primary)" 
              : "var(--accent)",
            opacity: 0.15 + Math.random() * 0.15,
          }}
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* First wave - topmost, lightest */}
      <motion.svg
        viewBox="0 0 1440 600"
        className="absolute bottom-0 w-[200%] md:w-full h-[60vh] left-1/2"
        preserveAspectRatio="none"
        animate={{ 
          x: ["-50%", "-52%", "-50%"],
          y: [0, -8, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path
          fill="var(--primary)"
          fillOpacity="0.06"
          d="M0,100 C150,150 300,50 450,100 C600,150 750,80 900,120 C1050,160 1200,90 1350,100 L1440,100 L1440,600 L0,600 Z"
        />
      </motion.svg>

      {/* Second wave */}
      <motion.svg
        viewBox="0 0 1440 600"
        className="absolute bottom-0 w-[200%] md:w-full h-[55vh] left-1/2"
        preserveAspectRatio="none"
        animate={{ 
          x: ["-50%", "-48%", "-50%"],
          y: [0, 10, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <path
          fill="var(--wave-1)"
          fillOpacity="0.5"
          d="M0,180 C200,120 350,220 550,160 C750,100 900,200 1100,150 C1300,100 1400,180 1440,160 L1440,600 L0,600 Z"
        />
      </motion.svg>

      {/* Third wave */}
      <motion.svg
        viewBox="0 0 1440 600"
        className="absolute bottom-0 w-[200%] md:w-full h-[45vh] left-1/2"
        preserveAspectRatio="none"
        animate={{ 
          x: ["-50%", "-53%", "-50%"],
          y: [0, -6, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <path
          fill="var(--wave-2)"
          fillOpacity="0.6"
          d="M0,220 C180,280 380,180 580,240 C780,300 920,200 1120,260 C1320,320 1400,240 1440,260 L1440,600 L0,600 Z"
        />
      </motion.svg>

      {/* Fourth wave - bottommost, most solid */}
      <motion.svg
        viewBox="0 0 1440 600"
        className="absolute bottom-0 w-[200%] md:w-full h-[35vh] left-1/2"
        preserveAspectRatio="none"
        animate={{ 
          x: ["-50%", "-47%", "-50%"],
          y: [0, 5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <path
          fill="var(--primary)"
          fillOpacity="0.12"
          d="M0,300 C200,250 400,350 600,280 C800,210 1000,320 1200,270 C1350,230 1400,300 1440,280 L1440,600 L0,600 Z"
        />
      </motion.svg>

      {/* Cute sparkle decorations */}
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            width: 16 + Math.random() * 12,
            height: 16 + Math.random() * 12,
            left: `${15 + i * 18}%`,
            bottom: `${20 + Math.random() * 20}%`,
          }}
          viewBox="0 0 24 24"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        >
          <path
            d="M12 2L13 9L20 10L13 11L12 18L11 11L4 10L11 9L12 2Z"
            fill="var(--primary)"
            opacity="0.4"
          />
        </motion.svg>
      ))}
    </div>
  )
}
