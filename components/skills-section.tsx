"use client"

import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import {
  // Tech
  Code2,
  Database,
  Braces,
  FileCode2,
  Layout,
  NotebookPen,
  // Product/Design
  Figma,
  Search,
  PencilRuler,
  Box,
  // Tools
  BarChart3,
  LineChart,
  Kanban,
  StickyNote,
  PieChart,
  FileSpreadsheet,
  // Certs / AI / PM
  BadgeCheck,
  Sparkles,
  ClipboardCheck,
} from "lucide-react"

const skillCategories = [
  {
    title: "Technical",
    color: "#3b82f6",
    skills: ["Python", "SQL", "React.js", "JavaScript", "HTML/CSS", "Jupyter"],
  },
  {
    title: "Product & Design",
    color: "#8b5cf6",
    skills: ["Figma", "Whimsical", "User Research", "Wireframing", "Prototyping", "UX Design"],
  },
  {
    title: "Tools",
    color: "#10b981",
    skills: ["Power BI", "Tableau", "Jira", "Notion", "Google Analytics", "MS Office"],
  },
  {
    title: "Certifications",
    color: "#f59e0b",
    skills: ["Google UX Design", "AI For Project Managers", "PSM - 1"],
  },
] as const

type Category = (typeof skillCategories)[number]

function SkillPill({
  skill,
  color,
  delay,
  icon,
}: {
  skill: string
  color: string
  delay: number
  icon?: React.ReactNode
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.08, y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="
        relative inline-flex items-center gap-2
        px-4 py-2 rounded-xl text-sm font-medium cursor-default
        transition-all duration-300
        bg-muted text-muted-foreground border border-border
      "
      style={{
        backgroundColor: isHovered ? `${color}20` : undefined,
        color: isHovered ? color : undefined,
        borderColor: isHovered ? `${color}50` : undefined,
        boxShadow: isHovered ? `0 10px 30px -10px ${color}40` : "none",
      }}
    >
      {icon ? (
        <span className="inline-flex items-center justify-center" aria-hidden="true">
          {icon}
        </span>
      ) : null}

      {skill}

      {isHovered && (
        <motion.span
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        />
      )}
    </motion.span>
  )
}

function SkillCategory({
  category,
  index,
  iconMap,
}: {
  category: Category
  index: number
  iconMap: Record<string, React.ReactNode>
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:shadow-xl transition-shadow duration-500"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${category.color}10 0%, transparent 70%)`,
        }}
      />

      {/* Category header */}
      <div className="flex items-center gap-3 mb-6 relative">
        <motion.div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: category.color }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-handwritten)" }}>
          {category.title}
        </h3>
        <motion.div
          className="h-0.5 flex-grow rounded-full"
          style={{ backgroundColor: `${category.color}30`, transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
        />
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 relative">
        {category.skills.map((skill, skillIndex) => (
          <SkillPill
            key={skill}
            skill={skill}
            color={category.color}
            delay={index * 0.1 + skillIndex * 0.05}
            icon={iconMap[skill]}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  // Map each skill -> icon
  const iconMap = useMemo<Record<string, React.ReactNode>>(
    () => ({
      // Technical
      Python: <Code2 size={16} />,
      SQL: <Database size={16} />,
      "React.js": <Layout size={16} />,
      JavaScript: <Braces size={16} />,
      "HTML/CSS": <FileCode2 size={16} />,
      Jupyter: <NotebookPen size={16} />,

      // Product & Design
      Figma: <Figma size={16} />,
      Whimsical: <Box size={16} />,
      "User Research": <Search size={16} />,
      Wireframing: <PencilRuler size={16} />,
      Prototyping: <Box size={16} />,
      "UX Design": <PencilRuler size={16} />,

      // Tools
      "Power BI": <BarChart3 size={16} />,
      Tableau: <LineChart size={16} />,
      Jira: <Kanban size={16} />,
      Notion: <StickyNote size={16} />,
      "Google Analytics": <PieChart size={16} />,
      "MS Office": <FileSpreadsheet size={16} />,

      // ✅ Certifications (updated)
      "Google UX Design": <BadgeCheck size={16} />,
      "AI For Project Managers": <Sparkles size={16} />,
      "PSM - 1": <ClipboardCheck size={16} />,
    }),
    []
  )

  return (
    <section id="skills" className="relative z-10 py-20 md:py-32 px-4">
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
            <span className="text-6xl md:text-7xl font-bold text-primary/10" style={{ fontFamily: "var(--font-handwritten)" }}>
              04
            </span>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Skills & Tools</h2>
              <motion.div
                className="h-1 bg-primary rounded-full mt-2"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </div>
          <p className="text-muted-foreground ml-0 md:ml-20" style={{ fontFamily: "var(--font-handwritten)" }}>
            technologies and tools I work with
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.title} category={category} index={index} iconMap={iconMap} />
          ))}
        </div>
      </div>
    </section>
  )
}
