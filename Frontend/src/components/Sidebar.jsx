import { useRef, useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useActiveSection from "../hooks/useActiveSection";

/* =============== THEME CONFIG =============== */
const THEMES = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
];

/* =============== NAVIGATION ITEMS =============== */
const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
];

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

/* =============== ANIMATION VARIANTS =============== */
const sidebarVariants = {
  hidden: { x: -240, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const bottomVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.65 },
  },
};

/* =============== MAIN COMPONENT =============== */
function Sidebar() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system",
  );
  const activeSection = useActiveSection([
    "about",
    "education",
    "skills",
    "experience",
    "projects",
  ]);
  const [hoveredNav, setHoveredNav] = useState(null);
  const sidebarRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: -999, y: -999 });

  const handleMouseMove = (e) => {
    const rect = sidebarRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setSpotlight({ x: -999, y: -999 });
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  return (
    <motion.aside
      ref={sidebarRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="fixed left-0 top-0 flex h-screen w-60 flex-col pt-8 px-4 pb-6 justify-between drop-shadow-2xl border-r border-(--color-border) bg-(--color-bg) overflow-hidden"
    >
      {/* ── Decorative ambient glow ── */}
      <motion.div
        className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Subtle grid texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px),
                      linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          opacity: 0.12,
          WebkitMaskImage: `radial-gradient(circle 120px at ${spotlight.x}px ${spotlight.y}px, black 0%, transparent 70%)`,
          maskImage: `radial-gradient(circle 120px at ${spotlight.x}px ${spotlight.y}px, black 0%, transparent 70%)`,
        }}
      />

      {/* =============== TOP SECTION =============== */}
      <motion.div
        className="relative flex flex-col gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── NAME ── */}
        <motion.div variants={itemVariants} className="px-2">
          <h1 className="text-2xl font-medium text-(--color-text-primary) tracking-wide">
            Anurag Vaidya
          </h1>
          <motion.div
            className="my-3 h-0.5 w-8 rounded-full bg-(--color-primary)"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
          />
          <p className="text-[14px] font-medium uppercase tracking-wider text-(--color-text-secondary)">
            Backend Developer
          </p>
        </motion.div>

        {/* ── NAVIGATION ── */}
        <motion.nav variants={itemVariants}>
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive = `#${activeSection}` === href;
              const isHovered = hoveredNav === href;

              return (
                <motion.li key={href} whileTap={{ scale: 0.97 }}>
                  <a
                    href={href}
                    onMouseEnter={() => setHoveredNav(href)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="relative flex items-center gap-3 px-5 py-2.5 rounded-lg overflow-hidden group"
                    style={{ textDecoration: "none" }}
                  >
                    {/* Hover / active background */}
                    <AnimatePresence>
                      {(isActive || isHovered) && (
                        <motion.div
                          layoutId={isActive ? "nav-active-bg" : undefined}
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: isActive
                              ? "linear-gradient(90deg, var(--color-primary)18, transparent)"
                              : "var(--color-bg-subtle)",
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.18 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active left border */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-(--color-primary)"
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={{ scaleY: 1, opacity: 1 }}
                          exit={{ scaleY: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Label */}
                    <motion.span
                      className="relative font-medium"
                      style={{
                        color: isActive
                          ? "var(--color-primary)"
                          : "var(--color-text-secondary)",
                      }}
                      animate={{ x: isHovered && !isActive ? 4 : 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {label}
                    </motion.span>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </motion.nav>
      </motion.div>

      {/* =============== BOTTOM SECTION =============== */}
      <motion.div
        className="relative flex flex-col gap-5 px-2"
        variants={bottomVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── Divider ── */}
        <motion.div
          variants={itemVariants}
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, var(--color-primary)40, var(--color-border), transparent)",
          }}
        />

        {/* ── SOCIAL LINKS ── */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6"
        >
          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/v-anurag08/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-(--color-text-primary)"
            whileHover={{ color: "var(--color-primary)" }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/vanurag02"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-(--color-text-primary)"
            whileHover={{ color: "var(--color-primary)" }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
          </motion.a>
        </motion.div>

        {/* ── THEME SWITCHER ── */}
        <motion.div
          variants={itemVariants}
          className="relative flex items-center rounded-md border border-(--color-border) bg-(--color-bg-subtle) p-2 gap-1"
          role="group"
          aria-label="Theme selection"
        >
          {THEMES.map(({ value, label, Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              aria-label={`${label} theme`}
              title={`${label} theme`}
              className="relative flex flex-1 items-center justify-center rounded-md py-2 z-10"
            >
              {theme === value && (
                <motion.div
                  layoutId="theme-pill"
                  className="absolute inset-0 rounded-sm bg-(--color-bg) shadow-sm"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <motion.span
                className="relative z-10"
                animate={{
                  scale: theme === value ? 1.1 : 1,
                  color:
                    theme === value
                      ? "var(--color-primary)"
                      : "var(--color-text-secondary)",
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon size={15} />
              </motion.span>
            </button>
          ))}
        </motion.div>
      </motion.div>
    </motion.aside>
  );
}

export default Sidebar;
