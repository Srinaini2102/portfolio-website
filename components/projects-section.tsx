"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import deliverease from "../components/assets/deliverease.jpeg"
import swapify from "../components/assets/swapify.jpeg"
import thyraguard from "../components/assets/thyraguard.jpeg"
import augmentedai from "../components/assets/augmentedAI.jpeg"
import ct from "../components/assets/ct.jpeg"
import inventory from "../components/assets/inventory.jpeg"
import cybersecurity from "../components/assets/cyber.jpeg"

type Project = {
  title: string
  subtitle: string
  description: string
  tags: string[]
  color: string
  gradient: string
}

type Metric = { value: string; label: string }

type FeaturedProjectExtras = {
  badge?: string
  metrics?: Metric[]
  outcomes?: string[]
  ctaLabel?: string
  ctaHref?: string
  imageSrc?: string
  imageAlt?: string
}

/** ---------------------------
 *  PROJECTS (UPDATED)
 *  -------------------------- */
const projects: Project[] = [
  {
    title: "DeliverEase",
    subtitle: "Product Canvas",
    description:
      "Integrated major platforms to reduce wait times and optimize cost comparisons. Conducted user research, created workflow diagrams, personas, user stories, and Figma wireframes.",
    tags: ["User Research", "Figma", "Personas", "Product Strategy"],
    color: "#3b82f6",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Swapify",
    subtitle: "Prototype",
    description:
      "Designed a peer skill-exchange platform, translating user needs into wireframes enabling skill matching, token-based exchanges, and session scheduling.",
    tags: ["Wireframing", "Whimsical", "UX Design", "Platform"],
    color: "#8b5cf6",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "Thyraguard",
    subtitle: "Lean Canvas",
    description:
      "Co-led product discovery validating a thyroid patient segment through 21 interviews and patient shadowing, driving 2 data-backed pivots.",
    tags: ["User Interviews", "Lean Canvas", "Healthcare", "Strategy"],
    color: "#10b981",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Augmented AI Services",
    subtitle: "Demo",
    description:
      "Built a website integrating OCR for automated text extraction and speech recognition for voice-based navigation, showcasing accessibility.",
    tags: ["AI/ML", "OCR", "Speech Recognition", "Accessibility"],
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "CT Publishing",
    subtitle: "ONIX Feed Automation",
    description:
      "Created a Software Requirements Specification documenting functional workflows and compliance rules, improving project clarity.",
    tags: ["SRS", "Documentation", "Workflow Design", "Compliance"],
    color: "#ec4899",
    gradient: "from-pink-500/20 to-rose-500/20",
  },

  // ✅ Added projects
  {
    title: "Cybersecurity Enhancement for Apollo Financial Services",
    subtitle: "Case Study",
    description:
      "Crafted comprehensive project management documentation for Apollo FinServices, including project charter, scope, budget, timeline, Gantt chart, PERT diagram, and stakeholder analysis.",
    tags: ["Project Management", "Charter", "Gantt", "PERT", "Stakeholders"],
    color: "#6366f1",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    title: "Inventory Management Solution",
    subtitle: "AWS + MariaDB Database",
    description:
      "Implemented an inventory management database using AWS and MariaDB, enabling CRUD operations while ensuring data integrity with triggers, stored procedures, and ETL processes.",
    tags: ["AWS", "MariaDB", "CRUD", "ETL", "Stored Procedures"],
    color: "#22c55e",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
]

/** ---------------------------
 *  FEATURED CONTENT (OPTIONAL)
 *  - Update images/CTAs here
 *  -------------------------- */
const featuredByTitle: Record<string, FeaturedProjectExtras> = {
  DeliverEase: {
    badge: "Featured Project",
    metrics: [
      { value: "3+", label: "Platforms" },
      { value: "-22%", label: "Wait Time" },
      { value: "-18%", label: "Cost" },
    ],
    outcomes: [
      "Integrated multi-platform ordering flows to reduce customer wait times",
      "Designed comparison UX that surfaced the best price + ETA per order",
      "Created personas, journeys, and workflow diagrams to align stakeholders",
      "Produced Figma wireframes and user stories to accelerate delivery",
    ],
    ctaLabel: "View Case Study",
    ctaHref: "https://www.linkedin.com/posts/srinainigarimella_product-canvas-deliverease-activity-7261982742614093824-wrNK?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFM4WYUB25ZZNH8R5dirjXMSvL5M4CKYoyk",
    imageSrc: deliverease.src,
    imageAlt: "DeliverEase preview",
  },
  Swapify: {
    badge: "Featured Project",
    metrics: [
      { value: "2-sided", label: "Marketplace" },
      { value: "Tokens", label: "Economy" },
      { value: "1:1", label: "Sessions" },
    ],
    outcomes: [
      "Translated user needs into a skill-matching and exchange workflow",
      "Designed token-based exchange mechanics for trust + fairness",
      "Built scheduling and session management flows for repeat engagement",
      "Delivered wireframes supporting discovery, chat, and bookings",
    ],
    ctaLabel: "View Prototype",
    ctaHref: "https://drive.google.com/drive/folders/14Cu9xpASHGKsOFdohPX6Hne8jkMS7Iqa?usp=sharing",
    imageSrc: swapify.src,
    imageAlt: "Swapify preview",
  },
  Thyraguard: {
    badge: "Featured Project",
    metrics: [
      { value: "21", label: "Interviews" },
      { value: "2", label: "Pivots" },
      { value: "1", label: "Segment" },
    ],
    outcomes: [
      "Validated a thyroid patient segment through interviews + shadowing",
      "Synthesized findings into an evidence-backed Lean Canvas",
      "Ran iterative discovery leading to two strategic pivots",
      "Aligned product direction with patient pain points + constraints",
    ],
    ctaLabel: "View Discovery",
    ctaHref: "https://drive.google.com/drive/folders/1aFm1MYXYsTk95eF1sb86dFt3Dbh5pAPT?usp=sharing",
    imageSrc: thyraguard.src,
    imageAlt: "Thyraguard preview",
  },
  "Augmented AI Services": {
    badge: "Featured Project",
    metrics: [
      { value: "OCR", label: "Extraction" },
      { value: "Voice", label: "Navigation" },
      { value: "A11y", label: "Focused" },
    ],
    outcomes: [
      "Built an accessibility demo with OCR-based text extraction",
      "Added speech recognition for hands-free navigation and input",
      "Designed UX patterns for clarity, error handling, and speed",
      "Showcased AI capabilities in an end-to-end web experience",
    ],
    ctaLabel: "View Demo",
    ctaHref: "https://splendid-elf-b4a5a7.netlify.app/",
    imageSrc: augmentedai.src,
    imageAlt: "Augmented AI Services preview",
  },
  "CT Publishing": {
    badge: "Featured Project",
    metrics: [
      { value: "ONIX", label: "Compliance" },
      { value: "SRS", label: "Spec" },
      { value: "Clear", label: "Workflows" },
    ],
    outcomes: [
      "Documented functional workflows and compliance rules in an SRS",
      "Clarified edge cases and validation rules to reduce rework",
      "Aligned stakeholders on feed structure, mapping, and automation",
      "Improved delivery confidence with testable requirements",
    ],
    ctaLabel: "View Case Study",
    ctaHref: "#",
    imageSrc: ct.src,
    imageAlt: "CT Publishing preview",
  },

  // ✅ Added featured extras for the two new projects
  "Cybersecurity Enhancement for Apollo Financial Services": {
    badge: "Featured Project",
    metrics: [
      { value: "7", label: "Artifacts" },
      { value: "PM", label: "Toolkit" },
      { value: "Risk", label: "Focused" },
    ],
    outcomes: [
      "Produced a complete project charter and scope for stakeholder alignment",
      "Created budget, timeline, and Gantt plan to track delivery milestones",
      "Built a PERT diagram to map dependencies and critical path",
      "Performed stakeholder analysis to clarify roles, influence, and communication",
    ],
    ctaLabel: "View Case Study",
    ctaHref: "#",
    imageSrc: cybersecurity.src,
    imageAlt: "Apollo Financial Services cybersecurity case study preview",
  },
  "Inventory Management Solution": {
    badge: "Featured Project",
    metrics: [
      { value: "AWS", label: "Deployed" },
      { value: "CRUD", label: "Ops" },
      { value: "ETL", label: "Pipelines" },
    ],
    outcomes: [
      "Designed a MariaDB schema supporting scalable inventory operations",
      "Implemented CRUD flows with integrity constraints and validations",
      "Added triggers and stored procedures to enforce business rules",
      "Built ETL processes to keep data clean and consistent across sources",
    ],
    ctaLabel: "View Build",
    ctaHref: "#",
    imageSrc: inventory.src,
    imageAlt: "Inventory management database preview",
  },
}

// Fallbacks if you don’t fill in featuredByTitle yet
const fallbackFeatured: Required<
  Pick<
    FeaturedProjectExtras,
    "badge" | "metrics" | "outcomes" | "ctaLabel" | "ctaHref" | "imageSrc" | "imageAlt"
  >
> = {
  badge: "Featured Project",
  metrics: [
    { value: "Impact", label: "Delivered" },
    { value: "Systems", label: "Built" },
    { value: "Quality", label: "Improved" },
  ],
  outcomes: [
    "Shipped iteratively with clear milestones and measurable outcomes",
    "Improved usability and/or operational clarity through structured design",
    "Reduced risk by clarifying requirements and edge cases early",
    "Aligned stakeholders with strong documentation and communication",
  ],
  ctaLabel: "View Case Study",
  ctaHref: "#",
  imageSrc: "/aurora-card.png",
  imageAlt: "Project preview",
}

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0
  return ((i % len) + len) % len
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])
  return reduced
}

