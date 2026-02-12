package com.canby.inventario.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

/* Entidad Producto: representa un producto de aseo dentro del sistema de inventario. Contiene información clave como nombre, categoría, unidad de medida, stock actual y stock mínimo. Esta clase se mapea a una tabla en la base de datos para facilitar su gestión a través de JPA/Hibernate.
 */
@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* Nombre comercial del producto (ej: Jabón Lava Loza) */
    @Column(nullable = false, length = 120)
    private String nombre;

    @Column(nullable = false, length = 60)
    private String categoria;

    @Column(nullable = false, length = 30)
    private String unidad; /*Litros, ml, unidades, etc. */ 

    @Column(nullable = false)
    private BigDecimal stock;

    @Column(name = "stock_minimo", nullable = false)
    private BigDecimal stockMinimo;

    @Column(nullable = false)
    private Boolean activo = true;

    /* Getters y setters para cada campo */
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getUnidad() { return unidad; }
    public void setUnidad(String unidad) { this.unidad = unidad; }

    public BigDecimal getStock() { return stock; }
    public void setStock(BigDecimal stock) { this.stock = stock; }

    public BigDecimal getStockMinimo() { return stockMinimo; }
    public void setStockMinimo(BigDecimal stockMinimo) { this.stockMinimo = stockMinimo; }

    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
}

