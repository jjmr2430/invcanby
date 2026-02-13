// Componente de encabezado reutilizable para el sistema.
// Estándar: PascalCase para componentes.

export default function Header({ titulo, subtitulo }) {
  return (
    <header style={styles.header}>
      <div>
        <h1 style={styles.title}>{titulo}</h1>
        <p style={styles.subtitle}>{subtitulo}</p>
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
  title: { margin: 0, fontSize: 20, color: "#0D47A1" },
  subtitle: { margin: 0, color: "#555" },
};
