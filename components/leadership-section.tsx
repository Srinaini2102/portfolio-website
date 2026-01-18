"use client"

import React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"

const leadership = [
  {
    title: "Buddy Connect Mentor",
    organization: "Texas A&M University",
    description: "Supporting 4 students with academic guidance, career preparation, and personal adjustment",
    color: "#3b82f6"
  },
  {
    title: "Student Chair, IEEE Student Chapter",
    organization: "VIT-AP",
    description: "Mentored 45 members and executed 8 campus-wide events, increasing student participation by 60%. Led the AISP international conference.",
    color: "#8b5cf6"
  },
  {
    title: "Finance Manager, VITOPIA",
    organization: "VIT-AP Cultural & Sports Fiesta",
    description: "Negotiated with vendors to save 15%, oversaw reimbursements, and coordinated with student leaders to deliver inclusive events within budget.",
    color: "#10b981"
  },
  {
    title: "Women's Sports Lead & Team Captain",
    organization: "VIT-AP",
    description: "Managed 8 women's sports teams while serving as basketball captain and throwball vice-captain.",
    color: "#f59e0b"
  }
]

function LeadershipCard({ item, index }: { item: typeof leadership[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03 }}
        className="h-full cursor-default"
      >
        <div className="bg-card border border-border rounded-2xl p-6 h-full relative overflow-hidden group">
          {/* Background glow */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${item.color}15 0%, transparent 60%)`
            }}
          />
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            }}
          />

          {/* Index badge */}
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
            style={{ 
              backgroundColor: `${item.color}15`,
              borderColor: `${item.color}30`
            }}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <span 
              className="text-lg font-bold"
              style={{ color: item.color, fontFamily: "var(--font-handwritten)" }}
            >
              0{index + 1}
            </span>
          </motion.div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-1 group-hover:translate-x-1 transition-transform">
            {item.title}
          </h3>

          {/* Organization */}
          <p 
            className="text-sm font-medium mb-3"
            style={{ color: item.color, fontFamily: "var(--font-handwritten)" }}
          >
            {item.organization}
          </p>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>

          {/* Arrow indicator */}
          <motion.div
            className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors"
            animate={{ 
              x: isHovered ? 3 : 0,
              backgroundColor: isHovered ? `${item.color}20` : "transparent"
            }}
          >
            <svg 
              className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function LeadershipSection() {
  return (
    <section id="leadership" className="relative z-10 py-20 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span 
              className="text-6xl md:text-7xl font-bold text-primary/10"
              style={{ fontFamily: "var(--font-handwritten)" }}
            >
              05
            </span>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Leadership
              </h2>
              <motion.div
                className="h-1 bg-primary rounded-full mt-2"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </div>
          <p 
            className="text-muted-foreground ml-0 md:ml-20"
            style={{ fontFamily: "var(--font-handwritten)" }}
          >
            roles where I led, mentored, and made an impact
          </p>
        </motion.div>

        {/* Leadership grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadership.map((item, index) => (
            <LeadershipCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
