package com.canby.inventario.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class MovimientoRequest {
    public Long productoId;
    public String tipo; // ENTRADA, SALIDA, AJUSTE
    public BigDecimal cantidad;
    public LocalDate fecha;
    public String motivo;
    public String documentoSoporte; // solo es una opcion que se puede usar para registrar el numero de factura.
    public String lote; // obligatorio
}

