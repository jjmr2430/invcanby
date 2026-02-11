<%@ page contentType="text/html; charset=UTF-8" %>
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Nuevo producto</title>
</head>
<body>
  <h1>Registrar producto</h1>

  <form method="post" action="<%= request.getContextPath() %>/productos">
    <label>Nombre: <input name="nombre" required></label><br><br>
    <label>Categoría: <input name="categoria" required></label><br><br>
    <label>Unidad: <input name="unidad" required placeholder="L, ml, und"></label><br><br>
    <label>Stock: <input name="stock" type="number" step="0.01" value="0" required></label><br><br>
    <label>Stock mínimo: <input name="stockMinimo" type="number" step="0.01" value="0" required></label><br><br>
    <label>Activo: <input type="checkbox" name="activo" checked></label><br><br>

    <button type="submit">Guardar</button>
  </form>

  <p><a href="<%= request.getContextPath() %>/productos">Volver a la lista</a></p>
</body>
</html>
