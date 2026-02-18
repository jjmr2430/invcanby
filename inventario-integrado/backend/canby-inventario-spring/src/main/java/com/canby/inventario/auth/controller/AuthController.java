package com.canby.inventario.auth.controller;

import com.canby.inventario.auth.dto.AuthRequest;
import com.canby.inventario.auth.dto.MessageResponse;
import com.canby.inventario.auth.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Controlador REST para registro y login
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // opcional (si pruebas desde React)
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Registro
    @PostMapping("/register")
    public ResponseEntity<MessageResponse> register(@Valid @RequestBody AuthRequest req) {
        try {
            authService.register(req.getUsername(), req.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new MessageResponse("Usuario registrado correctamente"));
        } catch (IllegalArgumentException e) {
            if ("USER_EXISTS".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new MessageResponse("El usuario ya existe"));
            }
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Datos inválidos"));
        }
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<MessageResponse> login(@Valid @RequestBody AuthRequest req) {
        boolean ok = authService.login(req.getUsername(), req.getPassword());

        if (ok) {
            return ResponseEntity.ok(new MessageResponse("Autenticación satisfactoria"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new MessageResponse("Error en la autenticación"));
    }
}
