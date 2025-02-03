<template>
  <div class="container">
    <h2>Módulo cliente</h2>
    <div class="card p-3">
      <form class="was-validated" @submit.prevent="save()">
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre/Razón social</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                aria-describedby="emailHelp"
                v-model="razon_social"
                required
                disabled="true"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="nit" class="form-label">Nit</label>
              <input
                type="text"
                class="form-control"
                id="nit"
                aria-describedby="emailHelp"
                v-model="nit"
                required
              />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="correo" class="form-label">Correo</label>
              <input
                type="text"
                class="form-control"
                id="correo"
                aria-describedby="emailHelp"
                v-model="correo"
                autocomplete="new-email"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="usuario" class="form-label">Usuario</label>
              <input
                type="text"
                class="form-control"
                id="usuario"
                aria-describedby="emailHelp"
                v-model="usuario"
                required
                disabled="true"
              />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="contrasena" class="form-label">Contraseña</label>
              <input
                type="password"
                class="form-control"
                id="contrasena"
                aria-describedby="emailHelp"
                v-model="contrasena"
                autocomplete="new-password"
              />
              <!-- :disabled="true" -->
              <!-- :required="$route.params.id == ''" -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3" id="no-sede" tabindex="0">
            <SearchList
              nombreCampo="Rol*"
              @getRoles="getRoles"
              eventoCampo="getRoles"
              nombreItem="nombre"
              :registros="roles"
              placeholder="Seleccione una opción"
              :consulta="consulta_rol"
            />
          </div>
          <!-- :disabled="$route.params.id != '' && !permisos[32].autorizado" -->

          <div class="col mb-3" id="no-proceso" tabindex="0">
            <SearchList
              nombreCampo="Estado"
              @getEstados="getEstados"
              eventoCampo="getEstados"
              nombreItem="nombre"
              :registros="estados"
              placeholder="Seleccione una opción"
              :consulta="consulta_estado"
            />
            <!-- :disabled="$route.params.id != '' && !permisos[32].autorizado" -->
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn btn-success"
              @click="consultaCliente"
            >
              Consultar cliente
            </button>
          </div>
          <div class="col">
            <button type="submit" class="btn btn-success">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import axios from "axios";
import { useConfig } from "../composables/token"; // Asegúrate de ajustar la ruta
import SearchList from "./SearchList.vue";
import { Alerts } from "../composables/Alerts";
import { useRoute } from "vue-router";

const { URL_API, configHeader } = useConfig();
const { showAlert } = Alerts();
let nit = ref("");
let razon_social = ref("");
let usuario = ref("");
let numero_documento = ref("");
let telefono = ref("");
let correo = ref("");
let contrasena = ref("");
let estados = ref([]);
let roles = ref([]);
let consulta_rol = ref("");
let consulta_estado = ref("");
let rol_id = ref("");
let estado_id = ref("");

getRoles();
getEstados();
onMounted(() => {
  const route = useRoute();
  let url;
  if (route.params.id != "") {
    url = URL_API.value + "api/v1/cliente/" + route.params.id;
    axios.get(url, configHeader()).then(function (result) {
      llenarFormulario(result.data);
    });
  }
});

function save() {
  let self = this;
  let formulario = crearObjetoFormulario();
  let accion = "registercliente";

  if (self.$route && self.$route.params && self.$route.params.id != "") {
    formulario.estado_id = estado_id.value;
    formulario.user_id = self.$route.params.id;
    accion = "cliente";
  }
  axios
    .post(self.URL_API + "api/v1/" + accion, formulario, configHeader())
    .then(function (result) {
      showAlert(result.data.message, result.data.status);
    });
}

function crearObjetoFormulario() {
  let formulario = {
    nombres: razon_social.value,
    email: nit.value,
    password: nit.value,
    rol_id: rol_id.value,
    documento_identidad: nit.value,
  };
  return formulario;
}
function llenarFormulario(formulario) {
  nit.value = formulario.nit; // Usamos .value para asignar el valor al ref
  razon_social.value = formulario.nombres;
  usuario.value = formulario.email;
  numero_documento.value = formulario.nit;
  telefono.value = formulario.telefono;
  correo.value = formulario.correo;
  consulta_rol.value = formulario.rol;
  consulta_estado.value = formulario.estado;
  estado_id.value = formulario.id_estado;
  rol_id.value = formulario.id_rol;
}

function getRoles(item = null) {
  if (item != null) {
    rol_id.value = item.id;
  }
  axios
    .get(URL_API.value + "api/v1/roleslista", configHeader())
    .then(function (result) {
      roles.value = result.data;
    });
}
function getEstados(item = null) {
  if (item != null) {
    estado_id.value = item.id;
  }
  axios
    .get(URL_API.value + "api/v1/estadousuarios", configHeader())
    .then(function (result) {
      estados.value = result.data;
    });
}

function consultaCliente() {
  // let self = this
  axios
    .get(
      URL_API.value + "api/v1/formularioclientenit/" + nit.value,
      configHeader()
    )
    .then(function (result) {
      razon_social.value = result.data.razon_social;
      usuario.value = result.data.nit;
      consulta_rol.value = "Cliente";
      consulta_estado.value = "Activo";
    });
}

</script>
<style scoped>
.card {
  /* height: 520px; */
  margin: auto;
  padding: 20px;
  /* background-color: rgba(239, 237, 237, 0.642); */
  min-width: 350px;
  margin-bottom: 30px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

h3 {
  margin: 20px;
}

label {
  float: left;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}

button {
  width: 100%;
  margin-bottom: 10px;
  /* margin-bottom: 20px; */
}
</style>
