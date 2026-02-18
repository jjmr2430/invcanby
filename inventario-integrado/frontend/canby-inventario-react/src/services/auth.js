const API_BASE = "http://localhost:8081/api";

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // backend devuelve { message: "Error..." }
    throw new Error(data.message || "Error en la autenticación");
  }

  // guardamos “sesión” simple (para evidencia)
  localStorage.setItem("canby_auth", "ok");
  return data;
}

export function logout() {
  localStorage.removeItem("canby_auth");
}

export function isLoggedIn() {
  return localStorage.getItem("canby_auth") === "ok";
}
