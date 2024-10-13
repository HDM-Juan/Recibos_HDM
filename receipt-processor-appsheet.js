document.addEventListener('DOMContentLoaded', function() {
  // Función para cargar los datos desde la API de AppSheet
  function loadReceiptData(folio) {
    const apiUrl = `https://api.appsheet.com/api/v2/apps/9c718e94-b195-46f2-817a-4d15d11a804e/tables/VENTAS/rows?$filter=Folio eq '${folio}'`;
    const apiKey = "V2-D2okM-VqUu4-VfXr7-ke8mW-15ECk-GRdIz-zpezz-nNzJg";

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'ApplicationAccessKey': apiKey,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Supongamos que la API devuelve un array con las ventas
      const venta = data.rows.find(row => row.Folio === folio);

      // Llenar los campos dinámicos en el recibo
      document.getElementById('FOLIO_VENTA').textContent = venta.Folio;
      document.getElementById('FECHA_VENTA').textContent = venta.Fecha;
      document.getElementById('TOTAL_VENTA').textContent = venta.TotalVenta;

      // Detalle de Venta
      const detalleVentasTable = document.getElementById('detalleVentasTable').getElementsByTagName('tbody')[0];
      venta.DetalleVenta.forEach(item => {
        const row = detalleVentasTable.insertRow();
        const cellConcepto = row.insertCell(0);
        const cellPrecio = row.insertCell(1);
        cellConcepto.textContent = item.Concepto;
        cellPrecio.textContent = `$${item.PrecioUnitario}`;
      });

      // Pagos
      const pagosTable = document.getElementById('pagosTable').getElementsByTagName('tbody')[0];
      venta.Pagos.forEach(pago => {
        const row = pagosTable.insertRow();
        const cellCantidad = row.insertCell(0);
        const cellFormaPago = row.insertCell(1);
        cellCantidad.textContent = `$${pago.Cantidad}`;
        cellFormaPago.textContent = pago.FormaPago;
      });
      document.getElementById('TOTAL_PAGOS').textContent = `$${venta.TotalPagos}`;

      // Garantía y Observaciones
      document.getElementById('TEXTO_GARANTIA').textContent = venta.TextoGarantia;
      document.getElementById('OBSERVACIONES').textContent = venta.Observaciones;
    })
    .catch(error => console.error('Error al obtener los datos de AppSheet:', error));
  }

  // Obtener el folio desde los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const folio = urlParams.get('folio');

  if (folio) {
    loadReceiptData(folio);
  } else {
    console.error('No se proporcionó un folio en la URL.');
  }
});
