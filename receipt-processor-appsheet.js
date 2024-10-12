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
    var resultado = contenido;
    var match;

    while ((match = regex.exec(contenido)) !== null) {
        resultado = resultado.replace(match[0], match[2]);
    }

    return resultado.replace(/<<\[(.*?)\]>>/g, '');
}

window.onload = function() {
    var datosRaw = getUrlParameter('datos');
    var datos = datosRaw.split('<<>>');
    var datosObj = {};

    for (var i = 0; i < datos.length; i += 2) {
        var key = datos[i].replace(/^<<|>>$/g, '');
        var value = datos[i + 1];
        datosObj[key] = value;
    }

    // Establecer valores en el HTML
    for (var key in datosObj) {
        if (datosObj.hasOwnProperty(key)) {
            var element = document.getElementById(key);
            if (element) {
                if (element.tagName === 'IMG') {
                    element.src = datosObj[key];
                } else {
                    element.textContent = datosObj[key];
                }
            }
        }
    }

    // Procesar DETALLE_VENTAS
    var detalleVentasHTML = procesarSelect(datosObj.DETALLE_VENTAS);
    setElementHTML('detalleVentasBody', detalleVentasHTML);

    // Procesar PAGOS
    var pagosHTML = procesarSelect(datosObj.PAGOS);
    setElementHTML('pagosBody', pagosHTML);
};
