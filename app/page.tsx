"use client"

import { motion, } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { ProfileCircle } from "@/components/profile-circle"
import { ProcessCards } from "@/components/process-cards"
import { WavyBackground } from "@/components/wavy-background"
import { AboutSection } from "@/components/about-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { EducationSection } from "@/components/education-section"
import { LeadershipSection } from "@/components/leadership-section"
import ConnectWithMeSection from "@/components/connect-with-me-section"

// ✅ Real typewriter: types + pauses + deletes + loops
function TypewriterTagline({
  phrases,
  startDelayMs = 600,
  typeSpeedMs = 55,
  deleteSpeedMs = 35,
  holdMs = 1100,
}: {
  phrases: string[]
  startDelayMs?: number
  typeSpeedMs?: number
  deleteSpeedMs?: number
  holdMs?: number
}) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  const currentPhrase = phrases[phraseIndex] ?? ""

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelayMs)
    return () => clearTimeout(t)
  }, [startDelayMs])

  useEffect(() => {
    if (!started) return

    if (!deleting && subIndex === currentPhrase.length) {
      const t = setTimeout(() => setDeleting(true), holdMs)
      return () => clearTimeout(t)
    }

    if (deleting && subIndex === 0) {
      const t = setTimeout(() => {
        setDeleting(false)
        setPhraseIndex((i) => (i + 1) % phrases.length)
      }, 250)
      return () => clearTimeout(t)
    }

    const speed = deleting ? deleteSpeedMs : typeSpeedMs
    const t = setTimeout(() => {
      setSubIndex((i) => i + (deleting ? -1 : 1))
    }, speed)

    return () => clearTimeout(t)
  }, [
    started,
    deleting,
    subIndex,
    currentPhrase.length,
    phrases.length,
    typeSpeedMs,
    deleteSpeedMs,
    holdMs,
  ])

  return (
    <span className="inline-flex items-center">
      <span>{currentPhrase.slice(0, subIndex)}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="inline-block w-[2px] h-[1em] bg-muted-foreground ml-0.5"
      />
    </span>
  )
}

/** ✅ Smooth scroll helper (accounts for fixed navbar height) */
function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const navOffset = 92 // matches the navbar height + padding
  const top = el.getBoundingClientRect().top + window.scrollY - navOffset
  window.scrollTo({ top, behavior: "smooth" })
}

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string>("top")

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]

        if (visible?.target?.id) setActive(visible.target.id)
      },
      {
        root: null,
        // this makes the "active" switch when section reaches near top under nav
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0.05, 0.1, 0.2, 0.35],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  // fallback: if at very top, mark "top"
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 40) setActive("top")
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return active
}

/** ✅ Sticky navbar with:
 *  1) SG top-left
 *  2) Active link highlight
 *  3) Smooth scroll
 */
