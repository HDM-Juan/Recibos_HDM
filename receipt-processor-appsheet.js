function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function setElementText(id, text) {
  var element = document.getElementById(id);
  if (element) {
    element.textContent = text || '';
  }
}

function setElementSrc(id, src) {
  var element = document.getElementById(id);
  if (element) {
    element.src = src || '';
  }
}

function generarTablaHTML(datos, columnas) {
  // Usamos un array para construir el HTML y luego lo unimos, 
  // esto es más eficiente que concatenar cadenas en cada iteración.
  var html = ['<table><thead><tr>'];
  columnas.forEach(function(columna) {
    html.push('<th>' + columna + '</th>');
  });
  html.push('</tr></thead><tbody>');
  datos.forEach(function(fila) {
    html.push('<tr>');
    columnas.forEach(function(columna) {
      // Accedemos a las propiedades del objeto 'fila' usando la notación de corchetes
      // para que funcione con nombres de columna que tengan espacios.
      html.push('<td>' + fila[columna] + '</td>'); 
    });
    html.push('</tr>');
  });
  html.push('</tbody></table>');
  return html.join(''); // Unimos el array en una sola cadena
}

window.onload = function() {
  var datosRaw = getUrlParameter('datos');
  console.log("Datos crudos recibidos:", datosRaw);

  try {
    var datos = JSON.parse(datosRaw);
    console.log("Datos JSON:", datos);

    // Iteramos sobre las propiedades del objeto JSON
    for (var key in datos) {
      if (datos.hasOwnProperty(key)) { 
        if (key.endsWith('_URL')) { // Si la clave termina en "_URL", establecemos el atributo src
          setElementSrc(key, datos[key]);
        } else if (key === 'DETALLE_VENTAS') {
          var detalleVentasHTML = generarTablaHTML(datos[key], ['Concepto', 'Precio Unitario']);
          setElementHTML('detalleVentasBody', detalleVentasHTML);
        } else if (key === 'PAGOS') {
          var pagosHTML = generarTablaHTML(datos[key], ['Cantidad', 'Forma de Pago']);
          setElementHTML('pagosBody', pagosHTML);
        } else { // En otro caso, establecemos el contenido de texto
          setElementText(key, datos[key]);
        }
      }
    }
  } catch (error) {
    console.error("Error al procesar los datos JSON:", error);
  }
};
