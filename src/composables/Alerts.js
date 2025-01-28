// Alerts.js
import Swal from 'sweetalert2';

export function Alerts() {
  const showAlert = (mensaje, icono) => {
    Swal.fire({
      position: 'top',
      icon: icono,
      title: mensaje,
      showConfirmButton: false,
      timer: icono === 'error' ? 3000 : 1500,
    });
  };

  return {
    showAlert,
  };
}
