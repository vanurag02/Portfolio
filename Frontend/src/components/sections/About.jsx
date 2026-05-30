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

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center px-16 py-24">
      <motion.div
        className="max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* ── Section label ── */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-8"
        >
          <span className="font-semibold uppercase text-(--color-primary)">
            About Me
          </span>
          <div
            className="h-px flex-1 max-w-20"
            style={{
              background:
                "linear-gradient(90deg, var(--color-primary), transparent)",
            }}
          />
        </motion.div>

        {/* ── Heading ── */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-(--color-text-primary) mb-6 leading-tight"
        >
          Turning ideas into{" "}
          <span style={{ color: "var(--color-primary)" }}>
            reliable systems
          </span>
        </motion.h2>

        {/* ── Bio ── */}
        <motion.p
          variants={itemVariants}
          className="text-base text-(--color-text-secondary)"
          style={{ lineHeight: "1.8" }}
        >
          I'm Anurag Vaidya, an aspiring backend developer with a passion for
          building clean, efficient, and scalable server-side systems. I enjoy
          working with{" "}
          <span
            className="font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            Node.js, Express, and MongoDB
          </span>
          , and I'm constantly exploring how well-designed APIs and databases
          can power great user experiences.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default About;
