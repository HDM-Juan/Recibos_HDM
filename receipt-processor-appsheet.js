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

function setElementHTML(id, html) {
    var element = document.getElementById(id);
    if (element) {
        element.innerHTML = html || '';
    }
}

function procesarSelect(contenido) {
    var regex = /<<Start: SELECT\((.*?)\) >>([\s\S]*?)<< end >>/g;
    var resultado = '';
    var match;

    while ((match = regex.exec(contenido)) !== null) {
        var selectContent = match[2];
        // Reemplazar los marcadores de posición con los valores reales
        selectContent = selectContent.replace(/<<\[(.*?)\]>>/g, function(match, p1) {
            return '${' + p1 + '}';
        });
        resultado += selectContent;
    }

    return resultado;
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

    // Procesar DETALLE_VENTAS
    var detalleVentasTemplate = procesarSelect(datosObj.DETALLE_VENTAS);
    console.log("Plantilla de Detalle Ventas:", detalleVentasTemplate);
    var detalleVentasHTML = eval('`' + detalleVentasTemplate + '`');
    setElementHTML('detalleVentasBody', detalleVentasHTML);

    // Procesar PAGOS
    var pagosTemplate = procesarSelect(datosObj.PAGOS);
    console.log("Plantilla de Pagos:", pagosTemplate);
    var pagosHTML = eval('`' + pagosTemplate + '`');
    setElementHTML('pagosBody', pagosHTML);
window.addEventListener('load', function() {
    if (window.translate_en) {
        window.translate_en = function() { console.log('Función de traducción neutralizada'); };
    }
    var elements = document.querySelectorAll('*');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var oldAddEventListener = element.addEventListener;
        element.addEventListener = function(type, listener, useCapture) {
            if (type !== 'click') {  // Permitir eventos de clic
                console.log('Intento de añadir evento ' + type + ' bloqueado');
                return;
            }
            oldAddEventListener.call(this, type, listener, useCapture);
        };
    }
});
