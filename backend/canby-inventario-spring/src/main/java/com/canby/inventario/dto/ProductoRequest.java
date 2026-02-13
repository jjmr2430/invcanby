package com.canby.inventario.dto;

import jakarta.validation.constraints.*;

public class ProductoRequest {

  @NotBlank(message = "El nombre es obligatorio")
  @Size(max = 100, message = "El nombre no puede superar 100 caracteres")
  private String nombre;

  @NotBlank(message = "La categoría es obligatoria")
  @Size(max = 50, message = "La categoría no puede superar 50 caracteres")
  private String categoria;

  @NotBlank(message = "La unidad es obligatoria")
  @Size(max = 20, message = "La unidad no puede superar 20 caracteres")
  private String unidad;

  @PositiveOrZero(message = "El stock no puede ser negativo")
  private double stock;

  @PositiveOrZero(message = "El stock mínimo no puede ser negativo")
  private double stockMinimo;

  private Boolean activo = true;

  // Getters y setters
  public String getNombre() { return nombre; }
  public void setNombre(String nombre) { this.nombre = nombre; }

  public String getCategoria() { return categoria; }
  public void setCategoria(String categoria) { this.categoria = categoria; }

  public String getUnidad() { return unidad; }
  public void setUnidad(String unidad) { this.unidad = unidad; }

  public double getStock() { return stock; }
  public void setStock(double stock) { this.stock = stock; }

  public double getStockMinimo() { return stockMinimo; }
  public void setStockMinimo(double stockMinimo) { this.stockMinimo = stockMinimo; }

  public Boolean getActivo() { return activo; }
  public void setActivo(Boolean activo) { this.activo = activo; }
}
