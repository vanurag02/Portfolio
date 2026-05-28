import MainLayout from "../layouts/MainLayout";
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

const EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "PES Modern College of Engineering, Pune",
    year: "2023 — 2025",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Kaveri College of Arts, Science and Commerce",
    year: "2020 — 2023",
  },
  {
    degree: "HSC (12th)",
    institution: "MES Sou Vimlabai Garware High School, Junior College",
    year: "2018",
  },
  {
    degree: "SSC (10th)",
    institution: "Madhav Sadashiv Golwalkar Guruji Vidyalaya",
    year: "2016",
  },
];

const Home = () => {
  return (
    <MainLayout>
      {/* =============== ABOUT SECTION =============== */}
      <section
        id="about"
        className="min-h-screen flex items-center px-16 py-24"
      >
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
            <span className="font-medium uppercase tracking-wider text-(--color-primary)">
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
            <span
              className="relative inline-block"
              style={{ color: "var(--color-primary)" }}
            >
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

      {/* =============== EDUCATION SECTION =============== */}
      <section
        id="education"
        className="min-h-screen flex items-center px-16 py-24"
      >
        <motion.div
          className="w-full max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* ── Section label ── */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-12"
          >
            <span className="font-medium uppercase tracking-wider text-(--color-primary)">
              Education
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
              className="absolute left-1.75 top-2 bottom-2 w-px"
              style={{ background: "var(--color-border)" }}
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            />

            <div className="flex flex-col gap-10">
              {EDUCATION.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative flex gap-8 pl-8"
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                    style={{
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
                    {/* Inner dot */}
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--color-primary)" }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-xstracking-widest uppercase"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {item.year}
                    </span>

                    <h3
                      className="text-base font-semibold leading-snug"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {item.degree}
                    </h3>

                    <span
                      className="text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {item.institution}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default Home;
