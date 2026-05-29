import { motion } from "framer-motion";
import useFetch from "../../hooks/useFetch";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaJs,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiMongodb } from "react-icons/si";

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

const SKILL_ICONS = {
  HTML: { Icon: FaHtml5, color: "#E34F26" },
  CSS: { Icon: FaCss3Alt, color: "#1572B6" },
  Bootstrap: { Icon: FaBootstrap, color: "#7952B3" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  JavaScript: { Icon: FaJs, color: "#F7DF1E" },
  ReactJS: { Icon: FaReact, color: "#61DAFB" },
  "Node.js": { Icon: FaNodeJs, color: "#339933" },
  "Express.js": { Icon: SiExpress, color: "#888888" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
};

const Skills = () => {
  const { data: skills, loading: skillsLoading } = useFetch(
    "http://127.0.0.1:5000/api/skills",
  );

  const groupedSkills = skills
    ? skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
      }, {})
    : {};

  return (
    <section id="skills" className="flex items-center px-16 py-24">
      <motion.div
        className="w-full max-w-3xl"
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
          <span className="font-semibold uppercase text-(--color-primary)">
            Skills
          </span>
          <div
            className="h-px flex-1 max-w-16"
            style={{
              background:
                "linear-gradient(90deg, var(--color-primary), transparent)",
            }}
          />
        </motion.div>

        {/* ── Skill groups ── */}
        {skillsLoading ? (
          <div className="flex flex-col gap-10 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <div
                  className="h-3 w-24 rounded"
                  style={{ background: "var(--color-bg-subtle)" }}
                />
                <div className="flex gap-3 flex-wrap">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="h-20 w-24 rounded-xl"
                      style={{ background: "var(--color-bg-subtle)" }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {Object.entries(groupedSkills).map(
              ([category, items], catIndex) => (
                <motion.div key={category} variants={itemVariants}>
                  {/* ── Category label ── */}
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="text-base font-semibold uppercase tracking-wide"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {category}
                    </span>
                    <div
                      className="h-px flex-1"
                      style={{ background: "var(--color-border)" }}
                    />
                  </div>

                  {/* ── Skill cards ── */}
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill, index) => {
                      const skillIcon = SKILL_ICONS[skill.name];
                      const SkillIcon = skillIcon?.Icon;
                      const skillColor = skillIcon?.color;

                      return (
                        <motion.div
                          key={skill._id}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: catIndex * 0.1 + index * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex flex-col items-center justify-center gap-2 px-5 py-4 rounded border cursor-default"
                          style={{
                            borderColor: "var(--color-border)",
                            background: "var(--color-bg-subtle)",
                            minWidth: "90px",
                          }}
                        >
                          {SkillIcon ? (
                            <SkillIcon
                              size={28}
                              style={{ color: skillColor }}
                            />
                          ) : (
                            <span className="text-2xl">🔧</span>
                          )}
                          <span
                            className="font-medium text-center mt-4 tracking-wide leading-tight"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Skills;
