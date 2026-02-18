package com.canby.inventario.service;

import com.canby.inventario.model.Producto;
import com.canby.inventario.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/*Servicio de productos: aquí se concentra la lógica del módulo.*/
@Service
public class ProductoService {

    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    public List<Producto> listar() {
        return repo.findAll();
    }

    public Optional<Producto> buscarPorId(Long id) {
        return repo.findById(id);
    }

    public Producto crear(Producto producto) {
        /*  Regla simple: si no envían activo, se asume true*/
        if (producto.getActivo() == null) producto.setActivo(true);
        return repo.save(producto);
    }

    public Producto actualizar(Long id, Producto cambios) {
        Producto actual = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no existe: " + id));

        actual.setNombre(cambios.getNombre());
        actual.setCategoria(cambios.getCategoria());
        actual.setUnidad(cambios.getUnidad());
        actual.setStock(cambios.getStock());
        actual.setStockMinimo(cambios.getStockMinimo());
        actual.setActivo(cambios.getActivo());

        return repo.save(actual);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
