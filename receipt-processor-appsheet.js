// Al inicio del archivo receipt.js, añada esta función:
function obtenerDatosDeURL() {
    const params = new URLSearchParams(window.location.search);
    const datosJSON = params.get('datos');
    if (datosJSON) {
        return JSON.parse(decodeURIComponent(datosJSON));
    }
    return null;
}

// Modifique la función window.onload así:
window.onload = function() {
    const datos = obtenerDatosDeURL();
    if (datos) {
        actualizarRecibo(datos);
    } else {
        console.error('No se encontraron datos en la URL');
    }
};
