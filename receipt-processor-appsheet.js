// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); // Mantener el parámetro id original
    
    // Asignar valores a elementos
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

    // Asignar el id como estaba originalmente
    setElementContent('folio_venta', id);
    
    // Manejar las tablas de la misma manera que antes
    const detalleVenta = document.querySelector('#tablaDetalleVenta');
    if (detalleVenta && urlParams.get('tablaDetalleVenta')) {
        detalleVenta.innerHTML = decodeURIComponent(urlParams.get('tablaDetalleVenta'));
    }
    
    const pagosVenta = document.querySelector('#tablaPagosVenta');
    if (pagosVenta && urlParams.get('tablaPagosVenta')) {
        pagosVenta.innerHTML = decodeURIComponent(urlParams.get('tablaPagosVenta'));
    }
    
    // Imprimir automáticamente después de cargar
    setTimeout(() => {
        window.print();
    }, 1000);
});
