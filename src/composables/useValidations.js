import { ref } from "vue";

/**
 * useValidation - Composable para validar campos de email y contraseña.
 *
 * @returns {Object} - Funciones de validación y estados de error.
 */
export const useValidation = () => {
  // Estados reactivas para los mensajes de error
  const emailError = ref("");
  const passwordError = ref("");
  const numeroDocumentoError = ref("");

  /**
   * validateEmail - Valida el formato del email.
   *
   * @param {string} email - El email a validar.
   * @returns {boolean} - Verdadero si el email es válido, falso de lo contrario.
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      emailError.value = "";
      return false;
    } else if (!emailRegex.test(email)) {
      emailError.value = "El email no es válido.";
      return false;
    } else {
      emailError.value = "";
      return true;
    }
  };

  /**
   * validatePassword - Valida la contraseña.
   * La contraseña debe tener al menos una letra mayúscula y un número.
   *
   * @param {string} password - La contraseña a validar.
   * @returns {boolean} - Verdadero si la contraseña es válida, falso de lo contrario.
   */
  const validatePassword = (password) => {
    // Expresión regular para al menos una letra mayúscula y un número
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!password) {
      passwordError.value = "";
      return false;
    } else if (!passwordRegex.test(password)) {
      passwordError.value =
        "La contraseña debe tener al menos una letra mayúscula y un número, y tener al menos 6 caracteres.";
      return false;
    } else {
      passwordError.value = "";
      return true;
    }
  };
  const validateNumeroDocumento = (numeroDocumento) => {
    const numeroDocumentoRegex = /^\d{4,}$/;
    if (!numeroDocumento) {
      numeroDocumentoError.value = "";
      return false;
    } else if (!numeroDocumentoRegex.test(numeroDocumento)) {
      numeroDocumentoError.value =
        "El número de documento debe tener al menos 4 caracteres y contener solo números.";
      return false;
    } else {
      numeroDocumentoError.value = "";
      return true;
    }
  };
  /**
   * validateForm - Valida todo el formulario.
   *
   * @param {Object} form - Objeto que contiene los campos del formulario.
   * @returns {boolean} - Verdadero si todos los campos son válidos, falso de lo contrario.
   */
  const validateForm = (form) => {
    const isEmailValid = validateEmail(form.email);
    const isPasswordValid = validatePassword(form.password);
    const isNumeroDocumentoValid = validateNumeroDocumento(
      form.numero_documento
    );
    return isEmailValid && isPasswordValid && isNumeroDocumentoValid;
  };

  return {
    emailError,
    passwordError,
    numeroDocumentoError,
    validateEmail,
    validatePassword,
    validateNumeroDocumento,
    validateForm,
  };
};
