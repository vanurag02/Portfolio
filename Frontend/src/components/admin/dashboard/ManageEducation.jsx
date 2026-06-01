import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import useFetch from "../../../hooks/useFetch";

const EMPTY_FORM = { degree: "", institution: "", year: "", order: "" };

const ManageEducation = () => {
  const {
    data: education,
    loading,
    error,
  } = useFetch("http://127.0.0.1:5000/api/education");
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const data = items ?? education ?? [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError("");
  };

  const validate = () => {
    if (!form.degree.trim()) return "Degree is required";
    if (!form.institution.trim()) return "Institution is required";
    if (!form.year.trim()) return "Year is required";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) return setFormError(err);

    setSubmitting(true);
    try {
      const url = editId
        ? `http://127.0.0.1:5000/api/education/${editId}`
        : "http://127.0.0.1:5000/api/education";

      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
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
      degree: item.degree,
      institution: item.institution,
      year: item.year,
      order: item.order,
    });
    setEditId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    try {
      await fetch(`http://127.0.0.1:5000/api/education/${id}`, {
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
            Education
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Manage your education timeline
          </p>
        </div>
        <motion.button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: "var(--color-primary)", color: "#ffffff" }}
        >
          <Plus size={16} />
          Add Entry
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
            className="rounded-xl border p-6 mb-6 flex flex-col gap-4"
            style={{
              borderColor: "var(--color-primary)",
              background: "var(--color-bg-subtle)",
            }}
          >
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {editId ? "Edit Entry" : "New Entry"}
            </h3>

            {[
              { name: "degree", placeholder: "Degree / Qualification" },
              { name: "institution", placeholder: "Institution name" },
              { name: "year", placeholder: "e.g. 2020 — 2023" },
              { name: "order", placeholder: "Display order (1, 2...)" },
            ].map(({ name, placeholder }) => (
              <input
                key={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-bg)",
                  color: "var(--color-text-primary)",
                }}
              />
            ))}

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
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: "var(--color-primary)", color: "#ffffff" }}
              >
                <Check size={14} />
                {submitting ? "Saving..." : "Save"}
              </motion.button>
              <motion.button
                onClick={resetForm}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
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
        <div className="flex flex-col gap-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl"
              style={{ background: "var(--color-bg-subtle)" }}
            />
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          No education entries yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {data.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center justify-between rounded-xl border px-5 py-4"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-bg-subtle)",
              }}
            >
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {item.degree}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {item.institution} · {item.year}
                </span>
              </div>
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
      )}
    </div>
  );
};

export default ManageEducation;
