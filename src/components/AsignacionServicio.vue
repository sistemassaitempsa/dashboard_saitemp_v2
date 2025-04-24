<template>
  <div>
    <div class="container">
      <Loading :loading="loading" />
      <h2>Asignacion servicio</h2>
      <div class="row">
        <div class="col" v-for="item in radio_seleccion" :key="item.id">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              :checked="item.checked"
              @change="checkProfesional(item, $event)"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">{{
              item.nombre
            }}</label>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col" v-for="item in radio_contratacion" :key="item.id">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              :checked="item.checked"
              @change="checkFacilitador(item, $event)"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">{{
              item.nombre
            }}</label>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-xs-12 col-md-4">
          <SearchList
            nombreCampo="Selección"
            :valida_campo="false"
            nombreItem="nombres"
            eventoCampo="getProfesionalsector"
            :consulta="consulta_codigo_ciiu"
            :registros="profesionales"
            @getProfesionalsector="getProfesionalsector"
            :ordenCampo="1"
            placeholder="Seleccione una opción"
          />
        </div>
        <div class="col-xs-12 col-md-4">
          <SearchList
            nombreCampo="Contratación"
            :valida_campo="false"
            nombreItem="nombres"
            eventoCampo="getFacilitadores"
            :consulta="consulta_codigo_ciiu"
            :registros="facilitadores"
            @getFacilitadores="getFacilitadores"
            :ordenCampo="1"
            placeholder="Seleccione una opción"
          />
        </div>
        <div class="col-xs-12 col-md-4 mt-3">
          <button
            type="button"
            id="newNews"
            class="btn btn-success"
            @click="asignarUsuario()"
            style="margin-top: 33px"
          >
            Guardar registro
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3" v-if="asignar_profesionales.length > 0">
          <span>Proceso de selección</span>
          <div
            class="mb-3"
            style="
              padding: 10px;
              border: solid #d5dbdb 0.5px;
              border-radius: 10px;
            "
          >
            <button
              type="button"
              style="margin: 10px 10px 5px 10px"
              id="btnMenu"
              class="btn btn-sm"
              data-bs-toggle="button"
              v-for="(item, index) in asignar_profesionales"
              :key="index"
            >
              {{ item.nombres }} {{ item.apellidos }}
              <i
                class="bi bi-x"
                @click="asignar_profesionales.splice(index, 1)"
              ></i>
            </button>
          </div>
        </div>
        <div class="col-6 mb-3" v-if="asignar_facilitadores.length > 0">
          <span>Proceso de contratación</span>
          <div
            class="mb-3"
            style="
              padding: 10px;
              border: solid #d5dbdb 0.5px;
              border-radius: 10px;
            "
          >
            <button
              type="button"
              style="margin: 10px 10px 5px 10px"
              id="btnMenu"
              class="btn btn-sm"
              data-bs-toggle="button"
              v-for="(item, index) in asignar_facilitadores"
              :key="index"
            >
              {{ item.nombres }} {{ item.apellidos }}
              <i
                class="bi bi-x"
                @click="asignar_facilitadores.splice(index, 1)"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useConfig } from "../composables/token";
import SearchList from "./SearchList.vue";
import Loading from "./Loading.vue";
import { Alerts } from "../composables/Alerts";

const { URL_API, configHeader } = useConfig();
const { showAlert } = Alerts();
let radio_seleccion = ref([
  { id: 1, nombre: "seleccion_automatico", checked: false, tipo: 0 },
  { id: 2, nombre: "Asignación manual profesional", checked: false, tipo: 0 },
]);
let radio_contratacion = ref([
  { id: 1, nombre: "contratacion_automatico", checked: false, tipo: 1 },
  { id: 2, nombre: "Asignación manual facilitador", checked: false, tipo: 1 },
]);
let profesionales = ref([]);
let asignar_profesionales = ref([]);
let asignar_facilitadores = ref([]);
let facilitadores = ref([]);
let consulta_codigo_ciiu = ref("");
let loading = ref(false);

onMounted(() => {
  getUsuariosDisponibles();
});

function getUsuariosDisponibles() {
  axios
    .get(URL_API.value + "api/v1/usuariodisponibleservicio", configHeader())
    .then(function (result) {
      result.data.usuarios.forEach((element) => {
        if (element.rol_usuario_interno_id == 5) {
          asignar_facilitadores.value.push(element);
        } else if (element.rol_usuario_interno_id == 4) {
          asignar_profesionales.value.push(element);
        }
      });

      radio_seleccion.value = [];
      radio_contratacion.value = [];
      result.data.radios.forEach((element) => {
        element.checked = element.checked == 0 ? false : true;
        // element.checked = element.checked == 0;
        if (element.tipo == 0) {
          radio_seleccion.value.push(element);
        } else if (element.tipo == 1) {
          radio_contratacion.value.push(element);
        }
      });
    });
}

function getProfesionalsector(item = null) {
  if (
    item != null &&
    !asignar_profesionales.value.some((array) => array.id === item.id)
  ) {
    asignar_profesionales.value.push(item);
  }
  axios
    .get(URL_API.value + "api/v1/usuariointernorol/4", configHeader())
    .then(function (result) {
      profesionales.value = result.data;
    });
}
function getFacilitadores(item = null) {
  if (
    item != null &&
    !asignar_facilitadores.value.some((array) => array.id === item.id)
  ) {
    asignar_facilitadores.value.push(item);
  }
  axios
    .get(URL_API.value + "api/v1/usuariointernorol/5", configHeader())
    .then(function (result) {
      facilitadores.value = result.data;
    });
}

function checkProfesional(item, event) {
  radio_seleccion.value.forEach((element) => {
    element.checked = event.target.checked == false ? true : false;
  });
  item.checked = event.target.checked;
}

function checkFacilitador(item, event) {
  radio_contratacion.value.forEach((element) => {
    element.checked = event.target.checked == false ? true : false;
  });
  item.checked = event.target.checked;
}

function asignarUsuario() {
  let array = {
    usuarios: asignar_profesionales.value.concat(asignar_facilitadores.value),
    radios: radio_seleccion.value.concat(radio_contratacion.value),
  };
  axios
    .post(
      URL_API.value + "api/v1/usuariodisponibleservicio",
      array,
      configHeader()
    )
    .then(function (result) {
      showAlert(result.data.message, result.data.status);
    });
}
</script>
<style scoped>
.container {
  animation: fadeIn;
  animation-duration: 2s;
}

.row {
  margin: 30px 0px 30px 0px;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}

label {
  float: left;
}

#btnMenu {
  background-color: rgba(22, 119, 115, 1);
  color: white;
}
</style>
