package com.canby.inventario.controller;

import com.canby.inventario.dto.MovimientoRequest;
import com.canby.inventario.model.Movimiento;
import com.canby.inventario.service.MovimientoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
@CrossOrigin(origins = "http://localhost:5173")
public class MovimientoController {

    private final MovimientoService service;

    public MovimientoController(MovimientoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody MovimientoRequest req) {
        try {
            Movimiento mov = service.registrar(req);
            return ResponseEntity.status(201).body(mov);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    java.util.Map.of("message", e.getMessage())
            );
        }
    }

    @GetMapping
    public List<Movimiento> listar() {
        return service.listar();
    }

    @GetMapping("/producto/{productoId}")
    public List<Movimiento> kardex(@PathVariable Long productoId) {
        return service.kardexPorProducto(productoId);
    }
}
