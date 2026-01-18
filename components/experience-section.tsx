"use client"

import React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

const experiences = [
  {
    company: "All later ",
    role: "UI/UX Developer",
    location: "College Station, Texas",
    period: "March 2025 - May 2025",
    description: [
      "Conducted user research by distributing online surveys, running tabling sessions, and collecting feedback from 100+ students to identify usability gaps",
      "Facilitated in-person interviews using the think-aloud protocol, redesigning UI mockups in Figma to improve navigation",
      "Documented designs and shared insights in Notion, supporting a 30% increase in adoption at Texas A&M"
    ]
  },
  {
    company: "Lynkr",
    role: "UI/UX Developer",
    location: "College Station, Texas",
    period: "March 2025 - May 2025",
    description: [
      "Conducted user research by distributing online surveys, running tabling sessions, and collecting feedback from 100+ students to identify usability gaps",
      "Facilitated in-person interviews using the think-aloud protocol, redesigning UI mockups in Figma to improve navigation",
      "Documented designs and shared insights in Notion, supporting a 30% increase in adoption at Texas A&M"
    ]
  },
  {
    company: "Edvenswa Tech Inc",
    role: "Business Analyst Intern",
    location: "India",
    period: "Feb 2024 - May 2024",
    description: [
      "Increased sales revenue by 15% by analyzing conversion gaps with KPI dashboards in Power BI",
      "Reduced reporting turnaround by 30% by building Python + SQL dataframes in Jupyter",
      "Developed real-time Power BI dashboards for lead tracking, website traffic, and sales funnel metrics"
    ]
  },
  {
    company: "Edvenswa Tech Inc",
    role: "Software Developer Intern",
    location: "India",
    period: "June 2023 - Aug 2023",
    description: [
      "Developed front-end modules in React.js and optimized SQL queries, reducing page load time by 40%",
      "Created wireframes and interactive prototypes in Figma, redesigning appointment booking pages"
    ]
  }
]

function ExperienceCard({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

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
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex gap-6"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <motion.div 
          className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/20 z-10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 300 }}
        />
        {index < experiences.length - 1 && (
          <motion.div 
            className="w-0.5 h-full bg-gradient-to-b from-primary/50 to-border absolute top-4 left-[7px]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
            style={{ transformOrigin: "top" }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        className="flex-1 mb-8 cursor-default"
      >
        <div 
          className="bg-card border border-border rounded-2xl p-6 shadow-lg shadow-black/5 dark:shadow-black/20 relative overflow-hidden group"
          style={{ transform: "translateZ(0)" }}
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4 relative">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {experience.company}
              </h3>
              <p className="text-primary font-medium">{experience.role}</p>
              <p className="text-sm text-muted-foreground">{experience.location}</p>
            </div>
            <span 
              className="text-sm text-muted-foreground font-medium whitespace-nowrap px-3 py-1 bg-muted/50 rounded-full"
              style={{ fontFamily: "var(--font-handwritten)" }}
            >
              {experience.period}
            </span>
          </div>

          {/* Description */}
          <ul className="space-y-3 relative">
            {experience.description.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3 + i * 0.1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* Decorative corner */}
          <svg 
            className="absolute -bottom-2 -right-2 w-20 h-20 text-primary/5 group-hover:text-primary/10 transition-colors"
            viewBox="0 0 80 80"
          >
            <circle cx="60" cy="60" r="40" fill="currentColor" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 py-20 md:py-32 px-4">
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
              02
            </span>
            <div>
              <h2 
                className="text-3xl md:text-4xl font-bold text-foreground"
              >
                Experience
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
            where I've worked and what I've built
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-2">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.company + exp.role} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
