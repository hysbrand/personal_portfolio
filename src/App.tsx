import { useState, useEffect, useRef } from "react"

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Resume", "Contact"]

const SKILLS = {
  Languages: [
    { name: "C++", level: 85 },
    { name: "C#", level: 85 },
    { name: "SQL", level: 85 },
    { name: "Java", level: 75 },
  ],
  "Web & Development": [
    { name: "HTML & CSS", level: 80 },
    { name: "MySQL", level: 85 },
  ],
  "Tools & Platforms": [
    { name: "Visual Studio", level: 85 },
    { name: "MySQL Workbench", level: 85 },
    { name: "GitHub", level: 75 },
    { name: "Figma", level: 70 },
  ],
}

const PROJECTS = [
  {
    title: "Personal Portfolio Website",
    tag: "Web Development",
    desc: "A responsive personal portfolio website created to showcase my programming skills, education, work experience, and projects.",
    stack: ["HTML", "CSS", "TypeScript"],
    link: "#",
    github: "#",
    accent: "#00d4aa",
  },
  {
    title: "Future Value Calculator",
    tag: "C# Application",
    desc: "A C# application that calculates the future value of an investment using user-entered values and application logic.",
    stack: ["C#", "Visual Studio"],
    link: "#",
    github: "#",
    accent: "#4f8ef7",
  },
  {
    title: "Payment Application",
    tag: "C# Windows Forms",
    desc: "A Windows Forms application built in C# that uses multiple forms, event handlers, validation, and payment information.",
    stack: ["C#", "Windows Forms", "Visual Studio"],
    link: "#",
    github: "#",
    accent: "#a78bfa",
  },
  {
    title: "My Guitar Shop Database",
    tag: "Database Development",
    desc: "A MySQL database project using queries, views, stored procedures, functions, triggers, and other database programming techniques.",
    stack: ["SQL", "MySQL", "MySQL Workbench"],
    link: "#",
    github: "#",
    accent: "#f59e0b",
  },
]

const EXPERIENCE = [
  {
    role: "Off-Field Captain",
    org: "DICK'S Sporting Goods",
    period: "Current",
    type: "work",
    bullets: [
      "Serve in a key-carrying leadership position supporting daily store operations and customer service.",
      "Provide leadership and support to teammates while helping maintain efficient store operations.",
      "Assist with opening and closing responsibilities and other leadership duties.",
      "Successfully passed the Assistant Manager assessment in preparation for continued advancement.",
    ],
  },
]

const EDUCATION = {
  degree: "Computer Programming",
  school: "Augusta Technical College",
  period: "Expected December 2026",
  relevant: [
    "C++ Programming",
    "C# Programming",
    "Java Programming",
    "Database Systems",
    "MySQL",
    "Web Development",
  ],
}

function useActiveSection() {
  const [active, setActive] = useState("home")
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.toLowerCase())
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

function SkillBar({
  name,
  level,
  visible,
}: {
  name: string
  level: number
  visible: boolean
}) {
  return (
    <div className="group">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-sans text-[var(--color-text)]">
          {name}
        </span>
        <span className="text-xs font-mono text-[var(--color-teal)]">
          {level}%
        </span>
      </div>
      <div className="h-1.5 bg-[var(--color-surface-alt)] rounded-full overflow-hidden">
        <div
          className="skill-bar h-full bg-gradient-to-r from-[var(--color-teal)] to-[var(--color-blue)] rounded-full"
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  )
}