function FeaturedProjectCard({ project }: { project: Project }) {
  const extras = featuredByTitle[project.title] ?? {}
  const badge = extras.badge ?? fallbackFeatured.badge
  const metrics = extras.metrics ?? fallbackFeatured.metrics
  const outcomes = extras.outcomes ?? fallbackFeatured.outcomes
  const ctaLabel = extras.ctaLabel ?? fallbackFeatured.ctaLabel
  const ctaHref = extras.ctaHref ?? fallbackFeatured.ctaHref
  const imageSrc = extras.imageSrc ?? fallbackFeatured.imageSrc
  const imageAlt = extras.imageAlt ?? `${project.title} preview`

  return (
    <article
      className="
        relative rounded-[32px] bg-background
        border-2 border-primary/20
        shadow-[0_12px_40px_rgba(0,0,0,0.06)]
        p-6 md:p-10
      "
    >
      <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-primary/10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Left: image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
            <img src={imageSrc} alt={imageAlt} className="w-full h-auto block" draggable={false} />
          </div>
        </div>

        {/* Right: content */}
        <div className="relative">
          <div className="flex justify-center lg:justify-start">
            <span
              className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold border"
              style={{
                color: project.color,
                borderColor: `${project.color}35`,
                backgroundColor: `${project.color}18`,
              }}
            >
              {badge}
            </span>
          </div>

          <h3 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center lg:text-left">
            {project.title}
          </h3>

          <p className="mt-2 font-semibold text-center lg:text-left" style={{ color: project.color }}>
            {project.subtitle}
          </p>

          <p className="mt-4 text-muted-foreground leading-relaxed text-center lg:text-left">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl bg-muted/30 border border-border px-5 py-4 text-center"
              >
                <div className="text-lg font-bold" style={{ color: project.color }}>
                  {m.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Outcomes */}
          <div className="mt-7">
            <div className="font-semibold text-foreground mb-3">Key Outcomes:</div>
            <ul className="space-y-2.5">
              {outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-muted-foreground">
                  <span
                    className="mt-2 h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="mt-7 flex flex-wrap gap-2 justify-center lg:justify-start">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-7 flex justify-center lg:justify-start">
            <a
              href={ctaHref}
              className="
                inline-flex items-center gap-2 rounded-2xl
                border border-border bg-background
                px-5 py-3 text-sm font-semibold
                hover:bg-muted/40 transition
              "
            >
              {ctaLabel}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 3h7v7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14L21 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

function Dot({
  active,
  color,
  onClick,
  label,
}: {
  active: boolean
  color: string
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="h-2.5 w-2.5 rounded-full transition-transform focus:outline-none focus:ring-2 focus:ring-primary/50"
      style={{
        backgroundColor: active ? color : "rgba(0,0,0,0.15)",
        transform: active ? "scale(1.15)" : "scale(1)",
      }}
    />
  )
}

function ArrowButton({
  onClick,
  direction,
}: {
  onClick: () => void
  direction: "prev" | "next"
}) {
  const isPrev = direction === "prev"
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous project" : "Next project"}
      className="
        inline-flex items-center justify-center
        h-11 w-11 rounded-2xl border border-border bg-background
        hover:bg-muted/40 transition
        focus:outline-none focus:ring-2 focus:ring-primary/50
      "
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={isPrev ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export function ProjectsSection() {
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const len = projects.length
  const safeIndex = clampIndex(index, len)

  const go = (next: number) => {
    const nextIndex = clampIndex(next, len)
    setDirection(nextIndex > safeIndex ? 1 : -1)
    setIndex(nextIndex)
  }

  const next = () => go(safeIndex + 1)
  const prev = () => go(safeIndex - 1)

  // keyboard navigation when focused in section
  const sectionRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }

    el.addEventListener("keydown", onKeyDown)
    return () => el.removeEventListener("keydown", onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeIndex, len])

  // swipe constraints
  const dragConstraints = useMemo(() => ({ left: 0, right: 0 }), [])

  return (
    <section
      id="projects"
      ref={(n) => {
        sectionRef.current = n
      }}
      tabIndex={-1}
      className="relative z-10 py-20 md:py-28 px-4 outline-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-4">
                      <span 
                        className="text-6xl md:text-7xl font-bold text-primary/10"
                        style={{ fontFamily: "var(--font-handwritten)" }}
                      >
                        03
                      </span>
                      <div>
                        <h2 
                          className="text-3xl md:text-4xl font-bold text-foreground"
                        >
                          Projects
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
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={projects[safeIndex].title}
                className="w-full"
                initial={
                  reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction === 1 ? 40 : -40 }
                }
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction === 1 ? -40 : 40 }}
                transition={{ duration: reducedMotion ? 0.2 : 0.35, ease: "easeOut" }}
                drag={reducedMotion ? false : "x"}
                dragConstraints={dragConstraints}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (reducedMotion) return
                  const threshold = 60
                  if (info.offset.x > threshold) prev()
                  if (info.offset.x < -threshold) next()
                }}
              >
                <FeaturedProjectCard project={projects[safeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ArrowButton onClick={prev} direction="prev" />
              <ArrowButton onClick={next} direction="next" />
            </div>

            <div className="flex items-center gap-2">
              {projects.map((p, i) => (
                <Dot
                  key={p.title}
                  active={i === safeIndex}
                  color={p.color}
                  onClick={() => go(i)}
                  label={`Go to ${p.title}`}
                />
              ))}
            </div>

            <div className="text-sm text-muted-foreground tabular-nums">
              {safeIndex + 1} / {len}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
