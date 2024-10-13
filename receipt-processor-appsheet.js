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
    console.log("Procesando SELECT:", contenido);
    var regex = /<<Start: SELECT\((.*?)\) >>([\s\S]*?)<< end >>/;
    var match = regex.exec(contenido);
    
    if (match) {
        console.log("Contenido dentro de SELECT:", match[2]);
        return match[2];
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

    // Establecer valores en el HTML
    for (var key in datosObj) {
        if (datosObj.hasOwnProperty(key)) {
            if (key !== 'DETALLE_VENTAS' && key !== 'PAGOS') {
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
    }

    // Procesar DETALLE_VENTAS
    var detalleVentasHTML = procesarSelect(datosObj.DETALLE_VENTAS);
    console.log("HTML de Detalle Ventas:", detalleVentasHTML);
    setElementHTML('detalleVentasBody', detalleVentasHTML);

    // Procesar PAGOS
    var pagosHTML = procesarSelect(datosObj.PAGOS);
    console.log("HTML de Pagos:", pagosHTML);
    setElementHTML('pagosBody', pagosHTML);
};
