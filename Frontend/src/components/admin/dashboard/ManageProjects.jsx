import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import useFetch from "../../../hooks/useFetch";

const EMPTY_FORM = {
  title: "",
  description: "",
  techStack: "",
  githubLink: "",
  liveLink: "",
  order: "",
};

const ManageProjects = () => {
  const { data: projects, loading } = useFetch(
    "http://127.0.0.1:5000/api/projects",
  );
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const data = items ?? projects ?? [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError("");
  };

  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (!form.description.trim()) return "Description is required";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) return setFormError(err);

    setSubmitting(true);
    try {
      const url = editId
        ? `http://127.0.0.1:5000/api/projects/${editId}`
        : "http://127.0.0.1:5000/api/projects";

      // description stored as array, techStack as array
      const descriptionArray = form.description
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const techStackArray = form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: form.title,
          description: descriptionArray,
          techStack: techStackArray,
          githubLink: form.githubLink,
          liveLink: form.liveLink,
          order: Number(form.order) || 0,
        }),
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
    setForm({
      title: item.title,
      description: Array.isArray(item.description)
        ? item.description.join("\n")
        : item.description,
      techStack: Array.isArray(item.techStack)
        ? item.techStack.join(", ")
        : item.techStack,
      githubLink: item.githubLink || "",
      liveLink: item.liveLink || "",
      order: item.order || "",
    });
    setEditId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await fetch(`http://127.0.0.1:5000/api/projects/${id}`, {
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

  return (
    <div className="max-w-3xl">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Projects
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Manage your projects
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
          Add Project
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
              {editId ? "Edit Project" : "New Project"}
            </h3>

            {/* Title */}
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Project title"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-bg)",
                color: "var(--color-text-primary)",
              }}
            />

            {/* Description — one bullet per line */}
            <div className="flex flex-col gap-1">
              <label
                className="text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Description — one bullet point per line
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder={
                  "Built a full-stack app...\nImplemented JWT auth...\nDeployed on Vercel..."
                }
                rows={5}
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none resize-y"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-bg)",
                  color: "var(--color-text-primary)",
                }}
              />
            </div>

            {/* Tech stack */}
            <div className="flex flex-col gap-1">
              <label
                className="text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Tech stack — comma separated
              </label>
              <input
                name="techStack"
                value={form.techStack}
                onChange={handleChange}
                placeholder="ReactJS, Node.js, MongoDB"
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-bg)",
                  color: "var(--color-text-primary)",
                }}
              />
            </div>

            {/* Links */}
            <input
              name="githubLink"
              value={form.githubLink}
              onChange={handleChange}
              placeholder="GitHub URL (optional)"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-bg)",
                color: "var(--color-text-primary)",
              }}
            />
            <input
              name="liveLink"
              value={form.liveLink}
              onChange={handleChange}
              placeholder="Live demo URL (optional)"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-bg)",
                color: "var(--color-text-primary)",
              }}
            />
            <input
              name="order"
              value={form.order}
              onChange={handleChange}
              placeholder="Display order (1, 2...)"
              type="number"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
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

      {/* ── List ── */}
      {loading ? (
        <div className="flex flex-col gap-4 animate-pulse">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-20 rounded-xl"
              style={{ background: "var(--color-bg-subtle)" }}
            />
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          No projects yet.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {data.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start justify-between rounded-md border px-5 py-4 gap-4"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-bg-subtle)",
              }}
            >
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <span
                  className="font-semibold truncate"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {item.title}
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(item.techStack || []).slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2 py-1 rounded-sm"
                      style={{
                        color: "var(--color-blue-9)",
                        background: "var(--color-blue-1)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {item.techStack?.length > 4 && (
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-sm"
                      style={{
                        color: "var(--color-text-primary)",
                        background: "var(--color-border-strong)",
                      }}
                    >
                      +{item.techStack.length - 4} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
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
      )}
    </div>
  );
};

export default ManageProjects;
