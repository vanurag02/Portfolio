import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const EXPERIENCE = [
  {
    role: "Android Developer Intern",
    company: "SynapTechVerse LLP",
    duration: "February 2025 — June 2025",
    description:
      "Built and maintained Android features using Kotlin and Firebase.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="flex items-center px-16 py-24">
      <motion.div
        className="w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
      >
        {/* ── Section label ── */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-medium uppercase tracking-wider text-[var(--color-primary)]">
            Experience
          </span>
          <div
            className="h-px flex-1 max-w-16"
            style={{
              background:
                "linear-gradient(90deg, var(--color-primary), transparent)",
            }}
          />
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute top-2 bottom-2 w-px"
            style={{ left: "7px", background: "var(--color-border)" }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          />

          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex gap-8 pl-8"
              >
                {/* Dot */}
                <motion.div
                  className="absolute top-1.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                  style={{
                    left: 0,
                    borderColor: "var(--color-primary)",
                    background: "var(--color-bg)",
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    delay: 0.1 * index,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--color-primary)" }}
                  />
                </motion.div>

                {/* Content */}
                <div className="flex flex-col gap-1.5">
                  {/* Duration */}
                  <span
                    className="text-base uppercase"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {item.duration}
                  </span>

                  {/* Role */}
                  <h3
                    className="text-xl font-semibold leading-snug"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {item.role}
                  </h3>

                  {/* Company */}
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {item.company}
                  </span>

                  {/* Description */}
                  <p
                    className="text-sm mt-1"
                    style={{
                      color: "var(--color-text-secondary)",
                      lineHeight: "1.7",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
