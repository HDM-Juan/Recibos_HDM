function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function setElementText(id, text) {
    var element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function setElementSrc(id, src) {
    var element = document.getElementById(id);
    if (element) {
        element.src = src;
    }
}

window.onload = function() {
    var datos = getUrlParameter('datos').split('<<>>');
    var datosObj = {};

    for (var i = 0; i < datos.length; i += 2) {
        datosObj[datos[i].replace(/^<<|>>$/g, '')] = datos[i + 1];
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
    var detalleVentas = JSON.parse(datosObj.DETALLE_VENTAS);
    var tbodyDetalleVentas = document.querySelector('#detalleVentas tbody');
    detalleVentas.forEach(function(detalle) {
        var row = tbodyDetalleVentas.insertRow();
        row.insertCell(0).textContent = detalle.concepto;
        row.insertCell(1).textContent = detalle.precio;
    });

    // Procesar PAGOS
    var pagos = JSON.parse(datosObj.PAGOS);
    var tbodyPagos = document.querySelector('#pagos tbody');
    pagos.forEach(function(pago) {
        var row = tbodyPagos.insertRow();
        row.insertCell(0).textContent = pago.cantidad;
        row.insertCell(1).textContent = pago.formaPago;
    });
};
