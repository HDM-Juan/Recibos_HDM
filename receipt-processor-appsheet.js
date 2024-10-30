// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    
    // Función para asignar valores a elementos
    function setElementContent(id, value) {
        const element = document.getElementById(id);
        if (element) {
            if (element.tagName.toLowerCase() === 'img') {
                element.src = value || '';
            } else {
                element.textContent = value || '';
            }
        }
    }

    // Asignar valores a elementos
    setElementContent('folio_venta', params.get('folio_venta'));
    setElementContent('folioVenta', params.get('folioVenta'));
    setElementContent('fechaVenta', params.get('fechaVenta'));
    setElementContent('nombreEmpresa', params.get('nombreEmpresa'));
    setElementContent('direccion', params.get('direccion'));
    setElementContent('email', params.get('email'));
    setElementContent('telefono', params.get('telefono'));
    setElementContent('whatsapp', params.get('whatsapp'));
    setElementContent('publicidadURL', params.get('publicidadURL'));
    setElementContent('folioRecepcion', params.get('folioRecepcion'));
    setElementContent('imei', params.get('imei'));
    setElementContent('noSerie', params.get('noSerie'));
    setElementContent('totalVenta', params.get('totalVenta'));
    setElementContent('totalPagos', params.get('totalPagos'));
    setElementContent('textoGarantia', params.get('textoGarantia'));
    setElementContent('firmaVenta', params.get('firmaVenta'));
    setElementContent('observaciones', params.get('observaciones'));
    
    // Manejar las tablas
    const detalleVenta = document.querySelector('#tablaDetalleVenta tbody');
    if (detalleVenta) {
        detalleVenta.innerHTML = decodeURIComponent(params.get('tablaDetalleVenta') || '');
    }
    
    const pagosVenta = document.querySelector('#tablaPagosVenta tbody');
    if (pagosVenta) {
        pagosVenta.innerHTML = decodeURIComponent(params.get('tablaPagosVenta') || '');
    }
    
    // Imprimir automáticamente después de cargar
    setTimeout(() => {
        window.print();
    }, 1000);
});
