<template>
  <div class="containerPrincipal">
    <!-- Contenedor del Video de Fondo -->
    <div class="videoContainer">
      <video
        src="../assets/video.mp4"
        autoplay
        muted
        loop
        class="videoBackground"
      ></video>
      <div class="background_color"></div>
    </div>

    <!-- Contenedor de la Tarjeta para Recuperar Contraseña -->
    <div class="containerRecoverPassword card">
      <div class="logosContainer mb-3">
        <div class="logo saitemp">
          <img src="@/assets/logo1.png" alt="Logo Saitemp" />
        </div>
        <div class="logo">
          <img src="@/assets/logoAlInstante.png" alt="Logo Al Instante" />
        </div>
      </div>

      <h2>Recuperar contraseña</h2>

      <div class="row completeWidth">
        <p class="row_p">Ingrese su nueva clave y confírmela.</p>
      </div>

      <form @submit.prevent="cambiarContrasena">
        <div class="row mb-3">
          <div class="col">
            <label for="password" class="form-label">Contraseña nueva</label>
            <input
              id="password"
              type="password"
              class="form-control"
              required
              v-model="password"
              @input="validateNumeroDocumento(cliente.num_doc)"
              :class="{ 'is-invalid': numeroDocumentoError }"
            />
          </div>
        </div>

        <div class="row mb-4 nom_border">
          <div class="col">
            <label for="confirmPassword" class="form-label"
              >Confirme contraseña</label
            >
            <input
              id="confirmPassword"
              type="password"
              class="form-control"
              required
              v-model="confirmPassword"
              @input="validateNumeroDocumento(cliente.num_doc)"
              :class="{ 'is-invalid': numeroDocumentoError }"
            />
          </div>
        </div>

        <div class="row nom_border">
          <div class="col">
            <button class="btn btn-success w-100" type="submit">
              Cambiar contraseña
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// Aquí irían tus imports y lógica si fuera necesario
import { ref, reactive } from "vue";

// Ejemplo de propiedades y funciones
const password = ref("");
const confirmPassword = ref("");
const numeroDocumentoError = false;
const cliente = reactive({
  num_doc: "",
});

// Función de validación simulada
const validateNumeroDocumento = () => {
  // Lógica de validación de número de documento
};

// Función para enviar el formulario
const cambiarContrasena = () => {
  // Lógica para cambiar la contraseña
  console.log("Contraseña cambiada:", password.value, confirmPassword.value);
};
</script>

<style scoped>
/* Ajustes Generales */
label {
  float: left;
}
.completeWidth {
  width: 105%;
}

/* Botón con degradado y efecto hover */
.btn-success {
  background: linear-gradient(
    90deg,
    rgba(0, 107, 63, 1) 0%,
    rgba(19, 114, 148, 1) 51%,
    rgba(26, 148, 56, 1) 100%
  );
  transition: all 0.5s ease-out;
  border: none;
  color: white;
  position: relative;
  overflow: hidden;
}

.btn-success:hover {
  background: linear-gradient(
    90deg,
    rgba(0, 107, 63, 1) 0%,
    rgba(19, 114, 148, 1) 100%
  );
  background-size: 200% auto;
  background-position: right center;
}

.btn-success::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.btn-success:hover::before {
  left: 100%;
}

/* Contenedor Principal */
.containerPrincipal {
  padding: 0;
  height: 100vh;
  position: relative;
  width: 100%;
  overflow: hidden; /* Evita scroll inesperado por el video */
}

/* Tarjeta (Recuperar Contraseña) */
.card {
  max-width: 500px; /* Máximo ancho para la tarjeta */
  width: 90%; /* Ocupa el 90% del ancho de la pantalla */
  padding: 4em;
  background-color: #fff;
  margin: auto;
  margin-top: 5vh;
  min-width: 300px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  border-radius: 10px;
  position: absolute;
  top: 45%; /* Ubicación vertical en el medio */
  left: 50%; /* Ubicación horizontal en el medio */
  transform: translate(-50%, -50%); /* Centra la tarjeta */
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeInDownBig 1s;
}

/* Líneas divisorias en los .row (opcional) */
.row {
  border-top: solid rgb(206, 206, 206) 1px;
}

.nom_border {
  border: 0;
}

/* Texto dentro de .row */
.row_p {
  margin-top: 1.5em;
  text-align: center;
}

/* Espaciado en las columnas */
.col {
  margin-top: 1.5em;
}

/* Logotipos */
.logosContainer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

.logo {
  width: 150px;
  margin-bottom: 1em;
}

.logo img {
  width: 100%;
}

.saitemp {
  width: 100px;
}
/* Video de Fondo */
.videoContainer {
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.videoBackground {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}

.background_color {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 107, 62, 0.8) 0%,
    rgba(19, 114, 148, 0.8) 51%,
    rgba(26, 148, 56, 0.8) 100%
  );
}

/* Animaciones Personalizadas */
@keyframes fadeInDownBig {
  from {
    opacity: 0;
    transform: translate3d(0, -1000px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

/* Responsividad */
@media (max-width: 768px) {
  .card {
    width: 90%;
    padding: 3em;
    margin-top: 2vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .logosContainer {
    flex-direction: column;
    gap: 1em;
  }

  .logo {
    width: 120px;
  }
}

@media (max-width: 480px) {
  .card {
    width: 95%;
    padding: 2em;
  }

  .logo {
    width: 100px;
  }
}
</style>
