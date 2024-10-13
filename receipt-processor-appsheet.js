function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function   
 updateInvoice() {
  // Obtener los datos de la URL
  var nombreEmpresa = getUrlParameter("nombre_empresa");
  var direccion = getUrlParameter("direccion");
  // ... (obtener otros parámetros) ...

  // Mostrar los datos en el HTML
  document.getElementById("NOMBRE_EMPRESA").textContent = nombreEmpresa;
  document.getElementById("DIRECCION").textContent = direccion;
  // ... (mostrar otros parámetros en el HTML) ...
}

document.addEventListener('DOMContentLoaded', updateInvoice);
