<script>
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

window.onload = function() {
    var datos = getUrlParameter('datos').split('<<>>');
    var variables = [
        'NOMBRE_EMPRESA', 'DIRECCION', 'EMAIL', 'TELEFONO', 'SITIO_WEB', 'WHATSAPP',
        'LOGO_URL', 'PUBLICIDAD_URL', 'FOLIO_VENTA', 'FECHA_VENTA', 'FOLIO_RECEPCION',
        'IMEI', 'NO_SERIE', 'DETALLE_VENTAS', 'TOTAL_VENTA', 'PAGOS', 'TOTAL_PAGOS',
        'TEXTO_GARANTIA', 'OBSERVACIONES', 'REDES_SOCIALES_URL'
    ];
    
    for (var i = 0; i < variables.length; i++) {
        var elements = document.getElementsByClassName(variables[i]);
        for (var j = 0; j < elements.length; j++) {
            if (elements[j].tagName === 'IMG') {
                elements[j].src = datos[i*2 + 1];
            } else {
                elements[j].innerHTML = datos[i*2 + 1];
            }
        }
    }
}
</script>
