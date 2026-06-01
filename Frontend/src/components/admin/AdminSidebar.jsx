import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, Wrench, GraduationCap, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { id: "projects", label: "Projects", Icon: FolderOpen },
  { id: "skills", label: "Skills", Icon: Wrench },
  { id: "education", label: "Education", Icon: GraduationCap },
];

const sidebarVariants = {
  hidden: { x: -240, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const { logout, user } = useAuth();
  const [hoveredNav, setHoveredNav] = useState(null);

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="fixed left-0 top-0 flex h-screen w-60 flex-col pt-8 px-4 pb-6 justify-between border-r"
      style={{
        borderColor: "var(--color-border)",
        background: "var(--color-bg)",
      }}
    >
      {/* ── TOP ── */}
      <div className="flex flex-col gap-10">
        {/* Name */}
        <div className="px-2">
          <h1
            className="text-2xl font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            Admin Panel
          </h1>
          <motion.div
            className="my-3 h-0.5 w-8 rounded-full"
            style={{ background: "var(--color-primary)" }}
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
          />
          <p
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {user?.username}
          </p>
        </div>

        {/* Nav */}
        <nav>
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map(({ id, label, Icon }) => {
              const isActive = activeTab === id;
              const isHovered = hoveredNav === id;

              return (
                <motion.li key={id} whileTap={{ scale: 0.97 }}>
                  <button
                    onClick={() => setActiveTab(id)}
                    onMouseEnter={() => setHoveredNav(id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="relative w-full flex items-center gap-3 px-5 py-2.5 rounded-lg text-left"
                  >
                    {/* Background */}
                    <AnimatePresence>
                      {(isActive || isHovered) && (
                        <motion.div
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
                          className="absolute -left-px top-2 bottom-2 w-0.5 rounded-full"
                          style={{ background: "var(--color-primary)" }}
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={{ scaleY: 1, opacity: 1 }}
                          exit={{ scaleY: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Icon */}
                    <Icon
                      size={16}
                      style={{
                        color:
                          isActive || isHovered
                            ? "var(--color-primary)"
                            : "var(--color-text-secondary)",
                      }}
                    />

                    {/* Label */}
                    <motion.span
                      className="relative text-base font-medium"
                      style={{
                        color:
                          isActive || isHovered
                            ? "var(--color-primary)"
                            : "var(--color-text-secondary)",
                      }}
                      animate={{ x: isHovered && !isActive ? 4 : 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {label}
                    </motion.span>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* ── BOTTOM — Logout ── */}
      <div className="px-2">
        <div
          className="h-px mb-5"
          style={{
            background:
              "linear-gradient(90deg, var(--color-primary)40, var(--color-border), transparent)",
          }}
        />
        <motion.button
          onClick={logout}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 px-5 py-2.5 rounded-lg w-full text-left"
          style={{ color: "var(--color-red-5)" }}
        >
          <LogOut size={16} />
          <span className="text-base font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
