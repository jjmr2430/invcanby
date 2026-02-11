package com.canby.inventario.web.productos;

import com.canby.inventario.dao.ProductoDao;
import com.canby.inventario.model.Producto;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;

@WebServlet("/productos")
public class ProductoServlet extends HttpServlet {

    private final ProductoDao dao = new ProductoDao();

    // GET: listar prod y mostrar JSP
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            req.setAttribute("productos", dao.listar());
            req.getRequestDispatcher("/productos/lista.jsp").forward(req, resp);
        } catch (Exception e) {
            throw new ServletException("Error listando productos", e);
        }
    }

    // POST: ins prod
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            String nombre = req.getParameter("nombre");
            String categoria = req.getParameter("categoria");
            String unidad = req.getParameter("unidad");
            double stock = Double.parseDouble(req.getParameter("stock"));
            double stockMinimo = Double.parseDouble(req.getParameter("stockMinimo"));
            boolean activo = req.getParameter("activo") != null;

            dao.insertar(new Producto(nombre, categoria, unidad, stock, stockMinimo, activo));

            // Redirigir a GET despues de insertar
            resp.sendRedirect(req.getContextPath() + "/productos");

        } catch (Exception e) {
            throw new ServletException("Error insertando producto", e);
        }
    }
}
