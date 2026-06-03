import { motion } from "framer-motion";
import useFetch from "../../hooks/useFetch";

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

const Education = () => {
  const { data: education, loading: eduLoading } = useFetch(
    "http://127.0.0.1:5000/api/education",
  );

  return (
    <section id="education" className="flex items-center px-16 py-24">
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
          <span className="font-semibold uppercase text-(--color-primary)">
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
        {eduLoading ? (
          <div className="flex flex-col gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-8 pl-8 animate-pulse">
                <div className="flex flex-col gap-2 w-full">
                  <div
                    className="h-3 w-24 rounded"
                    style={{ background: "var(--color-bg-subtle)" }}
                  />
                  <div
                    className="h-4 w-64 rounded"
                    style={{ background: "var(--color-bg-subtle)" }}
                  />
                  <div
                    className="h-3 w-48 rounded"
                    style={{ background: "var(--color-bg-subtle)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
              {(education || []).map((item, index) => (
                <motion.div
                  key={item._id}
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
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-base font-medium tracking-wide"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="text-xl font-semibold leading-snug"
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
        )}
      </motion.div>
    </section>
  );
};

export default Education;
