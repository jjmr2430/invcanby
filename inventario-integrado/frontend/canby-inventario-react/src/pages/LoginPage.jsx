import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, login } from "../services/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  //Si ya hay sesión pasa a productos devuelta
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/productos", { replace: true });
    }
  }, [navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.username.trim()) return alert("El usuario es obligatorio");
    if (!form.password.trim()) return alert("La contraseña es obligatoria");

    try {
      setLoading(true);
      await login(form.username, form.password);
      // replace para que “atrás” no vuelva a login inmediatamente
      navigate("/productos", { replace: true });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.jpg" alt="Canby" style={styles.logo} />
        <h1 style={styles.title}>Sistema de Inventario</h1>
        <p style={styles.subtitle}>Iniciar sesión</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Usuario
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ej: admin"
            />
          </label>

          <label style={styles.label}>
            Contraseña
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="••••••••"
            />
          </label>

          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p style={styles.note}>
          
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#F5F5F5",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 16,
    padding: 18,
  },
  logo: { width: 110, height: "auto", display: "block", margin: "0 auto 10px" },
  title: { textAlign: "center", margin: 0, color: "#0D47A1" },
  subtitle: { textAlign: "center", marginTop: 6, marginBottom: 14, color: "#555" },
  form: { display: "grid", gap: 10 },
  label: { display: "grid", gap: 6, fontWeight: 600 },
  input: { padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" },
  btn: {
    marginTop: 6,
    padding: "10px 14px",
    border: "none",
    borderRadius: 10,
    background: "#0D47A1",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
  note: { marginTop: 12, fontSize: 12, color: "#666", textAlign: "center" },
};