function Navbar() {
  const links = [
    { label: "Home", id: "top" },
    { label: "About", id: "about" },
    { label: "Education", id: "education" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Leadership", id: "leadership" },
    { label: "Connect", id: "connect" },
  ]

  const active = useActiveSection(links.map((l) => l.id))

  return (
    <header className="fixed top-0 left-0 right-0 z-[60]">
      <div className="pt-4">
        <div className="relative w-full">
          {/* ✅ SG on the top-left */}
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="
              absolute left-4 top-0
              inline-flex items-center justify-center
              h-11 w-11 rounded-2xl
              border border-border bg-background/70 backdrop-blur-md
              shadow-lg shadow-black/5 dark:shadow-black/20
              hover:bg-muted/40 transition
              focus:outline-none focus:ring-2 focus:ring-primary/50
            "
            aria-label="Go to top"
            style={{ fontFamily: "var(--font-handwritten)", fontSize: "20px" }}
          >
            SG
          </button>

          {/* Nav pill */}
          <nav
            className="
              mx-auto w-fit max-w-[78vw]
              rounded-full border border-border
              bg-background/70 backdrop-blur-md
              shadow-lg shadow-black/5 dark:shadow-black/20
              px-2 py-2
            "
            aria-label="Site navigation"
          >
            <ul className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {links.map((l) => {
                const isActive = active === l.id
                return (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(l.id)}
                      className="
                        inline-flex items-center justify-center
                        px-3 py-2 rounded-full text-sm font-medium
                        transition whitespace-nowrap
                        focus:outline-none focus:ring-2 focus:ring-primary/50
                      "
                      style={{
                        fontFamily: "var(--font-handwritten)",
                        fontSize: "18px",
                        color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                        backgroundColor: isActive ? "hsl(var(--muted) / 0.6)" : "transparent",
                        border: isActive ? "1px solid hsl(var(--border))" : "1px solid transparent",
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {l.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right spacer so center nav stays centered visually (you can put socials here later) */}
          <div className="w-11" />
        </div>
      </div>
    </header>
  )
}

export default function Home() {
  const phrases = useMemo(
    () => ["Product Manager", "Data Analyst", "UI / UX Designer", "Front-end Developer"],
    []
  )

  return (
    // ✅ id="top" for Home + CSS smooth scroll fallback
    <main id="top" className="relative min-h-screen overflow-hidden bg-background scroll-smooth">
      <Navbar />

      <ThemeToggle />
      <WavyBackground />

      <div
        className="absolute inset-0 opacity-[0.15] z-[1]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* ✅ add top padding so navbar doesn't overlap hero */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-8 md:py-12 pt-28">
        <motion.div
          className="text-center mb-6 md:mb-8 mt-8 md:mt-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-2xl text-muted-foreground mb-1 mt-4"
            style={{ fontFamily: "var(--font-handwritten)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {"hey there! i'm"}
          </motion.p>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Srinaini Garimella
          </motion.h1>

          <motion.p
            className="text-xl md:text-xl text-muted-foreground max-w-xl mx-auto h-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TypewriterTagline
              phrases={phrases}
              startDelayMs={600}
              typeSpeedMs={55}
              deleteSpeedMs={35}
              holdMs={1100}
            />
          </motion.p>
        </motion.div>

        <div className="mb-8 md:mb-10 mt-16 md:mt-10">
          <ProfileCircle />
        </div>

        <div className="mt-6 md:mt-10">
          <ProcessCards />
        </div>

        <motion.div
          className="mt-8 md:mt-12 flex flex-col md:flex-row gap-3 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              scrollToId("projects")
            }}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: "var(--font-handwritten)", fontSize: "24px" }}
          >
            see my work
          </motion.a>
          <motion.a
            href="mailto:srinaini.garimella@tamu.edu"
            className="px-5 py-2.5 bg-card/80 backdrop-blur-sm text-foreground border border-border rounded-full text-sm font-medium hover:bg-card transition-colors duration-300"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: "var(--font-handwritten)", fontSize: "24px" }}
          >
            {"let's chat"}
          </motion.a>
        </motion.div>

        <motion.div
          className="mt-auto pb-6 flex flex-col items-center gap-1 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <motion.span className="text-3xl" style={{ fontFamily: "var(--font-handwritten)" }}>
            scroll down
          </motion.span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 5v14m0 0l-4-4m4 4l4-4"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative SVGs... (unchanged) */}
      <motion.svg
        className="absolute top-6 left-6 w-8 h-8 text-primary/20"
        viewBox="0 0 24 24"
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.5 }}
      >
        <path
          d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
          fill="currentColor"
        />
      </motion.svg>

      <motion.svg
        className="absolute top-8 right-8 w-6 h-6 text-accent/30"
        viewBox="0 0 24 24"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
      >
        <circle cx="12" cy="12" r="8" fill="currentColor" />
      </motion.svg>

      <motion.svg
        className="absolute bottom-32 right-12 w-8 h-8 text-primary/15"
        viewBox="0 0 24 24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: [0, 10, 0] }}
        transition={{ delay: 1, duration: 4, repeat: Infinity }}
      >
        <path
          d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
          fill="currentColor"
        />
      </motion.svg>

      {/* ✅ Sections (ensure these ids exist in those components) */}
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <LeadershipSection />
      <ConnectWithMeSection/>
    </main>
  )
}
