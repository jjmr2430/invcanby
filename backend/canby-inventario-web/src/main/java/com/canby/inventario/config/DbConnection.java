package com.canby.inventario.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbConnection {

    private static final String URL = "jdbc:mysql://localhost:3307/canby?useSSL=false&serverTimezone=UTC";
    private static final String USER = "canby_app";
    private static final String PASS = "TU_PASSWORD";

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); //forz dri
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("No se encontró el driver MySQL en el classpath", e);
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASS);
    }
}