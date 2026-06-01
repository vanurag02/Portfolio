import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username.trim()) return setError("Username is required");
    if (!form.password.trim()) return setError("Password is required");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");

    setLoading(true);
    const result = await login(form.username.trim(), form.password);
    if (!result.success) setError(result.message);
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--color-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        {/* ── Header ── */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
              delay: 0.1,
            }}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "4px",
              background: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Lock size={20} color="#ffffff" />
          </motion.div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Admin Login
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Sign in to manage your portfolio
          </p>
        </div>

        {/* ── Card ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            borderRadius: "4px",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg-subtle)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxShadow: "0px 18px 24px -12px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Username */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Username
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderRadius: "10px",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg)",
                padding: "10px 12px",
              }}
            >
              <User
                size={15}
                style={{ color: "var(--color-text-secondary)", flexShrink: 0 }}
              />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                autoComplete="username"
                style={{
                  flex: 1,
                  fontSize: "14px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--color-text-primary)",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Password
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderRadius: "10px",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg)",
                padding: "10px 12px",
              }}
            >
              <Lock
                size={15}
                style={{ color: "var(--color-text-secondary)", flexShrink: 0 }}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                autoComplete="current-password"
                style={{
                  flex: 1,
                  fontSize: "14px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--color-text-primary)",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-secondary)",
                  flexShrink: 0,
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontSize: "14px",
                color: "var(--color-red-6)",
                fontWeight: "500",
              }}
            >
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            onClick={handleSubmit}
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "2px",
              border: "none",
              fontSize: "14px",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              background: loading
                ? "var(--color-border)"
                : "var(--color-primary)",
              color: "#ffffff",
              marginTop: "4px",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
