document.addEventListener('DOMContentLoaded', function() {
    console.log("Script iniciado");
    const urlParams = new URLSearchParams(window.location.search);
    const receiptId = urlParams.get('id');
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
        return new Promise((resolve) => {
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
                    observaciones: 'Cliente satisfecho con el servicio.',
                    garantia: 'Garantía válida por 30 días en mano de obra.',
                    folioRecepcion: 'FR-001234',
                    imei: '123456789012345',
                    empresa: 'Hospital del Móvil',
                    direccion: 'Calle Principal #123, Ciudad',
                    email: 'contacto@hospitaldelmovil.com',
                    telefono: '(123) 456-7890',
                    sitioWeb: 'www.hospitaldelmovil.com',
                    whatsapp: '+52 1 234 567 8901'
                };
                console.log("Datos simulados generados:", receiptData);
                resolve(receiptData);
            }, 1000);
        });
    }

    function populateReceipt(data) {
        console.log("Poblando el recibo con datos");
        
        // Información de la empresa
        document.getElementById('NOMBRE_EMPRESA').textContent = data.empresa;
        document.getElementById('DIRECCION').textContent = data.direccion;
        document.getElementById('EMAIL').textContent = data.email;
        document.getElementById('TELEFONO').textContent = data.telefono;
        document.getElementById('SITIO_WEB').textContent = data.sitioWeb;
        document.getElementById('WHATSAPP').textContent = data.whatsapp;

        // Detalles del recibo
        document.getElementById('FOLIO_VENTA').textContent = data.folio;
        document.getElementById('FECHA_VENTA').textContent = data.fecha;
        document.getElementById('FOLIO_RECEPCION').textContent = 'FOLIO RECEPCIÓN: ' + data.folioRecepcion;
        document.getElementById('IMEI_INFO').textContent = 'IMEI: ' + data.imei;

        // Detalle de venta
        const detalleVentasTable = document.getElementById('detalleVentasTable').getElementsByTagName('tbody')[0];
        detalleVentasTable.innerHTML = ''; // Limpiar tabla existente
        data.detalleVenta.forEach(item => {
            const row = detalleVentasTable.insertRow();
            row.insertCell(0).textContent = item.concepto;
            row.insertCell(1).textContent = `$${item.precioUnitario}`;
        });
        document.getElementById('TOTAL_VENTA').textContent = `$${data.total}`;

        // Pagos
        const pagosTable = document.getElementById('pagosTable').getElementsByTagName('tbody')[0];
        pagosTable.innerHTML = ''; // Limpiar tabla existente
        data.pagos.forEach(pago => {
            const row = pagosTable.insertRow();
            row.insertCell(0).textContent = `$${pago.cantidad}`;
            row.insertCell(1).textContent = pago.formaPago;
        });
        document.getElementById('TOTAL_PAGOS').textContent = `$${data.total}`;

        // Garantía y observaciones
        document.getElementById('TEXTO_GARANTIA').textContent = data.garantia;
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
