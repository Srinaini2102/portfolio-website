"use client"

import React, { useRef } from "react"
import Image, { StaticImageData } from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

// ✅ Import your logos from assets (update paths/names)
import tamuLogo from "../components/assets/tamuLogo.jpeg"
import vitLogo from "../components/assets/vitLogo.svg"

const education: Array<{
  degree: string
  school: string
  location: string
  period: string
  gpa: string
  coursework: string[]
  color: string
  logo: StaticImageData
}> = [
  {
    degree: "Master of Science in Management Information Systems",
    school: "Texas A&M University",
    location: "College Station, Texas",
    period: "Aug 2024 - May 2026",
    gpa: "3.71/4.00",
    coursework: [
      "Adv. Database Management",
      "System Analysis & Design",
      "Product Lean Launch",
      "Human-Computer Interaction",
    ],
    color: "#510001",
    logo: tamuLogo,
  },
  {
    degree: "Bachelor of Engineering in Computer Science and Business Systems",
    school: "Vellore Institute of Technology",
    location: "India",
    period: "Aug 2020 - May 2024",
    gpa: "3.73/4.00",
    coursework: ["Database Management Systems", "IT Project Management", "Business Strategy", "AI & ML"],
    color: "#313791",
    logo: vitLogo,
  },
]

function EducationCard({ edu, index }: { edu: (typeof education)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

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
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: 1000 }}
    >
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
        className="cursor-default"
      >
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 relative overflow-hidden group">
          {/* ✅ Logo top-right */}
          <div className="absolute top-4 right-4 z-20">
            <div className="relative w-14 h-14 md:w-14 md:h-14 rounded-xl bg-background/70 backdrop-blur border border-border shadow-sm overflow-hidden">
              <Image
                src={edu.logo}
                alt={`${edu.school} logo`}
                fill
                className="object-contain p-1.5"
                sizes="48px"
                priority={index === 0}
              />
            </div>
          </div>

          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${edu.color}15 0%, transparent 60%)`,
            }}
          />

          {/* Period badge */}
          <motion.span
            className="inline-block px-4 py-1.5 text-[18px] font-medium rounded-full mb-4 border"
            style={{
              fontFamily: "var(--font-handwritten)",
              backgroundColor: `${edu.color}15`,
              color: edu.color,
              borderColor: `${edu.color}30`,
            }}
          >
            {edu.period}
          </motion.span>

          {/* Degree */}
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 pr-16 group-hover:translate-x-1 transition-transform">
            {edu.degree}
          </h3>

          {/* School */}
          <p className="text-base font-semibold mb-1" style={{ color: edu.color }}>
            {edu.school}
          </p>
          <p className="text-sm text-muted-foreground mb-4">{edu.location}</p>

          {/* GPA */}
          <div className="flex items-center gap-3 mb-5 p-3 bg-muted/30 rounded-lg border border-border/50 w-fit">
            <span className="text-sm text-muted-foreground">GPA</span>
            <span className="text-lg font-bold text-foreground">{edu.gpa}</span>
          </div>

          {/* Coursework */}
          <div>
            <p
              className="text-sm text-muted-foreground mb-3"
              style={{ fontFamily: "var(--font-handwritten)" }}
            >
              Relevant Coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {edu.coursework.map((course, i) => (
                <motion.span
                  key={course}
                  className="px-3 py-1.5 bg-muted/50 text-muted-foreground text-sm rounded-lg border border-border/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.15 + i * 0.05 + 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: `${edu.color}20`,
                    borderColor: `${edu.color}40`,
                  }}
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Decorative circle */}
          <svg
            className="absolute -bottom-8 -left-8 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" fill={edu.color} />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function EducationSection() {
  return (
    <section id="education" className="relative z-10 py-20 md:py-32 px-4">
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
              01
            </span>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Education</h2>
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
            style={{ fontFamily: "var(--font-handwritten)", fontSize: "20px" }}
          >
            where I learned to think, build, and solve
          </p>
        </motion.div>

        {/* Education cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {education.map((edu, index) => (
            <EducationCard key={edu.school} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
