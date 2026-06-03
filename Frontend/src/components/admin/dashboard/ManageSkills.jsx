import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import useFetch from "../../../hooks/useFetch";

const EMPTY_FORM = { name: "", category: "", order: "" };
const CATEGORIES = ["Frontend", "Backend", "Database"];

const ManageSkills = () => {
  const { data: skills, loading } = useFetch(
    "http://127.0.0.1:5000/api/skills",
  );
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const data = items ?? skills ?? [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError("");
  };

  const validate = () => {
    if (!form.name.trim()) return "Skill name is required";
    if (!form.category.trim()) return "Category is required";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) return setFormError(err);

    setSubmitting(true);
    try {
      const url = editId
        ? `http://127.0.0.1:5000/api/skills/${editId}`
        : "http://127.0.0.1:5000/api/skills";

      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...form, order: Number(form.order) || 0 }),
      });
      const json = await res.json();
      if (!json.success) return setFormError(json.message);

      if (editId) {
        setItems(data.map((i) => (i._id === editId ? json.data : i)));
      } else {
        setItems([...data, json.data]);
      }
      resetForm();
    } catch {
      setFormError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, category: item.category, order: item.order });
    setEditId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await fetch(`http://127.0.0.1:5000/api/skills/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setItems(data.filter((i) => i._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
    setFormError("");
  };

  // Group by category for display
  const grouped = data.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Skills
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Manage your skills
          </p>
        </div>
        <motion.button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium"
          style={{ background: "var(--color-primary)", color: "#ffffff" }}
        >
          <Plus size={16} />
          Add Skill
        </motion.button>
      </div>

      {/* ── Form ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="rounded-md border p-6 mb-6 flex flex-col gap-4"
            style={{
              borderColor: "var(--color-primary)",
              background: "var(--color-bg-subtle)",
            }}
          >
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {editId ? "Edit Skill" : "New Skill"}
            </h3>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Skill name (e.g. Node.js)"
              className="w-full rounded-sm border px-3 py-2.5 text-sm outline-none"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-bg)",
                color: "var(--color-text-primary)",
              }}
            />

            {/* Category dropdown */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-sm border px-3 py-2.5 text-sm outline-none"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-bg)",
                color: form.category
                  ? "var(--color-text-primary)"
                  : "var(--color-text-secondary)",
              }}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              name="order"
              value={form.order}
              onChange={handleChange}
              placeholder="Display order (1, 2...)"
              type="number"
              className="w-full rounded-sm border px-3 py-2.5 text-sm outline-none"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-bg)",
                color: "var(--color-text-primary)",
              }}
            />

            {formError && (
              <p className="text-xs" style={{ color: "var(--color-red-6)" }}>
                {formError}
              </p>
            )}

            <div className="flex gap-3">
              <motion.button
                onClick={handleSubmit}
                disabled={submitting}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium"
                style={{ background: "var(--color-primary)", color: "#ffffff" }}
              >
                <Check size={14} />
                {submitting ? "Saving..." : "Save"}
              </motion.button>
              <motion.button
                onClick={resetForm}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium"
                style={{
                  background: "var(--color-bg-subtle)",
                  color: "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <X size={14} />
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── List grouped by category ── */}
      {loading ? (
        <div className="flex flex-col gap-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-14 rounded-xl"
              style={{ background: "var(--color-bg-subtle)" }}
            />
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          No skills yet.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {Object.entries(grouped).map(([category, skillList]) => (
            <div key={category}>
              {/* Category label */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-base font-medium uppercase tracking-wide"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {category}
                </span>
                <div
                  className="h-px flex-1"
                  style={{ background: "var(--color-border)" }}
                />
              </div>

              <div className="flex flex-col gap-4">
                {skillList.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between rounded-md border px-5 py-3"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "var(--color-bg-subtle)",
                    }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => handleEdit(item)}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg"
                        style={{
                          color: "var(--color-primary)",
                          background: "var(--color-primary)15",
                        }}
                      >
                        <Pencil size={14} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(item._id)}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg"
                        style={{
                          color: "var(--color-red-5)",
                          background: "var(--color-red-5)15",
                        }}
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSkills;
