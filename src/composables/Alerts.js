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


  const confirmAlert = (titulo, mensaje, icono) => {
    Swal.fire({
      position: 'top',
      icon: icono,
      title: titulo,
      text: mensaje,
    });
  };

  const confirmSaveAlert = (titulo, funcion) => {
  Swal.fire({
    title: titulo,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#7066e0",
  }).then((result) => {
    if (result.isConfirmed) {
      // showAlert("Registro guardado exitosamente!", "success");
      funcion();
    } else if (result.isDenied) {
      showAlert("Los cambios no fueron guardados", "info");
    }
  });
};


  return {
    showAlert,confirmAlert, confirmSaveAlert
  };
}
