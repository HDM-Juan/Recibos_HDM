// Función para obtener los parámetros de la URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const queryParams = {};
    for (const [key, value] of params.entries()) {
        queryParams[key] = decodeURIComponent(value);
    }
    return queryParams;
}

// Función para actualizar el recibo con los datos obtenidos de la URL
function updateRecibo() {
    const params = getQueryParams();

    // Sucursal
    document.getElementById("sucursalNombre").textContent = params.sucursalNombre;
    document.getElementById("sucursalDireccion").textContent = params.sucursalDireccion;
    document.getElementById("sucursalEmail").textContent = params.sucursalEmail;
    document.getElementById("sucursalTel").textContent = params.sucursalTel;
    document.getElementById("sucursalWhatsapp").textContent = params.sucursalWhatsapp;
    document.getElementById("sucursalLogo").src = params.sucursalLogo;

    // Promoción
    document.getElementById("promoBanner").src = params.promoURL;

    // Venta
    document.getElementById("folioVenta").textContent = params.folioVenta;
    document.getElementById("fechaVenta").textContent = params.fechaVenta;
    document.getElementById("totalVenta").textContent = params.totalVenta;

    // Lista de productos
    const productosList = JSON.parse(params.productos);
    const productosTbody = document.getElementById("productosList");
    productosList.forEach(producto => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.textContent = producto;
        tr.appendChild(td);
        productosTbody.appendChild(tr);
    });

    // Pagos
    document.getElementById("totalPagos").textContent = params.totalPagos;
    const pagosList = JSON.parse(params.pagos);
    const pagosTd = document.getElementById("pagosList");
    pagosList.forEach(pago => {
        const span = document.createElement("span");
        span.textContent = pago + ", ";
        pagosTd.appendChild(span);
    });

    // Redes sociales
    document.getElementById("socialMediaURL").src = params.socialMediaURL;
}

// Llamamos a la función cuando se carga la página
window.onload = updateRecibo;


window.onload = function() {
    var datosRaw = getUrlParameter('datos');
    var datos = datosRaw.split('<<>>');
    var datosObj = {};

    for (var i = 0; i < datos.length; i += 2) {
        var key = datos[i].replace(/^<<|>>$/g, '');
        var value = datos[i + 1];
        datosObj[key] = value;
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
    var detalleVentasHTML = procesarSelect(datosObj.DETALLE_VENTAS);
    setElementHTML('detalleVentasBody', detalleVentasHTML);

    // Procesar PAGOS
    var pagosHTML = procesarSelect(datosObj.PAGOS);
    setElementHTML('pagosBody', pagosHTML);
};
