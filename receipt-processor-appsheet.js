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
        console.log(`Set text for ${id}:`, text);
    } else {
        console.warn(`Element with id ${id} not found`);
    }
}

function setElementSrc(id, src) {
    var element = document.getElementById(id);
    if (element) {
        element.src = src || '';
        console.log(`Set src for ${id}:`, src);
    } else {
        console.warn(`Element with id ${id} not found`);
    }
}

function setElementHTML(id, html) {
    var element = document.getElementById(id);
    if (element) {
        element.innerHTML = html || '';
        console.log(`Set HTML for ${id}:`, html);
    } else {
        console.warn(`Element with id ${id} not found`);
    }
}

function procesarSelect(contenido) {
    console.log("Procesando SELECT:", contenido);
    var regex = /<<Start: SELECT\((.*?)\) >>([\s\S]*?)<< end >>/;
    var match = regex.exec(contenido);
    
    if (match) {
        var template = match[2].trim();
        console.log("Template encontrado:", template);
        // Replace placeholders with empty strings for now
        var result = template.replace(/<<\[(.*?)\]>>/g, "");
        console.log("Resultado procesado:", result);
        return result;
    }
    console.log("No se encontró un patrón SELECT válido");
    return '';
}

window.onload = function() {
    var datosRaw = getUrlParameter('datos');
    console.log("Datos crudos recibidos:", datosRaw);

    var datos = datosRaw.split('<<>>');
    console.log("Datos separados:", datos);

    var datosObj = {};
    for (var i = 0; i < datos.length; i += 2) {
        var key = datos[i].replace(/^<<|>>$/g, '');
        var value = datos[i + 1];
        datosObj[key] = value;
        console.log(key + ": " + value);
    }

    setElementText('nombreEmpresa', datosObj.NOMBRE_EMPRESA);
    setElementText('direccion', datosObj.DIRECCION);
    setElementText('email', datosObj.EMAIL);
    setElementText('telefono', datosObj.TELEFONO);
    setElementText('sitioWeb', datosObj.SITIO_WEB);
    setElementText('whatsapp', datosObj.WHATSAPP);
    setElementSrc('logoUrl', datosObj.LOGO_URL);
    setElementSrc('publicidadUrl', datosObj.PUBLICIDAD_URL);
    setElementText('folioVenta', datosObj.FOLIO_VENTA);
    setElementText('fechaVenta', datosObj.FECHA_VENTA);
    setElementText('folioRecepcion', datosObj.FOLIO_RECEPCION);
    setElementText('imei', datosObj.IMEI);
    setElementText('noSerie', datosObj.NO_SERIE);
    setElementText('totalVenta', datosObj.TOTAL_VENTA);
    setElementText('totalPagos', datosObj.TOTAL_PAGOS);
    setElementText('textoGarantia', datosObj.TEXTO_GARANTIA);
    setElementText('observaciones', datosObj.OBSERVACIONES);
    setElementSrc('redesSocialesUrl', datosObj.REDES_SOCIALES_URL);

    // Process DETALLE_VENTAS
    console.log("Contenido de DETALLE_VENTAS:", datosObj.DETALLE_VENTAS);
    var detalleVentasHTML = procesarSelect(datosObj.DETALLE_VENTAS);
    console.log("HTML de Detalle Ventas procesado:", detalleVentasHTML);
    if (detalleVentasHTML) {
        setElementHTML('detalleVentasBody', detalleVentasHTML);
    } else {
        setElementHTML('detalleVentasBody', '<tr><td colspan="2">No hay detalles de venta disponibles</td></tr>');
    }

    // Process PAGOS
    console.log("Contenido de PAGOS:", datosObj.PAGOS);
    var pagosHTML = procesarSelect(datosObj.PAGOS);
    console.log("HTML de Pagos procesado:", pagosHTML);
    if (pagosHTML) {
        setElementHTML('pagosBody', pagosHTML);
    } else {
        setElementHTML('pagosBody', '<tr><td colspan="2">No hay información de pagos disponible</td></tr>');
    }
};
