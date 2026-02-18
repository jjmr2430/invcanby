// Componente de encabezado reutilizable para el sistema.
// Estándar: PascalCase para componentes.

export default function Header({ titulo, subtitulo, onLogout }) {
  return (
    <header style={styles.header}>
      <div style={styles.row}>
        <div>
          <h1 style={styles.title}>{titulo}</h1>
          <p style={styles.subtitle}>{subtitulo}</p>
        </div>

        {onLogout && (
          <button type="button" onClick={onLogout} style={styles.logoutBtn}>
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: "#ffffff",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    padding: "14px 18px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: { margin: 0, fontSize: 20, color: "#0D47A1" },
  subtitle: { margin: 0, color: "#555" },
  logoutBtn: {
    background: "#FFC107",
    color: "#111",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};
