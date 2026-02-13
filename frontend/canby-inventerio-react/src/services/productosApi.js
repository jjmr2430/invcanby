// Servicio para consumir la API del backend (Spring Boot)
// Estándar: nombres en camelCase, funciones pequeñas y claras.

const API_URL = import.meta.env.VITE_API_URL;
const BASE = `${API_URL}/productos`;

/**
 * Obtiene el listado de productos.
 */
export async function listarProductos() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Error listando productos");
  return res.json();
}

/**
 * Crea un producto nuevo.
 * @param {object} producto
 */
export async function crearProducto(producto) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error creando producto");
  return res.json();
}

/**
 * Actualiza un producto existente por id.
 */
export async function actualizarProducto(id, producto) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error actualizando producto");
  return res.json();
}

/**
 * Elimina un producto por id.
 */
export async function eliminarProducto(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error eliminando producto");
  return true;
}

console.log("API_URL:", import.meta.env.VITE_API_URL);