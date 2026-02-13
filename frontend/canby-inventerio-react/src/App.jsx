import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductosPage from "./pages/ProductosPage";

// App: define rutas principales.
// Por ahora solo el módulo Productos para la evidencia.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="*" element={<Navigate to="/productos" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
