package com.canby.inventario.controller;

import com.canby.inventario.model.Producto;
import com.canby.inventario.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.canby.inventario.dto.ProductoRequest;
import jakarta.validation.Valid;

import java.util.List;

/** contoller REST para gestionar productos permite listar, crear, actualizar y eliminar productos */
@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Producto> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getById(@PathVariable Long id) {
    return service.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

    @PostMapping
public Producto crear(@Valid @RequestBody ProductoRequest req) {
    Producto p = new Producto();
    p.setNombre(req.getNombre());
    p.setCategoria(req.getCategoria());
    p.setUnidad(req.getUnidad());
    p.setStock(java.math.BigDecimal.valueOf(req.getStock()));
    p.setStockMinimo(java.math.BigDecimal.valueOf(req.getStockMinimo()));
    p.setActivo(req.getActivo());
    return service.crear(p);
}

@PutMapping("/{id}")
public Producto actualizar(@PathVariable Long id, @Valid @RequestBody ProductoRequest req) {
    Producto cambios = new Producto();
    cambios.setNombre(req.getNombre());
    cambios.setCategoria(req.getCategoria());
    cambios.setUnidad(req.getUnidad());
    cambios.setStock(java.math.BigDecimal.valueOf(req.getStock()));
    cambios.setStockMinimo(java.math.BigDecimal.valueOf(req.getStockMinimo()));
    cambios.setActivo(req.getActivo());
    return service.actualizar(id, cambios);
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
