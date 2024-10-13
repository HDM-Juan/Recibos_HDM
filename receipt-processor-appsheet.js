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
  document.getElementById("SITIO_WEB").textContent   
 = sitioWeb;
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
}

document.addEventListener('DOMContentLoaded', updateInvoice);
