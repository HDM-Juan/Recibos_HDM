function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function updateInvoice() {
  // Obtener los datos de la URL
  var nombreEmpresa = getUrlParameter("nombre_empresa");
  var direccion = getUrlParameter("direccion");
  var email = getUrlParameter("email");
  var telefono = getUrlParameter("telefono");
  var sitioWeb = getUrlParameter("sitio_web");
  var whatsapp = getUrlParameter("whatsapp");
  var logoUrl = getUrlParameter("logo_url");
  var publicidadUrl = getUrlParameter("publicidad_url");
  var folioVenta = getUrlParameter("folio_venta");
  var fechaVenta = getUrlParameter("fecha_venta");
  var folioRecepcion = getUrlParameter("folio_recepcion");
  var imei = getUrlParameter("imei");
  var noSerie = getUrlParameter("no_serie");
  var totalVenta = getUrlParameter("total_venta");
  var textoGarantia = getUrlParameter("texto_garantia");
  var observaciones = getUrlParameter("observaciones");
  var redesSocialesUrl = getUrlParameter("redes_sociales_url");

  // Mostrar los datos en el HTML
  document.getElementById("NOMBRE_EMPRESA").textContent = nombreEmpresa;
  document.getElementById("DIRECCION").textContent = direccion;
  document.getElementById("EMAIL").textContent = email;
  document.getElementById("TELEFONO").textContent = telefono;
  document.getElementById("SITIO_WEB").textContent = sitioWeb;
  document.getElementById("WHATSAPP").textContent = whatsapp;
  document.getElementById("LOGO_URL").src = logoUrl;
  document.getElementById("PUBLICIDAD_URL").src = publicidadUrl;
  document.getElementById("FOLIO_VENTA").textContent = folioVenta;
  document.getElementById("FECHA_VENTA").textContent = fechaVenta;
  document.getElementById("FOLIO_RECEPCION").textContent = folioRecepcion;
  document.getElementById("IMEI").textContent = imei;
  document.getElementById("NO_SERIE").textContent = noSerie;
  document.getElementById("TOTAL_VENTA").textContent = totalVenta;
  document.getElementById("TEXTO_GARANTIA").textContent = textoGarantia;
  document.getElementById("OBSERVACIONES").textContent = observaciones;
  document.getElementById("REDES_SOCIALES_URL").src = redesSocialesUrl;

  // Obtener los datos de las tablas hijas de la URL (si están presentes)
  var detalleVentas = getUrlParameter("detalle_ventas");
  var pagos = getUrlParameter("pagos");

  // Si hay datos de las tablas hijas, generar las filas de las tablas
  if (detalleVentas) {
    generarFilasTabla("detalleVentasTable", detalleVentas);
  }
  if (pagos) {
    generarFilasTabla("pagosTable", pagos);
  }
}

function generarFilasTabla(tablaId, datos) {
  var tabla = document.getElementById(tablaId);
  var tbody = tabla.querySelector("tbody");
  tbody.innerHTML = ""; // Limpiar las filas existentes

  // Dividir los datos en filas (asumiendo que están separados por algún carácter, por ejemplo, ',')
  var filas = datos.split(",");
  filas.forEach(function(fila) {
    var celdas = fila.split("|"); // Dividir la fila en celdas (asumiendo que están separadas por '|')
    var nuevaFila = tabla.insertRow();
    celdas.forEach(function(celda) {
      var nuevaCelda = nuevaFila.insertCell();
      nuevaCelda.textContent = celda;
    });
  });
}

document.addEventListener('DOMContentLoaded', updateInvoice);
