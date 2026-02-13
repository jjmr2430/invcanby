export default function ProductTable({ productos, onEdit, onDelete }) {
  return (
    <div style={styles.wrap}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Unidad</th>
            <th>Stock</th>
            <th>Mínimo</th>
            <th>Estado</th>
            <th style={{ width: 160 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>{p.unidad}</td>
              <td>{p.stock}</td>
              <td>{p.stockMinimo}</td>
              <td>{p.activo ? "Activo" : "Pausado"}</td>
              <td>
                <button onClick={() => onEdit(p)} style={styles.btn}>
                  Editar
                </button>{" "}
                <button onClick={() => onDelete(p)} style={styles.btnDanger}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {productos.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: 12 }}>
                No hay productos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  wrap: { background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, overflow: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  btn: { padding: "6px 10px", borderRadius: 8, border: "1px solid #0D47A1", background: "white", cursor: "pointer" },
  btnDanger: {
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid #b00020",
    background: "white",
    cursor: "pointer",
  },
};
