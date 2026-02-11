<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Productos</title>
</head>
<body>
  <h1>Listado de productos</h1>

  <p><a href="<%= request.getContextPath() %>/productos/nuevo.jsp">+ Nuevo producto</a></p>

  <table border="1" cellpadding="6">
    <thead>
      <tr>
        <th>ID</th><th>Nombre</th><th>Categoría</th><th>Unidad</th><th>Stock</th><th>Mínimo</th><th>Activo</th>
      </tr>
    </thead>
    <tbody>
      <c:forEach var="p" items="${productos}">
        <tr>
          <td>${p.id}</td>
          <td>${p.nombre}</td>
          <td>${p.categoria}</td>
          <td>${p.unidad}</td>
          <td>${p.stock}</td>
          <td>${p.stockMinimo}</td>
          <td>
            <c:choose>
              <c:when test="${p.activo}">Activo</c:when>
              <c:otherwise>Inactivo</c:otherwise>
            </c:choose></td>
        </tr>
      </c:forEach>
    </tbody>
  </table>
</body>
</html>
