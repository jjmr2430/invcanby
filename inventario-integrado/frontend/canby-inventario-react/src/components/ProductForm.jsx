import { useState } from "react";

// Formulario reutilizable para crear o editar productos.
// Si recibe "initialData", se comporta como edición.

const defaultForm = {
  nombre: "",
  categoria: "",
  unidad: "L",
  stock: 0,
  stockMinimo: 0,
  activo: true,
};

export default function ProductForm({ initialData, onSave, onCancel }) {
  // Estado inicial: si viene initialData, lo usamos; si no, usamos defaultForm
  const [form, setForm] = useState(() =>
    initialData ? { ...defaultForm, ...initialData } : defaultForm
  );

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // Convertimos números a Number para evitar enviar strings al backend
    if (type === "number") {
      setForm((prev) => ({ ...prev, [name]: Number(value) }));
      return;
    }

    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validaciones simples (puedes ampliar)
    if (!form.nombre.trim()) return alert("El nombre es obligatorio");
    if (!form.categoria.trim()) return alert("La categoría es obligatoria");
    if (form.stock < 0 || form.stockMinimo < 0) return alert("Stock no puede ser negativo");

    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={{ marginTop: 0 }}>{initialData ? "Editar producto" : "Nuevo producto"}</h3>

      <label style={styles.label}>
        Nombre
        <input name="nombre" value={form.nombre} onChange={handleChange} style={styles.input} />
      </label>

      <label style={styles.label}>
        Categoría
        <input name="categoria" value={form.categoria} onChange={handleChange} style={styles.input} />
      </label>

      <label style={styles.label}>
        Unidad
        <select name="unidad" value={form.unidad} onChange={handleChange} style={styles.input}>
          <option value="L">L</option>
          <option value="ml">ml</option>
          <option value="unidades">unidades</option>
        </select>
      </label>

      <label style={styles.label}>
        Stock
        <input type="number" name="stock" value={form.stock} onChange={handleChange} style={styles.input} />
      </label>

      <label style={styles.label}>
        Stock mínimo
        <input
          type="number"
          name="stockMinimo"
          value={form.stockMinimo}
          onChange={handleChange}
          style={styles.input}
        />
      </label>

      <label style={{ ...styles.label, flexDirection: "row", gap: 10, alignItems: "center" }}>
        <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} />
        Activo
      </label>

      <div style={styles.actions}>
        <button type="submit" style={styles.primary}>
          Guardar
        </button>
        <button type="button" onClick={onCancel} style={styles.secondary}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 12,
    padding: 16,
    display: "grid",
    gap: 10,
  },
  label: { display: "flex", flexDirection: "column", gap: 6, fontWeight: 600 },
  input: { padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" },
  actions: { display: "flex", gap: 10, marginTop: 10 },
  primary: { background: "#0D47A1", color: "white", border: "none", padding: "10px 14px", borderRadius: 10 },
  secondary: { background: "#FFC107", color: "#111", border: "none", padding: "10px 14px", borderRadius: 10 },
};
