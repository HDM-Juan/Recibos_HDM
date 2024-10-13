function getUrlParameter(name) {
  // ... (función para obtener parámetros de la URL) ...
}

function updateInvoice() {
  document.getElementById("NOMBRE_EMPRESA").textContent = getUrlParameter("nombre_empresa");
  document.getElementById("DIRECCION").textContent = getUrlParameter("direccion");
  // ... (obtener otros parámetros y mostrarlos en el HTML) ...
}

document.addEventListener('DOMContentLoaded', updateInvoice);
