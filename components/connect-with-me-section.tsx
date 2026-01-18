"use client"

import React, { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Calendar, Send, Sparkles, Mail } from "lucide-react"

const CALENDLY_URL = "https://calendly.com/srinaini2102/30min"
const LINKEDIN_URL = "https://www.linkedin.com/in/srinainigarimella/"
const GITHUB_URL = "https://github.com/srinaini2102"

type Status = "idle" | "sending" | "success" | "error"

export default function ConnectWithMeSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorText, setErrorText] = useState<string>("")

  const formspreeEndpoint = useMemo(() => {
    // Set in .env.local: NEXT_PUBLIC_FORMSPREE_ENDPOINT="https://formspree.io/f/xxxxxx"
    return process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
  }, [])

  const canSendViaFormspree = Boolean(formspreeEndpoint)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorText("")
    setStatus("sending")

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error")
      setErrorText("Please fill out all fields.")
      return
    }

    if (canSendViaFormspree) {
      try {
        const res = await fetch(formspreeEndpoint as string, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: "Portfolio — Connect With Me",
          }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => null)
          throw new Error(data?.error || "Submission failed.")
        }

        setStatus("success")
        setName("")
        setEmail("")
        setMessage("")
        return
      } catch (err: any) {
        setStatus("error")
        setErrorText(err?.message || "Something went wrong. Please try again.")
        return
      }
    }

    // mailto fallback
    const subject = encodeURIComponent("Portfolio — Connect With Me")
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`)
    window.location.href = `mailto:srinaini.garimella@tamu.edu?subject=${subject}&body=${body}`

    setStatus("success")
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <section id="connect" className="relative z-10 py-20 md:py-28 px-4" aria-label="Connect With Me">
      <div className="max-w-5xl mx-auto">
        {/* Header aligned like your other sections */}
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
              06
            </span>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Connect With Me</h2>
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
            let&apos;s build something (or just vibe)
          </p>
        </motion.div>

        {/* Wrapper so absolute bg aligns with this section container */}
        <div className="relative">
          {/* soft decorative background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden="true"
              className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.55), transparent 65%)",
              }}
              animate={{ x: [0, 18, 0], y: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(circle at 60% 60%, rgba(16,185,129,0.5), transparent 65%)",
              }}
              animate={{ x: [0, -14, 0], y: [0, -12, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* subtle lines */}
            <svg
              className="absolute top-10 right-10 opacity-[0.12]"
              width="260"
              height="140"
              viewBox="0 0 260 140"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 120C52 78 72 88 104 62C142 30 170 40 198 20C220 4 238 6 250 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M18 132C60 90 82 98 112 76C146 50 172 56 202 40C224 28 242 26 252 28"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="
                rounded-[28px] border border-border bg-card/70 backdrop-blur
                p-7 md:p-10
                shadow-[0_16px_60px_rgba(0,0,0,0.08)]
                relative overflow-hidden
              "
            >
              <motion.div
                className="absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-25"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(236,72,153,0.55), transparent 70%)",
                }}
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />

              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">Connect</span>
              </div>

              {/* DO NOT change this text */}
              <h3 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Code, Ship, Iterate… or Just Vibe
              </h3>

              <p className="mt-4 text-muted-foreground leading-relaxed text-base md:text-lg whitespace-pre-line">
                Full-stack project? AI product? PM case?
                {"\n"}Or just want to talk ideas, products, or random tech thoughts?
                {"\n\n"}No agenda. No pressure.
                {"\n"}Let’s connect and see where it goes.
              </p>

              <div className="mt-8 flex items-center gap-3 text-muted-foreground/80">
                <div className="h-px flex-1 bg-border/80" />
                <motion.div
                  className="inline-flex items-center gap-2 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  <Mail className="h-4 w-4" />
                  <span>Say hi</span>
                </motion.div>
                <div className="h-px flex-1 bg-border/80" />
              </div>

              <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
                <MotionLinkButton
                  href={LINKEDIN_URL}
                  label="Connect on LinkedIn"
                  icon={<Linkedin className="h-4 w-4" />}
                  kind="primary"
                />
                <MotionLinkButton
                  href={GITHUB_URL}
                  label="GitHub"
                  icon={<Github className="h-4 w-4" />}
                  kind="secondary"
                />
                <MotionLinkButton
                  href={CALENDLY_URL}
                  label="Schedule a 15/30-min chat"
                  icon={<Calendar className="h-4 w-4" />}
                  kind="ghost"
                />
              </div>

              <motion.div
                className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span>Or send a message</span>
                <ArrowUpRight className="h-4 w-4" />
              </motion.div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="
                rounded-[28px] border border-border bg-background/60 backdrop-blur
                p-7 md:p-10
                shadow-[0_16px_60px_rgba(0,0,0,0.08)]
                relative overflow-hidden
              "
            >
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(circle at 20% 10%, rgba(99,102,241,0.16), transparent 55%), radial-gradient(circle at 90% 90%, rgba(16,185,129,0.14), transparent 55%)",
                }}
                aria-hidden="true"
              />

              <div className="relative">
                <h4 className="text-xl md:text-2xl font-bold text-foreground">Send a message</h4>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <Field
                    label="Name"
                    value={name}
                    onChange={(v) => setName(v)}
                    placeholder="Your name"
                    type="text"
                  />
                  <Field
                    label="Email"
                    value={email}
                    onChange={(v) => setEmail(v)}
                    placeholder="you@example.com"
                    type="email"
                  />
                  <Field
                    label="Message"
                    value={message}
                    onChange={(v) => setMessage(v)}
                    placeholder="Leave a message"
                    type="textarea"
                  />

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      w-full inline-flex items-center justify-center gap-2
                      rounded-2xl px-5 py-3 font-semibold
                      bg-primary text-primary-foreground
                      shadow-lg shadow-primary/20
                      hover:shadow-xl hover:shadow-primary/25
                      transition
                      disabled:opacity-60 disabled:cursor-not-allowed
                    "
                  >
                    <Send className="h-4 w-4" />
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </motion.button>

                  <div className="pt-2 text-sm text-muted-foreground">
                    <p>I usually reply within 24–48 hours.</p>
                    <p className="mt-1">
                      Calendly Link :{" "}
                      <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4 hover:text-foreground transition"
                      >
                        {CALENDLY_URL}
                      </a>
                    </p>
                  </div>

                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="mt-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-emerald-700 dark:text-emerald-300"
                      >
                        Thanks! I’ll get back to you soon.
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="mt-3 rounded-2xl border border-rose-500/25 bg-rose-500/10 p-4 text-rose-700 dark:text-rose-300"
                      >
                        {errorText || "Something went wrong. Please try again."}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                <div className="mt-6 text-xs text-muted-foreground/80">
                  Messages sent to: <span className="font-medium">srinaini.garimella@tamu.edu</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MotionLinkButton({
  href,
  label,
  icon,
  kind,
}: {
  href: string
  label: string
  icon: React.ReactNode
  kind: "primary" | "secondary" | "ghost"
}) {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary/50"

  const styles =
    kind === "primary"
      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/25"
      : kind === "secondary"
      ? "bg-card border border-border text-foreground hover:bg-muted/40"
      : "bg-transparent border border-border text-foreground hover:bg-muted/40"

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${styles}`}
    >
      {icon}
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4 opacity-70" />
    </motion.a>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type: "text" | "email" | "textarea"
}) {
  const common =
    "w-full rounded-2xl border border-border bg-background/70 backdrop-blur px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition"

  const focus = "focus:ring-2 focus:ring-primary/30 focus:border-primary/40 hover:border-primary/30"

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>

      {type === "textarea" ? (
        <motion.textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          whileFocus={{ scale: 1.01 }}
          className={`${common} ${focus} resize-none`}
        />
      ) : (
        <motion.input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={type}
          whileFocus={{ scale: 1.01 }}
          className={`${common} ${focus}`}
        />
      )}
    </div>
  )
}
