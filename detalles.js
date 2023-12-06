// Datos simulados de la compra (puedes reemplazar esto con tus datos reales)
const detallesCompra = [
    { producto: 'Producto 1', precio: 20 },
    { producto: 'Producto 2', precio: 30 },
    { producto: 'Producto 3', precio: 15 }
  ];
  
  // Función para generar el contenido HTML de los detalles de la compra
  function generarContenidoHTML() {
    let contenidoHTML = '<h1>Detalles de la Compra</h1><ul>';
    detallesCompra.forEach(detalle => {
      contenidoHTML += `<li>${detalle.producto}: $${detalle.precio}</li>`;
    });
    contenidoHTML += '</ul>';
    return contenidoHTML;
  }
  
  // Función para descargar el PDF al hacer clic en el botón
  document.getElementById('btnDescargarPDF').addEventListener('click', async () => {
    const contenidoHTML = generarContenidoHTML();
  
    try {
      const response = await fetch('https://api.html2pdf.app/v1/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: contenidoHTML
        })
      });
  
      const blob = await response.blob();
  
      // Crear enlace de descarga y simular clic para descargar el PDF
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'detalles_compra.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  });
  