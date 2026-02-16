package com.canby.inventario.service;

import com.canby.inventario.dto.MovimientoRequest;
import com.canby.inventario.model.Movimiento;
import com.canby.inventario.model.Producto;
import com.canby.inventario.repository.MovimientoRepository;
import com.canby.inventario.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class MovimientoService {

    private final MovimientoRepository movimientoRepo;
    private final ProductoRepository productoRepo;

    public MovimientoService(MovimientoRepository movimientoRepo, ProductoRepository productoRepo) {
        this.movimientoRepo = movimientoRepo;
        this.productoRepo = productoRepo;
    }

    // Lista todos los movimientos
    public List<Movimiento> listar() {
        return movimientoRepo.findAll();
    }

    // Kardex por producto (historial)
    public List<Movimiento> kardexPorProducto(Long productoId) {
        return movimientoRepo.findByProductoIdOrderByFechaDesc(productoId);
    }

    // Registra un movimiento y actualiza stock del producto
    public Movimiento registrar(MovimientoRequest req) {

        // Validaciones
        if (req.productoId == null) throw new IllegalArgumentException("productoId es obligatorio");
        if (req.tipo == null || req.tipo.isBlank()) throw new IllegalArgumentException("tipo es obligatorio");
        if (req.cantidad == null || req.cantidad.compareTo(BigDecimal.ZERO) <= 0)
            throw new IllegalArgumentException("cantidad debe ser > 0");
        if (req.fecha == null) throw new IllegalArgumentException("fecha es obligatoria");
        if (req.motivo == null || req.motivo.isBlank()) throw new IllegalArgumentException("motivo es obligatorio");
        if (req.lote == null || req.lote.isBlank()) throw new IllegalArgumentException("lote es obligatorio");

        // Buscar producto
        Producto producto = productoRepo.findById(req.productoId)
                .orElseThrow(() -> new IllegalArgumentException("producto no existe"));

        BigDecimal stockActual = (producto.getStock() == null) ? BigDecimal.ZERO : producto.getStock();
        BigDecimal nuevoStock;

        String tipo = req.tipo.trim().toUpperCase();

        // Regla de negocio de stock
        switch (tipo) {
            case "ENTRADA" -> nuevoStock = stockActual.add(req.cantidad);

            case "SALIDA" -> {
                nuevoStock = stockActual.subtract(req.cantidad);
                if (nuevoStock.compareTo(BigDecimal.ZERO) < 0) {
                    throw new IllegalArgumentException("stock insuficiente para salida");
                }
            }

            case "AJUSTE" -> nuevoStock = req.cantidad; // deja el stock exacto

            default -> throw new IllegalArgumentException("tipo inválido (use ENTRADA, SALIDA o AJUSTE)");
        }

        // Guardar movimiento
        Movimiento mov = new Movimiento();
        mov.setProducto(producto);
        mov.setTipo(tipo);
        mov.setCantidad(req.cantidad);
        mov.setFecha(req.fecha);
        mov.setMotivo(req.motivo);
        mov.setDocumentoSoporte(req.documentoSoporte);
        mov.setLote(req.lote);

        Movimiento guardado = movimientoRepo.save(mov);

        // Actualizar stock del producto
        producto.setStock(nuevoStock);
        productoRepo.save(producto);

        return guardado;
    }
}
