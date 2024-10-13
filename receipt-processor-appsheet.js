function updateInvoice() {
  // Formatear números
  var totalVenta = parseFloat(document.getElementById("TOTAL_VENTA").textContent.replace(/[^\d\.\-]+/g, ''));
  document.getElementById("TOTAL_VENTA").textContent = totalVenta.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');

  // Formatear la fecha
  var fechaVenta = document.getElementById("FECHA_VENTA").textContent;
  var fechaFormateada = new Date(fechaVenta).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  document.getElementById("FECHA_VENTA").textContent = fechaFormateada;
}

document.addEventListener('DOMContentLoaded', updateInvoice);