export default function App() {
  const active = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)
  const [skillsVisible, setSkillsVisible] = useState(false)
  const skillsRef = useRef<HTMLDivElement>(null)
  const [activeSkillTab, setActiveSkillTab] = useState("Languages")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const el = skillsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setSkillsVisible(true)
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="font-mono text-sm text-[var(--color-teal)] tracking-widest hover:opacity-80 transition-opacity"
          >
            &gt; heather_ysbrand
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                className={`nav-link font-mono text-xs tracking-widest uppercase transition-colors ${
                  active === l.toLowerCase()
                    ? "text-[var(--color-teal)] active"
                    : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                {l}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-px bg-[var(--color-text)] transition-all ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-[var(--color-text)] transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-[var(--color-text)] transition-all ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-alt)] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                className="font-mono text-xs tracking-widest uppercase text-left text-[var(--color-muted)] hover:text-[var(--color-teal)] transition-colors"
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HOME ── */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-[72px] relative overflow-hidden"
      >
        {/* background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* teal glow orb */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--color-teal)] opacity-[0.04] blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-24 relative">
          <div className="max-w-3xl">
            <p className="animate-fade-up font-mono text-xs text-[var(--color-teal)] tracking-[0.3em] uppercase mb-6">
              // hello world
            </p>
            <h1
              className="animate-fade-up delay-100 font-mono font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              I'm{" "}
              <span className="text-[var(--color-teal)] teal-glow">
                Heather Ysbrand
              </span>
              <span className="cursor-blink text-[var(--color-teal)]">_</span>
            </h1>
            <p className="animate-fade-up delay-200 font-mono text-[var(--color-blue)] text-lg mb-5">
              Computer Programming Student &amp; Aspiring Software Developer
            </p>
            <p className="animate-fade-up delay-300 font-sans text-[var(--color-muted)] text-lg leading-relaxed max-w-xl mb-10">
              Computer Programming student at Augusta Technical College with
              experience in C++, C#, Java, SQL, MySQL, and web development.
              Passionate about building my programming skills and creating
              practical software solutions. Expected to graduate in December
              2026.
            </p>
            <div className="animate-fade-up delay-400 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="px-6 py-3 bg-[var(--color-teal)] text-[var(--color-bg)] font-mono text-sm font-semibold tracking-widest rounded-sm hover:bg-[var(--color-teal-dim)] transition-colors"
              >
                VIEW PROJECTS
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-muted)] font-mono text-sm tracking-widest rounded-sm hover:border-[var(--color-teal)] hover:text-[var(--color-teal)] transition-colors"
              >
                GET IN TOUCH
              </button>
            </div>
          </div>

          {/* floating code snippet */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[340px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-xs text-[var(--color-dim)]">
                main.py
              </span>
            </div>
            <pre className="p-5 font-mono text-xs leading-relaxed overflow-x-auto">
              <code>
                <span className="text-[var(--color-blue)]">class </span>
                <span className="text-[var(--color-teal)]">Developer</span>
                <span className="text-[var(--color-text)]">:</span>
                {"\n"}
                <span className="text-[var(--color-dim)]"> </span>
                <span className="text-[var(--color-blue)]">def </span>
                <span className="text-[var(--color-text)]">
                  __init__(self):
                </span>
                {"\n"}
                <span className="text-[var(--color-dim)]"> </span>
                <span className="text-[var(--color-text)]">self.name = </span>
                <span className="text-[#a3e635]">"Heather Ysbrand"</span>
                {"\n"}
                <span className="text-[var(--color-dim)]"> </span>
                <span className="text-[var(--color-text)]">self.role = </span>
                <span className="text-[#a3e635]">"Aspiring Developer"</span>
                {"\n"}
                <span className="text-[var(--color-dim)]"> </span>
                <span className="text-[var(--color-text)]">
                  self.skills = [
                </span>
                {"\n"}
                <span className="text-[var(--color-dim)]"> </span>
                <span className="text-[#a3e635]">"Python"</span>
                <span className="text-[var(--color-text)]">, </span>
                <span className="text-[#a3e635]">"C++"</span>
                <span className="text-[var(--color-text)]">,</span>
                {"\n"}
                <span className="text-[var(--color-dim)]"> </span>
                <span className="text-[#a3e635]">"C#"</span>
                <span className="text-[var(--color-text)]">, </span>
                <span className="text-[#a3e635]">"Java"</span>
                {"\n"}
                <span className="text-[var(--color-text)]"> ]</span>
                {"\n"}
                <span className="text-[var(--color-dim)]"> </span>
                <span className="text-[var(--color-text)]">self.goal = </span>
                <span className="text-[#a3e635]">"Full-time SWE"</span>
                {"\n"}
                {"\n"}
                <span className="text-[var(--color-blue)]"> def </span>
                <span className="text-[var(--color-text)]">
                  get_hired(self):
                </span>
                {"\n"}
                <span className="text-[var(--color-dim)]"> </span>
                <span className="text-[var(--color-blue)]">return </span>
                <span className="text-[var(--color-teal)]">True</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        className="py-28 border-t border-[var(--color-border)]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel text="01 / ABOUT ME" />
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start mt-12">
            {/* photo placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] max-w-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1603575448878-868a20723f5d?w=480&h=600&fit=crop&auto=format"
                  alt="Heather Ysbrand — developer portrait"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />
              </div>
              {/* stat badges */}
              <div className="absolute -right-4 top-8 bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-sm px-4 py-3">
                <div className="font-mono text-2xl font-bold text-[var(--color-teal)]">
                  3.7
                </div>
                <div className="font-mono text-xs text-[var(--color-dim)] mt-0.5">
                  GPA
                </div>
              </div>
              <div className="absolute -right-4 bottom-16 bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-sm px-4 py-3">
                <div className="font-mono text-2xl font-bold text-[var(--color-blue)]">
                  4+
                </div>
                <div className="font-mono text-xs text-[var(--color-dim)] mt-0.5">
                  Projects
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-mono font-bold text-3xl md:text-4xl mb-6 leading-tight">
                Turning ideas into
                <br />
                <span className="text-[var(--color-teal)]">
                  working software
                </span>
              </h2>
              <div className="space-y-4 text-[var(--color-muted)] font-sans leading-relaxed">
                <p>
                  I'm a Computer Programming student at Augusta Technical
                  College, expected to graduate in December 2026. Through my
                  coursework, I've gained hands-on experience with C++, C#,
                  Java, SQL, MySQL, and web development while building practical
                  programming projects.
                </p>
                <p>
                  I enjoy learning new programming concepts and applying them
                  through hands-on projects. My coursework has given me
                  experience developing applications, working with databases,
                  debugging code, and creating solutions using multiple
                  programming languages.
                </p>
                <p>
                  In addition to my education, I bring strong leadership and
                  customer service experience from my current role as an
                  Off-Field Captain at DICK'S Sporting Goods. I serve in a
                  key-carrying leadership position and have successfully passed
                  the Assistant Manager assessment as I continue working toward
                  career advancement.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Location", value: "Augusta, GA" },
                  { label: "College", value: "Augusta Technical College" },
                  { label: "Graduation", value: "December 2026" },
                  { label: "Status", value: "Open to opportunities" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="border border-[var(--color-border)] rounded-sm px-4 py-3 bg-[var(--color-surface)]"
                  >
                    <div className="font-mono text-xs text-[var(--color-dim)] mb-1">
                      {label}
                    </div>
                    <div className="font-sans text-sm text-[var(--color-text)]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <a
                  href="https://github.com/hysbrand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--color-teal)] tracking-widest hover:underline"
                >
                  GitHub ↗
                </a>
                <a
                  href="/Heather_Ysbrand_Resume.pdf"
                  download="Heather_Ysbrand_Resume.pdf"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--color-teal)] tracking-widest hover:underline"
                >
                  Resume PDF ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section
        id="skills"
        className="py-28 border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]"
        ref={skillsRef}
      >
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel text="02 / SKILLS" />
          <div className="mt-12">
            {/* tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {Object.keys(SKILLS).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSkillTab(tab)}
                  className={`font-mono text-xs tracking-widest px-4 py-2 rounded-sm border transition-colors ${
                    activeSkillTab === tab
                      ? "border-[var(--color-teal)] text-[var(--color-teal)] bg-[var(--color-teal)]/10"
                      : "border-[var(--color-border)] text-[var(--color-dim)] hover:border-[var(--color-muted)] hover:text-[var(--color-muted)]"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {SKILLS[(activeSkillTab as keyof typeof SKILLS)].map((skill) => (
                <SkillBar
                  key={`skill-${skill.name}`}
                  name={skill.name}
                  level={skill.level}
                  visible={skillsVisible}
                />
              ))}
            </div>

            {/* extra chips */}
            <div className="mt-12">
              <p className="font-mono text-xs text-[var(--color-dim)] tracking-widest mb-4">
                ALSO FAMILIAR WITH
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "C++",
                  "C#",
                  "Java",
                  "SQL",
                  "MySQL",
                  "HTML",
                  "CSS",
                  "Visual Studio",
                  "Visual Studio Code",
                  "MySQL Workbench",
                  "GitHub",
                  "Figma",
                ].map((t) => (
                  <span
                    key={`chip-${t}`}
                    className="font-mono text-xs px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm text-[var(--color-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        className="py-28 border-t border-[var(--color-border)]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel text="03 / PROJECTS" />
          <p className="mt-4 text-[var(--color-muted)] font-sans max-w-xl">
            A selection of things I've built — from web apps to CLI tools.
          </p>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className="font-mono text-xs tracking-widest"
                      style={{ color: p.accent }}
                    >
                      {p.tag}
                    </span>
                    <h3 className="font-mono font-bold text-xl mt-1 text-[var(--color-text)]">
                      {p.title}
                    </h3>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <a
                      href={p.github}
                      className="font-mono text-xs text-[var(--color-dim)] hover:text-[var(--color-text)] transition-colors"
                    >
                      GH
                    </a>
                    <a
                      href={p.link}
                      className="font-mono text-xs text-[var(--color-dim)] hover:text-[var(--color-text)] transition-colors"
                    >
                      ↗
                    </a>
                  </div>
                </div>
                <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed flex-1">
                  {p.desc}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={`${p.title}-${s}`}
                      className="font-mono text-xs px-2.5 py-1 rounded-sm"
                      style={{ background: `${p.accent}18`, color: p.accent }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://github.com/hysbrand"
              className="font-mono text-xs text-[var(--color-muted)] tracking-widest hover:text-[var(--color-teal)] transition-colors"
            >
              View all projects on GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── RESUME ── */}
      <section
        id="resume"
        className="py-28 border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <SectionLabel text="04 / RESUME" />
            <a
              href={`${import.meta.env.BASE_URL}Heather_Ysbrand_Resume.pdf`}
              download="Heather_Ysbrand_Resume.pdf"
              className="font-mono text-xs tracking-widest px-5 py-2.5 border border-[var(--color-teal)] text-[var(--color-teal)] hover:bg-[var(--color-teal)] hover:text-[var(--color-bg)] transition-colors rounded-sm"
            >
              DOWNLOAD PDF ↓
            </a>
          </div>

          {/* Education */}
          <div className="mb-12">
            <h3 className="font-mono text-xs tracking-widest text-[var(--color-dim)] mb-6">
              EDUCATION
            </h3>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="font-mono font-bold text-lg text-[var(--color-text)]">
                    {EDUCATION.degree}
                  </div>
                  <div className="font-sans text-[var(--color-muted)] mt-1">
                    {EDUCATION.school}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs text-[var(--color-teal)]">
                    {EDUCATION.period}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="font-mono text-xs text-[var(--color-dim)] mb-2">
                  RELEVANT COURSEWORK
                </div>
                <div className="flex flex-wrap gap-2">
                  {EDUCATION.relevant.map((c) => (
                    <span
                      key={c}
                      className="font-mono text-xs px-2.5 py-1 bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-muted)] rounded-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Experience timeline */}
          {(["work", "leadership"] as const).map((type) => (
            <div key={type} className="mb-12">
              <h3 className="font-mono text-xs tracking-widest text-[var(--color-dim)] mb-6">
                {type === "work" ? "WORK EXPERIENCE" : "LEADERSHIP & COMMUNITY"}
              </h3>
              <div className="relative border-l border-[var(--color-border)] pl-8 space-y-8">
                {EXPERIENCE.filter((e) => e.type === type).map((exp) => (
                  <div key={exp.role} className="relative">
                    <div className="absolute -left-[33px] top-1 w-3 h-3 rounded-full border-2 border-[var(--color-teal)] bg-[var(--color-bg-alt)]" />
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="font-mono font-semibold text-[var(--color-text)]">
                          {exp.role}
                        </div>
                        <div className="font-sans text-sm text-[var(--color-muted)] mt-0.5">
                          {exp.org}
                        </div>
                      </div>
                      <div className="font-mono text-xs text-[var(--color-teal)] whitespace-nowrap">
                        {exp.period}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="font-sans text-sm text-[var(--color-muted)] leading-relaxed flex gap-2"
                        >
                          <span className="text-[var(--color-teal)] shrink-0 mt-0.5">
                            ›
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="py-28 border-t border-[var(--color-border)]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel text="05 / CONTACT" />
          <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-16">
            <div>
              <h2 className="font-mono font-bold text-3xl md:text-4xl mb-5 leading-tight">
                Let's build
                <br />
                <span className="text-[var(--color-teal)]">
                  something together
                </span>
              </h2>
              <p className="font-sans text-[var(--color-muted)] leading-relaxed mb-8">
                 I'm currently completing my Computer Programming program at Augusta
  Technical College and expect to graduate in December 2026. I'm interested
  in opportunities where I can continue developing my programming skills
  and gain professional experience. Feel free to get in touch!
                              </p>
              <div className="space-y-4">
                {[
                  { icon: "✉", label: "Email", value: "heather.ysbrand@gmail.com" },
                  {
                    icon: "📍",
                    label: "Location",
                    value: "Augusta, GA (open to remote)",
                  }
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm shrink-0 text-sm">
                      {icon}
                    </div>
                    <div>
                      <div className="font-mono text-xs text-[var(--color-dim)]">
                        {label}
                      </div>
                      <div className="font-sans text-sm text-[var(--color-text)] mt-0.5">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-8">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="font-mono text-4xl text-[var(--color-teal)] mb-4">
                    ✓
                  </div>
                  <div className="font-mono font-bold text-lg text-[var(--color-text)] mb-2">
                    Message sent!
                  </div>
                  <p className="font-sans text-sm text-[var(--color-muted)]">
                    Thanks for reaching out. I'll get back to you within 24
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <FormField
                    label="NAME"
                    type="text"
                    value={contactForm.name}
                    onChange={(v) => setContactForm((f) => ({ ...f, name: v }))}
                    placeholder="Jane Smith"
                    required
                  />
                  <FormField
                    label="EMAIL"
                    type="email"
                    value={contactForm.email}
                    onChange={(v) =>
                      setContactForm((f) => ({ ...f, email: v }))
                    }
                    placeholder="jane@company.com"
                    required
                  />
                  <div>
                    <label className="font-mono text-xs text-[var(--color-dim)] tracking-widest block mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((f) => ({
                          ...f,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Tell me about the role or project..."
                      required
                      className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm px-4 py-3 font-sans text-sm text-[var(--color-text)] placeholder:text-[var(--color-dim)] focus:outline-none focus:border-[var(--color-teal)] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[var(--color-teal)] text-[var(--color-bg)] font-mono text-sm font-semibold tracking-widest hover:bg-[var(--color-teal-dim)] transition-colors rounded-sm"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs text-[var(--color-dim)]">
            © 2026 Heather Ysbrand — built with Figma.
          </span>
         <div className="flex gap-6">
          <a
            href="https://github.com/hysbrand"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--color-dim)] hover:text-[var(--color-teal)] transition-colors"
          >
            GitHub
          </a>

          <a
            href={`${import.meta.env.BASE_URL}Heather_Ysbrand_Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--color-dim)] hover:text-[var(--color-teal)] transition-colors"
           >
            Resume
          </a>
        </div>
        </div>
      </footer>
    </div>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs tracking-[0.3em] text-[var(--color-teal)]">
        {text}
      </span>
      <div className="flex-1 h-px bg-[var(--color-border)]" />
    </div>
  )
}

function FormField({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="font-mono text-xs text-[var(--color-dim)] tracking-widest block mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-sm px-4 py-3 font-sans text-sm text-[var(--color-text)] placeholder:text-[var(--color-dim)] focus:outline-none focus:border-[var(--color-teal)] transition-colors"
      />
    </div>
  )
}
