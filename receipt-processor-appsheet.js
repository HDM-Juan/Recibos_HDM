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
    setElementSrc('logo
