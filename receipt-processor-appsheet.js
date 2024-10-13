document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const receiptId = urlParams.get('id');

    if (!receiptId) {
        console.error('No se proporcionó ID de recibo');
        return;
    }

    // Función para obtener los datos del recibo
    function fetchReceiptData(id) {
        // Decodificar el ID y reemplazar el guion por el hash
        const originalId = decodeURIComponent(id).replace('-', '#');
        
        // Aquí deberíamos implementar la lógica para obtener los datos del recibo
        // Ejemplo de datos (en una implementación real, esto vendría de una API o base de datos)
        return {
            folio: originalId,
            fecha: '20231015',
            total: '1500.00',
            cliente: 'Juan Pérez',
            // ... otros campos necesarios
        };
    }

    const receiptData = fetchReceiptData(receiptId);

    // Llenar los campos del recibo con los datos obtenidos
    document.getElementById('FOLIO_VENTA').textContent = receiptData.folio;
    document.getElementById('FECHA_VENTA').textContent = formatDate(receiptData.fecha);
    document.getElementById('TOTAL_VENTA').textContent = '$' + receiptData.total;
    document.getElementById('NOMBRE_CLIENTE').textContent = receiptData.cliente;

    // Función para formatear la fecha (asumiendo que viene en formato YYYYMMDD)
    function formatDate(dateString) {
        if (dateString.length !== 8) return dateString;
        return `${dateString.slice(6,8)}/${dateString.slice(4,6)}/${dateString.slice(0,4)}`;
    }

    // Aquí puedes agregar más lógica para llenar otros campos y tablas dinámicas
});
