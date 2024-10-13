document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const receiptId = urlParams.get('id');

    if (!receiptId) {
        showError('No se proporcionó ID de recibo');
        return;
    }

    fetchReceiptData(receiptId)
        .then(populateReceipt)
        .catch(error => showError('Error al cargar los datos del recibo: ' + error.message));

    function fetchReceiptData(id) {
        // Esta función debe ser implementada para obtener los datos reales del recibo
        // Por ahora, simularemos una llamada a API con una promesa y datos de ejemplo
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulamos datos del recibo
                // En una implementación real, estos datos vendrían de tu backend o API
                const receiptData = {
                    folio: id,
                    fecha: '15/10/2023',
                    total: '1500.00',
                    cliente: 'Juan Pérez',
                    detalleVenta: [
                        { concepto: 'Servicio: Reparación de pantalla', precioUnitario: '1000.00' },
                        { concepto: 'Repuesto: Pantalla LCD', precioUnitario: '500.00' }
                    ],
                    pagos: [
                        { cantidad: '1000.00', formaPago: 'Efectivo' },
                        { cantidad: '500.00', formaPago: 'Tarjeta de crédito' }
                    ],
                    observaciones: 'Cliente satisfecho con el servicio.'
                };
                resolve(receiptData);
                // En caso de error, usar: reject(new Error('Mensaje de error'));
            }, 1000); // Simulamos un retraso de 1 segundo
        });
    }

    function populateReceipt(data) {
        document.getElementById('FOLIO_VENTA').textContent = data.folio;
        document.getElementById('FECHA_VENTA').textContent = data.fecha;
        document.getElementById('TOTAL_VENTA').textContent = `$${data.total}`;
        document.getElementById('NOMBRE_CLIENTE').textContent = data.cliente;

        const detalleVentasTable = document.getElementById('detalleVentasTable');
        data.detalleVenta.forEach(item => {
            const row = detalleVentasTable.insertRow();
            row.insertCell(0).textContent = item.concepto;
            row.insertCell(1).textContent = `$${item.precioUnitario}`;
        });

        const pagosTable = document.getElementById('pagosTable');
        data.pagos.forEach(pago => {
            const row = pagosTable.insertRow();
            row.insertCell(0).textContent = `$${pago.cantidad}`;
            row.insertCell(1).textContent = pago.formaPago;
        });

        document.getElementById('OBSERVACIONES').textContent = data.observaciones;
    }

    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        document.body.innerHTML = '';
        document.body.appendChild(errorElement);
    }
});
