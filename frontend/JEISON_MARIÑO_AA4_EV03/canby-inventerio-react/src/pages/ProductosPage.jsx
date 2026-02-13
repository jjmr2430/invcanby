import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/productosApi";

// Página principal del módulo Productos.
// Aquí se maneja estado, carga, errores y acciones CRUD.

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productoEdit, setProductoEdit] = useState(null);

  async function cargar() {
    setLoading(true);
    try {
      const data = await listarProductos();
      setProductos(data);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  async function handleSave(form) {
    try {
      if (productoEdit?.id) {
        await actualizarProducto(productoEdit.id, form);
      } else {
        await crearProducto(form);
      }
      setProductoEdit(null);
      await cargar();
      alert("Guardado correctamente");
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleDelete(p) {
    const ok = confirm(`¿Eliminar "${p.nombre}"?`);
    if (!ok) return;

    try {
      await eliminarProducto(p.id);
      await cargar();
      alert("Eliminado correctamente");
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh" }}>
      <Header titulo="Sistema de Inventario - Canby" subtitulo="Módulo Productos (React)" />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: 16, display: "grid", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          <ProductForm
            key={productoEdit?.id ?? "new"}
            initialData={productoEdit}
            onSave={handleSave}
            onCancel={() => setProductoEdit(null)}
        />


          <section>
            <h3 style={{ margin: "0 0 10px 0" }}>Listado</h3>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <ProductTable productos={productos} onEdit={setProductoEdit} onDelete={handleDelete} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
