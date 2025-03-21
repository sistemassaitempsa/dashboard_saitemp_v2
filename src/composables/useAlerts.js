import Swal from "sweetalert2";

export const useAlerts = () => {
  /**
   * Muestra una alerta simple sin botón de confirmación.
   * @param {string} mensaje - El mensaje a mostrar.
   * @param {string} icono - El icono de la alerta ('success', 'error', 'warning', etc.).
   */
  const showAlert = (mensaje, icono) => {
    Swal.fire({
      position: "top",
      icon: icono,
      title: mensaje,
      showConfirmButton: false,
      timer: icono === "error" ? 3000 : 1500,
    });
  };

  /**
   * Muestra una alerta con un botón de confirmación.
   * @param {string} mensaje - El mensaje a mostrar.
   * @param {string} icono - El icono de la alerta.
   * @returns {Promise} - La promesa de la alerta de SweetAlert2.
   */
  const showAlertConfirm = (mensaje, icono) => {
    return Swal.fire({
      position: "top",
      icon: icono,
      title: mensaje,
      showConfirmButton: true,
    });
  };

  /**
   * Muestra una alerta de confirmación para eliminar un registro.
   * @param {string|null} titulo - El título personalizado de la alerta.
   * @param {Function} funcion - La función que se ejecuta si se confirma la eliminación.
   * @param {any} id - El identificador del registro a eliminar.
   */
  const messageDelete = async (titulo = null, funcion, id) => {
    const title = titulo || "¿Estás seguro de eliminar el registro?";

    try {
      const result = await Swal.fire({
        title: title,
        text: "¡Esta operación no se puede revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, eliminar!",
      });

      if (result.isConfirmed) {
        const response = await funcion(id);
        showAlert(response.data.message, response.data.status);
      }
    } catch (error) {
      console.error("Error en messageDelete:", error);
      showAlert("Ocurrió un error al eliminar el registro.", "error");
    }
  };

  /**
   * Muestra una alerta con más opciones de personalización.
   * @param {string} mensaje - El mensaje a mostrar.
   * @param {string} icono - El icono de la alerta.
   */
  const showAlertWithButton = (mensaje, icono) => {
    Swal.fire({
      icon: icono,
      title: mensaje,
      showConfirmButton: true,
    });
  };

  return { showAlert, showAlertConfirm, messageDelete, showAlertWithButton };
};
