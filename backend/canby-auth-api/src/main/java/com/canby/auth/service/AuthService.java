package com.canby.auth.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.canby.auth.model.AppUser;
import com.canby.auth.repository.AppUserRepository;

@Service
public class AuthService {

    private final AppUserRepository userRepository;

    // BCrypt encripta contraseñas de forma segura
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthService(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Registra un usuario si no existe.
     */
    public void register(String username, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("USER_EXISTS");
        }

        String hash = encoder.encode(password);
        userRepository.save(new AppUser(username, hash));
    }

    /**
     * Valida login comparando password con el hash guardado.
     */
    public boolean login(String username, String password) {
        return userRepository.findByUsername(username)
                .map(u -> encoder.matches(password, u.getPasswordHash()))
                .orElse(false);
    }
}
