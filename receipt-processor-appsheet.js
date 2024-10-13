document.addEventListener('DOMContentLoaded', function() {
    console.log("Script iniciado");
    const urlParams = new URLSearchParams(window.location.search);
    const receiptId = urlParams.get('folio');
    console.log("ID del recibo obtenido:", receiptId);

    if (!receiptId) {
        showError('No se proporcionó ID de recibo');
        return;
    }

    fetchReceiptData(receiptId)
        .then(data => {
            console.log("Datos del recibo obtenidos:", data);
            populateReceipt(data);
        })
        .catch(error => {
            console.error("Error al obtener datos del recibo:", error);
            showError('Error al cargar los datos del recibo: ' + error.message);
        });

    function fetchReceiptData(id) {
        console.log("Intentando obtener datos para el ID:", id);
        // Aquí deberías implementar la lógica real para obtener los datos
        // Por ahora, simularemos datos para pruebas
        return new Promise((resolve, reject) => {
            setTimeout(() => {
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
                console.log("Datos simulados generados:", receiptData);
                resolve(receiptData);
            }, 1000);
        });
    }

    function populateReceipt(data) {
        console.log("Poblando el recibo con datos");
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
        console.log("Recibo poblado completamente");
    }

    function showError(message) {
        console.error("Mostrando mensaje de error:", message);
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        document.body.innerHTML = '';
        document.body.appendChild(errorElement);
    }
});
