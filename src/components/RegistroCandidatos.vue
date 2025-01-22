<template>
  <div class="cardRegister animate__animated animate__fadeInUpBig">
    <div class="principalContainerRegister">
      <div class="logo logoRegister">
        <img src="@/assets/logo1.png" alt="" />
      </div>
      <form class="formRegister" action="">
        <h2>Registro candidatos</h2>
        <div class="row">
          <div class="col floating-label-group">
            <input
              type="text"
              v-model="nombre"
              class="form-control"
              @focus="isFocusNombre = true"
              @blur="isFocusNombre = false"
              required
            />
            <label :class="{ active: isFocusNombre || nombre }"
              >Nombres *</label
            >
          </div>
          <div class="col floating-label-group">
            <input
              type="text"
              class="form-control"
              v-model="apellidos"
              @focus="isFocusApellidos = true"
              @blur="isFocusApellidos = false"
              required
            />
            <label :class="{ active: isFocusApellidos || apellidos }"
              >Apellidos *</label
            >
          </div>
        </div>
        <div class="row">
          <div class="col floating-label-group">
            <input
              type="text"
              class="form-control"
              v-model="numero_documento"
              @focus="isFocusNumDoc = true"
              @blur="isFocusNumDoc = false"
              required
            />
            <label :class="{ active: isFocusNumDoc || numero_documento }"
              >Número de documento *</label
            >
          </div>
          <div class="col floating-label-group">
            <input
              type="text"
              class="form-control"
              v-model="numero_documento_confirmation"
              @focus="isFocusNumDocConfirmation = true"
              @blur="isFocusNumDocConfirmation = false"
              required
            />
            <label
              :class="{
                active:
                  isFocusNumDocConfirmation || numero_documento_confirmation,
              }"
              >Confirme número de documento *</label
            >
          </div>
        </div>
        <div class="row">
          <div class="col">
            <select class="form-select" name="" id="">
              <option value="">Tipo de documento *</option>
            </select>
          </div>
          <div class="col floating-label-group">
            <input
              type="text"
              class="form-control"
              v-model="telefono"
              @focus="isFocusTel = true"
              @blur="isFocusTel = false"
            />
            <label
              :class="{
                active: isFocusTel || telefono,
              }"
              >Teléfono *</label
            >
          </div>
        </div>
        <div class="row">
          <div class="col floating-label-group">
            <input
              type="text"
              class="form-control"
              v-model="email"
              @focus="isFocusEmail = true"
              @blur="isFocusEmail = false"
              required
            />
            <label
              :class="{
                active: isFocusEmail || email,
              }"
              >Correo electrónico *</label
            >
          </div>
          <div class="col floating-label-group">
            <input
              type="text"
              class="form-control"
              v-model="email_confirmation"
              @focus="isFocusEmailConfirmation = true"
              @blur="isFocusEmailConfirmation = false"
              required
            />
            <label
              :class="{
                active: isFocusEmailConfirmation || email_confirmation,
              }"
              >Confirme correo electrónico *</label
            >
          </div>
        </div>
        <div class="row">
          <div class="col floating-label-group">
            <input
              type="text"
              class="form-control"
              v-model="password"
              @focus="isFocusPassword = true"
              @blur="isFocusPassword = false"
              required
            />
            <label
              :class="{
                active: isFocusPassword || password,
              }"
              >Contraseña *</label
            >
          </div>
          <div class="col floating-label-group">
            <input
              type="text"
              class="form-control"
              v-model="password_confirmation"
              @focus="isFocusPasswordConfirmation = true"
              @blur="isFocusPasswordConfirmation = false"
              required
            />
            <label
              :class="{
                active: isFocusPasswordConfirmation || password_confirmation,
              }"
              >Confirme contraseña *</label
            >
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <button class="btn btn-success" @click="getTiposDocumento">
              Registrarse
            </button>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col">
            <label for=""
              >¿Ya se encuentra registrado?
              <span for="exampleInputPassword1" class="spanRegister">
                Ingrese aquí
              </span></label
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
/* import SearchList from "./SearchList.vue"; */

const nombre = ref("");
const apellidos = ref("");
const numero_documento = ref("");
const numero_documento_confirmation = ref("");
const isFocusNombre = ref(false);
const isFocusApellidos = ref(false);
const isFocusNumDoc = ref(false);
const isFocusNumDocConfirmation = ref(false);
const isFocusTel = ref(false);
const isFocusEmail = ref(false);
const isFocusEmailConfirmation = ref(false);
const isFocusPassword = ref(false);
const isFocusPasswordConfirmation = ref(false);

/* const consulta_tip_doc = ref(""); */
/* const tip_doc_id = ref(""); */
const email = ref("");
const email_confirmation = ref("");
const password = ref("");
const password_confirmation = ref("");
const telefono = ref("");
/* const tipos_doc_array = ref([]); */

const getTiposDocumento = async () => {};
</script>
<style scoped>
.floating-label-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.floating-label-group .form-control {
  width: 100%;
  padding: 8px 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.floating-label-group label {
  pointer-events: none;
  position: absolute;
  left: 20px;
  top: 8px;
  color: #aaa;
  font-size: 16px;
  transition: 0.2s ease all;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
}

.floating-label-group label.active {
  top: -8px;
  left: 20px;
  font-size: 12px;
  color: #333;
}

.cardRegister {
  width: 70%;
  margin: auto;
  margin-top: 5vh;
  padding: 2.5em;
  background-color: rgba(239, 237, 237, 1);
  min-width: 350px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  position: absolute;
  z-index: 100;
  left: 15%;
  animation: fadeInUpBig; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1s;
  border-radius: 5px;
}

.logo {
  width: 0px;
  margin: auto;
  border-radius: 15px;
}
.logoRegister {
  width: 14em;
  margin: auto;
}
.logo img {
  width: 100%;
  border-radius: 15px;
}
label {
  float: left;
  text-align: left;
}
.spanRegister {
  color: rgb(67, 151, 196);
  text-decoration: underline;
  cursor: pointer;
}
.spanRegister:hover {
  color: rgb(45, 93, 117);
  text-decoration: underline;
  cursor: pointer;
}
.principalContainerRegister {
  display: flex;
}
.formRegister {
  width: 60%;
}
</style>
