package com.canby.inventario.dao;

import com.canby.inventario.config.DbConnection;
import com.canby.inventario.model.Producto;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductoDao {

    public int insertar(Producto producto) throws SQLException {
        String sql = "INSERT INTO producto (nombre, categoria, unidad, stock, stock_minimo, activo) VALUES (?,?,?,?,?,?)";

        try (Connection conn = DbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, producto.getNombre());
            stmt.setString(2, producto.getCategoria());
            stmt.setString(3, producto.getUnidad());
            stmt.setDouble(4, producto.getStock());
            stmt.setDouble(5, producto.getStockMinimo());
            stmt.setBoolean(6, producto.isActivo());

            stmt.executeUpdate();

            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) return rs.getInt(1);
            }
        }
        return 0;
    }

    public List<Producto> listar() throws SQLException {
        String sql = "SELECT id, nombre, categoria, unidad, stock, stock_minimo, activo FROM producto";
        List<Producto> productos = new ArrayList<>();

        try (Connection conn = DbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                productos.add(new Producto(
                        rs.getInt("id"),
                        rs.getString("nombre"),
                        rs.getString("categoria"),
                        rs.getString("unidad"),
                        rs.getDouble("stock"),
                        rs.getDouble("stock_minimo"),
                        rs.getBoolean("activo")
                ));
            }
        }
        return productos;
    }

    public Producto buscarPorId(int id) throws SQLException {
        String sql = "SELECT id, nombre, categoria, unidad, stock, stock_minimo, activo FROM producto WHERE id = ?";

        try (Connection conn = DbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Producto(
                            rs.getInt("id"),
                            rs.getString("nombre"),
                            rs.getString("categoria"),
                            rs.getString("unidad"),
                            rs.getDouble("stock"),
                            rs.getDouble("stock_minimo"),
                            rs.getBoolean("activo")
                    );
                }
            }
        }
        return null;
    }

    public boolean actualizar(Producto producto) throws SQLException {
        String sql = "UPDATE producto SET nombre=?, categoria=?, unidad=?, stock=?, stock_minimo=?, activo=? WHERE id=?";

        try (Connection conn = DbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, producto.getNombre());
            stmt.setString(2, producto.getCategoria());
            stmt.setString(3, producto.getUnidad());
            stmt.setDouble(4, producto.getStock());
            stmt.setDouble(5, producto.getStockMinimo());
            stmt.setBoolean(6, producto.isActivo());
            stmt.setInt(7, producto.getId());

            return stmt.executeUpdate() > 0;
        }
    }

    public boolean eliminar(int id) throws SQLException {
        String sql = "DELETE FROM producto WHERE id=?";

        try (Connection conn = DbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            return stmt.executeUpdate() > 0;
        }
    }
}

