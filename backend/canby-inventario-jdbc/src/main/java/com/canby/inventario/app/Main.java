package com.canby.inventario.app;

import com.canby.inventario.dao.ProductoDao;
import com.canby.inventario.model.Producto;

import java.sql.SQLException;

public class Main {

    public static void main(String[] args) {
        ProductoDao dao = new ProductoDao();

        try {
            // INSERTAR
            Producto p = new Producto("Jabón Lava Loza", "Aseo", "L", 20, 5, true);
            int id = dao.insertar(p);
            System.out.println("Insertado ID: " + id);

            // LISTAR
            System.out.println("Listado:");
            dao.listar().forEach(x ->
                    System.out.println(x.getId() + " - " + x.getNombre() + " - Stock: " + x.getStock())
            );

            // ACTUALIZAR
            Producto encontrado = dao.buscarPorId(id);
            if (encontrado != null) {
                encontrado.setStock(35);
                encontrado.setStockMinimo(10);
                boolean ok = dao.actualizar(encontrado);
                System.out.println("Actualizado: " + ok);
            }

            // ELIMINAR
            boolean del = dao.eliminar(id);
            System.out.println("Eliminado: " + del);

        } catch (SQLException e) {
            System.out.println("Error SQL: " + e.getMessage());
        }
    }
}
