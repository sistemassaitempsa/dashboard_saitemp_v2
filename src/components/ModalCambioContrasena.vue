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
            <input type="text" class="form-control" v-model="newPassword" />
          </div>
          <div class="col">
            <label for="" class="form-label">Confirme contraseña</label>
            <input
              type="text"
              class="form-control"
              v-model="newPasswordConfirmation"
              :disabled="newPassword == '' ? true : false"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button type="button" class="buttonCancel" @click="close">
              Cancelar
            </button>
          </div>
          <div class="col">
            <button type="button" class="buttonSave" @click="cambiarContrasena">
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

//variables
const { showAlert } = useAlerts();
const emit = defineEmits(["closeModalCambio", "cambioContrasena"]);
const newPassword = ref("");
const newPasswordConfirmation = ref("");

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

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
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
