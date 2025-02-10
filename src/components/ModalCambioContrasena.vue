<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="container">
        <div class="row mb-4 mt-4">
          <div class="col">
            <h5>Cambio de contraseña</h5>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <label for="" class="form-label"> Contraseña nueva</label>
            <input
              :type="!contraseña ? 'password' : 'text'"
              class="form-control"
              v-model="newPassword"
              @input="validatePassword(newPassword)"
              :class="{ 'is-invalid': passwordError }"
            />
            <div v-if="passwordError" class="invalid-feedback">
              {{ passwordError }}
            </div>
            <div class="positionAbsolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="input-icon password"
                viewBox="0 0 20 20"
                fill="currentColor"
                @click="contraseña = !contraseña"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div class="col">
            <label for="" class="form-label">Confirme contraseña</label>
            <input
              :type="!contraseñaConfirm ? 'password' : 'text'"
              class="form-control"
              v-model="newPasswordConfirmation"
              @paste.prevent
              :disabled="newPassword == '' ? true : false"
            />
            <div class="positionAbsolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="input-icon password"
                viewBox="0 0 20 20"
                fill="currentColor"
                @click="contraseñaConfirm = !contraseñaConfirm"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button type="password" class="buttonCancel" @click="close">
              Cancelar
            </button>
          </div>
          <div class="col">
            <button
              type="button"
              class="buttonSave"
              @click="cambiarContrasena"
              :disabled="passwordError || newPassword == '' ? true : false"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//imports
import { defineEmits, ref } from "vue";
import { useAlerts } from "@/composables/useAlerts";
import { useValidation } from "../composables/useValidations";

//variables
const { showAlert } = useAlerts();
const emit = defineEmits(["closeModalCambio", "cambioContrasena"]);
const newPassword = ref("");
const newPasswordConfirmation = ref("");
const { passwordError, validatePassword } = useValidation();
const contraseña = ref(false);
const contraseñaConfirm = ref(false);

//funciones
const close = () => {
  emit("closeModalCambio");
};

const cambiarContrasena = () => {
  if (!newPassword.value || !newPasswordConfirmation.value) {
    showAlert("Los campos de contraseña no pueden estar vacíos", "error");
    return;
  }
  if (newPassword.value == newPasswordConfirmation.value) {
    emit("cambioContrasena", newPassword.value);
  } else {
    showAlert("Las contraseñas deben ser iguales", "error");
  }
};
</script>

<style scoped>
.col {
  position: relative;
}
.positionAbsolute {
  position: absolute;
  left: 95%;
  top: 2.5em;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.input-icon.password {
  left: unset;
  right: 40px;
  top: unset;
  bottom: 110px;
  cursor: pointer;
}
.input-icon {
  color: #191919;
  width: 20px;
  height: 20px;
}

.modal-content {
  background: #fff;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.buttonSave {
  margin-top: 10px;
  padding: 10px;
  background-color: #006b3f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.8s;
}

.buttonSave:hover {
  background-color: #0d5436;
}
.buttonCancel {
  margin-top: 10px;
  padding: 10px;
  background-color: rgb(226, 74, 74);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.8s;
}
.buttonCancel:hover {
  background-color: #dd1d1d;
}
</style>
