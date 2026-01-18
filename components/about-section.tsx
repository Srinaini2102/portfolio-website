"use client"

import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section header with hand-drawn underline */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-3xl md:text-4xl font-bold text-foreground inline-block relative"
            style={{ fontFamily: "var(--font-handwritten)" }}
          >
            about me
            {/* Hand-drawn underline */}
            <motion.svg
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 120 12"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.path
                d="M 2 6 Q 30 2, 60 6 Q 90 10, 118 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-primary"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.svg>
          </h2>
        </motion.div>

        {/* About content card */}
        <motion.div
          className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Corner scribble decoration */}
          <svg className="absolute top-3 right-3 w-8 h-8 text-primary/20" viewBox="0 0 30 30">
            <path
              d="M 5 25 Q 5 5, 25 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Main paragraph */}
          <motion.p
            className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {"Hey! I'm someone who enjoys sitting at the intersection of "}
            <span className="text-primary font-semibold">product, design, data, and code.</span>
            {" I’ve worked on products where I conducted user research and interviews, designed flows and prototypes in Figma, analyzed data using SQL, Python, and Power BI, and built front-end and backend components using React and databases. This mix helps me bridge the gap between what should be built and how it gets built."}
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {"My approach is simple: "}
            <span 
              className="text-primary"
              
            >
              understand users deeply, design with intention, validate with data, and iterate endlessly.
            </span>
          </motion.p>

          {/* Skills/interests tags */}
          <motion.div
            className="flex flex-wrap gap-2 mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {["Product Management", "UX Design", "Figma", "User Research", "Agile/Scrum", "Data Analysis", "Power BI"].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-3 py-1.5 bg-muted text-muted-foreground text-sm rounded-full border border-border/50"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          {/* Fun fact with arrow */}
          <motion.div
            className="mt-8 flex items-start gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {/* Small arrow pointing to the fun fact */}
            <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" viewBox="0 0 24 24">
              <path
                d="M 4 12 Q 8 8, 12 12 Q 16 16, 20 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 20 12 L 16 9 M 20 12 L 16 15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p 
              className="text-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-handwritten)", fontSize:"20px" }}
            >
              {"Fun fact: I believe the best products come from truly listening to users - I've conducted 21+ interviews and shadowing sessions to validate ideas before building!"}
            </p>
          </motion.div>

          {/* Bottom corner decoration */}
          <svg className="absolute bottom-3 left-3 w-6 h-6 text-accent/20" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Currently section */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Currently doing */}
          <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-5">
            <h3 
              className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2"
              style={{ fontFamily: "var(--font-handwritten)" }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Currently
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">-</span>
                MS in MIS @ Texas A&M
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">-</span>
                Product & UX Research
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">-</span>
                Open to PM/UX opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">-</span>
                LLM-powered product ideas
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">-</span>
                AI for product analytics
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-5">
            <h3 
              className="text-lg font-semibold text-foreground mb-3"
              style={{ fontFamily: "var(--font-handwritten)" }}
            >
              {"What I Bring"}
            </h3>
            <div className="flex flex-wrap gap-2">
              <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">-</span>
                Product + tech bridge
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">-</span>
                Data-informed decisions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">-</span>
                Ownership from idea to execution
              </li>
              
            </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
