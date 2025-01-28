<template>
  <div class="container">
    <h2>Orden de servicio</h2>
    <div class="card p-3">
      <form class="was-validated" @submit.prevent="save()">
        <div class="row" v-if="params_id != ''">
          <div class="col">
            <div class="mb-3">
              <label for="radicado" class="form-label">Radicado</label>
              <input
                type="text"
                class="form-control"
                id="radicado"
                aria-describedby="emailHelp"
                v-model="radicado"
                required
              />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="radicador" class="form-label">Creado por:</label>
              <input
                type="text"
                class="form-control"
                id="radicador"
                aria-describedby="emailHelp"
                v-model="radicador"
                required
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
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="razon_social" class="form-label"
                >Nombre/Razón social</label
              >
              <input
                type="text"
                class="form-control"
                id="razon_social"
                aria-describedby="emailHelp"
                v-model="razon_social"
                required
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="ciiu" class="form-label">Actividad ciiu</label>
              <input
                type="text"
                class="form-control"
                id="ciiu"
                aria-describedby="ciiu"
                v-model="actividad_ciiu"
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="sector_economico" class="form-label"
                >Sector económico</label
              >
              <input
                type="text"
                class="form-control"
                id="sector_economico"
                aria-describedby="emailHelp"
                v-model="sector_economico"
                autocomplete="new-email"
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="fecha_inicio" class="form-label"
                >Fecha inicio solicitud</label
              >
              <input
                type="date"
                class="form-control"
                id="fecha_inicio"
                aria-describedby="emailHelp"
                v-model="fecha_inicio"
                required
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="fecha_fin" class="form-label"
                >Fecha terminación solicitud</label
              >
              <input
                type="date"
                class="form-control"
                id="fecha_fin"
                aria-describedby="emailHelp"
                v-model="fecha_fin"
                required
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3" id="no-sede" tabindex="0">
            <SearchList
              nombreCampo="Linea de servicio"
              @lineaServicio="lineaServicio"
              eventoCampo="lineaServicio"
              nombreItem="nombre"
              :registros="lineas_servicio"
              placeholder="Seleccione una opción"
              :consulta="consulta_linea_servicio"
            />
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Departamento de prestación del servicio: *"
              nombreItem="nombre"
              eventoCampo="getDepartamentos"
              :consulta="consulta_departamento_prestacion_servicio"
              :registros="departamentos"
              @getMunicipios="getMunicipios"
              placeholder="Seleccione una opción"
            />
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Ciudad de prestación del servicio: *"
              nombreItem="nombre"
              :registros="municipios"
              :ordenCampo="1"
              :consulta="consulta_municipio"
              @setMunicipios="setMunicipios"
              eventoCampo="setMunicipios"
              placeholder="Seleccione una opción"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="nombre_contacto" class="form-label"
                >Nombre contacto</label
              >
              <input
                type="text"
                class="form-control"
                id="nombre_contacto"
                aria-describedby="emailHelp"
                v-model="nombre_contacto"
                required
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="telefono_contacto" class="form-label"
                >telefono de contacto</label
              >
              <input
                type="text"
                class="form-control"
                id="telefono_contacto"
                aria-describedby="emailHelp"
                v-model="telefono_contacto"
                required
                @input="telefono_contacto = validarNumero(telefono_contacto)"
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="cargo" class="form-label">Cargo</label>
              <input
                type="text"
                class="form-control"
                id="cargo"
                aria-describedby="emailHelp"
                v-model="cargo_contacto"
                required
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <h5>Motivo del servicio</h5>
          <div class="col">
            <div
              class="form-check"
              v-for="item in motivos_servicio"
              :key="item.id"
            >
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                :value="item.id"
                v-model="motivo_servicio_id"
                required
              />
              <label class="form-check-label" for="exampleRadios1">
                {{ item.nombre }}
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mt-3">
            <label for="cantidad_contrataciones" class="form-label"
              >Cantidad contrataciones</label
            >
            <input
              type="text"
              class="form-control"
              id="cantidad_contrataciones"
              aria-describedby="emailHelp"
              v-model="cantidad_contrataciones"
              @input="
                cantidad_contrataciones = validarNumero(cantidad_contrataciones)
              "
              required
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Cargo solicitado"
              nombreItem="nombre"
              :registros="cargos"
              :ordenCampo="1"
              :consulta="consulta_cargo"
              @getCargos="getCargos"
              eventoCampo="getCargos"
              placeholder="Seleccione una opción"
            />
          </div>
          <!-- <div class="col">
            <div class="col-2">
              <SearchList
                nombreCampo="Riesgo del cargo* (ARL):"
                eventoCampo="getRiesgosLaborales2"
                :index="index"
                nombreItem="nombre"
                :registros="riesgos_laborales"
                @getRiesgosLaborales2="getRiesgosLaborales2"
                placeholder="Seleccionar"
                :consulta="consulta_riesgo_laboral[index]"
              />
            </div>
          </div> -->
        </div>
        <div class="row">
          <Tiptap v-model="funciones_cargo" />
        </div>
        <div class="row">
          <label for="exampleInputEmail1" class="form-label">Exámenes:</label>
          <div class="col">
            <div class="lista-multiple">
              <button
                style="margin: 5px"
                class="btn btn-success btn-sm"
                v-for="(item, index) in array_lista_examenes"
                :key="index"
                type="button"
              >
                {{ item.nombre }}
              </button>
            </div>
          </div>
        </div>
        <div
          class="row"
          v-for="(item, index3) in array_lista_recomendaciones"
          :key="index3"
        >
          <div class="col orientacion">
            <label style="width: 100%"
              >ORIENTACIONES ESPECIFICAS PARA LOS EXAMENES:</label
            >
            <span>{{ item.recomendacion1 }}</span>
          </div>
          <div class="col orientacion">
            <label style="width: 100%"
              >PATOLOGIAS QUE RESTRINGEN LA LABOR:</label
            >
            <span>{{ item.recomendacion2 }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="mb-3">
              <label for="salario" class="form-label">Salario</label>
              <input
                type="text"
                class="form-control"
                id="salario"
                aria-describedby="emailHelp"
                v-model="salario"
                required
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <h5>Candidatos</h5>
        </div>
        <div v-for="(item, index) in candidatos" :key="item">
          <hr style="clear: both" />
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="nombre_candidato" class="form-label">Nombres</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre_candidato"
                  aria-describedby="emailHelp"
                  v-model="item.nombre_candidato"
                  required
                />
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="apellido_candidato" class="form-label"
                  >Apellidos</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="apellido_candidato"
                  aria-describedby="emailHelp"
                  v-model="item.apellido_candidato"
                  required
                />
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <!-- <div class="col">
              <div class="mb-3">
                <label for="tipo_documento_candidato" class="form-label"
                  >Tipo de documento</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="tipo_documento_candidato"
                  aria-describedby="emailHelp"
                  v-model="item.tipo_documento_candidato"
                  required
                />
              </div>
            </div> -->
            <div class="col">
              <SearchList
                nombreCampo="Tipo de Identificación: *"
                @getTipoIdentificacion="getTipoIdentificacion"
                @setTipoIdentificacion="setTipoIdentificacion"
                eventoCampo="getTipoIdentificacion"
                nombreItem="des_tip"
                :ordenCampo="6"
                :index="index"
                :registros="tiposIdentificacion"
                placeholder="Seleccione una opción"
                :consulta="candidatos[index].consulta_tipo_identificacion"
              />
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="numero_documento_candidato" class="form-label"
                  >Número de documento</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="numero_documento_candidato"
                  aria-describedby="emailHelp"
                  v-model="item.numero_documento_candidato"
                  @input="
                    item.numero_documento_candidato = validarNumero(
                      item.numero_documento_candidato
                    )
                  "
                  required
                />
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="celular_candidato" class="form-label"
                  >Celular</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="celular_candidato"
                  aria-describedby="emailHelp"
                  v-model="item.celular_candidato"
                  @input="
                    item.celular_candidato = validarNumero(
                      item.celular_candidato
                    )
                  "
                  required
                />
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="correo_candidato" class="form-label"
                  >Correo electrónico</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="correo_candidato"
                  aria-describedby="emailHelp"
                  v-model="item.correo_candidato"
                  required
                />
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
          </div>
          <div class="row float-end mb-3" v-if="candidatos.length > 0">
            <div class="col">
              <button
                type="button"
                class="btn btn-danger"
                @click="eliminarCandidato(index)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row float-start">
          <div class="col">
            <button
              type="button"
              class="btn btn-warning"
              @click="agregarCandidato"
            >
              <i class="bi bi-person-plus"></i>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button type="submit" class="btn btn-success">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useConfig } from "../composables/token"; // Asegúrate de ajustar la ruta
import SearchList from "./SearchList.vue";
import Tiptap from "./Tiptap.vue";

// import { Alerts } from "../composables/Alerts";
import { useRoute } from "vue-router";

const { URL_API, configHeader } = useConfig();
const route = useRoute();
// const { showAlert } = Alerts();

let mensaje_error = ref("¡Este campo debe ser diligenciado!");
let radicado = ref("");
let radicador = ref("");
let nit = ref("");
let razon_social = ref("");
let actividad_ciiu = ref("");
let sector_economico = ref("");
let fecha_inicio = ref("");
let fecha_fin = ref("");
let departamentos = ref([]);
let municipios = ref([]);
let lineas_servicio = ref([]);
let linea_servicio_id = ref("");
let consulta_linea_servicio = ref("");
let cargos = ref([]);
let tiposIdentificacion = ref([]);
let consulta_departamento_prestacion_servicio = ref("");
let departamento_prestacion_servicio_id = ref("");
let consulta_municipio_prestacion_servicio = ref([]);
let ciudad_prestacion_servicio_id = ref("");
let nombre_contacto = ref("");
let telefono_contacto = ref("");
let cargo_contacto = ref("");
let motivos_servicio = ref([]);
let motivo_servicio_id = ref("");
let consulta_motivo_servicio = ref("");
let cantidad_contrataciones = ref("");
let consulta_cargo_solicitado = ref("");
let cargo_solicitado_id = ref("");
let funciones_cargo = ref("");
let salario = ref("");
// let consulta_textohtml = ref("");
let array_lista_recomendaciones = ref([]);
let array_lista_examenes = ref([]);
const params_id = route.params.id;
let candidatos = ref([
  {
    nombre_candidato: "",
    apellido_candidato: "",
    tipo_identificacion_id: "",
    consulta_tipo_identificacion: "",
    numero_documento_candidato: "",
    celular_candidato: "",
    correo_candidato: "",
  },
]);
let datoscliente = ref([{}]);

lineaServicio();
getDepartamentos(43);
getMotivosServicio();
getCargos();
getDatosCliente();

function save() {
  axios
    .post(URL_API.value + "api/v1/ordenservicio", crearObjeto(), configHeader())
    .then(function (result) {
      console.log(result.data);
    });
}

function getDatosCliente() {
  axios
    .get(URL_API.value + "api/v1/clienteservicio", configHeader())
    .then(function (result) {
      datoscliente = result.data;
      nit.value = datoscliente.nit;
      razon_social.value = datoscliente.razon_social;
      actividad_ciiu.value = datoscliente.actividad_ciiu_id;
      sector_economico.value = datoscliente.sector_economico;
    });
}

function getDepartamentos(id) {
  axios
    .get(URL_API.value + "api/v1/departamentos/" + id, configHeader())
    .then(function (result) {
      departamentos.value = result.data;
    });
}

function getMunicipios(item, ordenCampo, index) {
  setLabelDepartamento(item, ordenCampo, index);
  axios
    .get(URL_API.value + "api/v1/municipios/" + item.id, configHeader())
    .then(function (result) {
      municipios.value = result.data;
    });
}
function setLabelDepartamento(item = null, campo = null) {
  if (item != null) {
    switch (campo) {
      case 1:
        consulta_departamento_prestacion_servicio.value = item.nombre;
        departamento_prestacion_servicio_id.value = item.id;
        break;
    }
  }
}
function setMunicipios(item, campo) {
  if (item != null) {
    switch (campo) {
      case 1:
        ciudad_prestacion_servicio_id.value = item.id;
        consulta_municipio_prestacion_servicio.value = item.nombre;
        break;
    }
  }
}

function getMotivosServicio(item = null) {
  console.log(item);
  if (item) {
    motivo_servicio_id.value = item.id;
    consulta_motivo_servicio.value = item.nombre;
  }
  axios
    .get(URL_API.value + "api/v1/motivoservicio", configHeader())
    .then(function (result) {
      motivos_servicio = result.data;
    });
}

function getCargos(item = null) {
  if (item) {
    cargo_solicitado_id.value = item.id;
    consulta_cargo_solicitado.value = item.nombre;
    getRecomendaciones(item.subcategoria_cargo_id);
    getExamenes(item.subcategoria_cargo_id);
  }
  axios
    .get(URL_API.value + "api/v1/listacargoscompleta", configHeader())
    .then(function (result) {
      cargos = result.data;
    });
}
function getRecomendaciones(id) {
  axios
    .get(URL_API.value + "api/v1/listarecomendaciones/" + id, configHeader())
    .then(function (result) {
      array_lista_recomendaciones = result.data;
    });
}
function getExamenes(id) {
  axios
    .get(URL_API.value + "api/v1/listaexamenes/" + id, configHeader())
    .then(function (result) {
      array_lista_examenes = result.data;
    });
}
function lineaServicio(item = null) {
  if (item != null) {
    consulta_linea_servicio.value = item.nombre;
    linea_servicio_id.value = item.id;
  }
  axios
    .get(URL_API.value + "api/v1/tiposserviofi", configHeader())
    .then(function (result) {
      lineas_servicio = result.data;
    });
}

function agregarCandidato() {
  candidatos.value.push({
    nombre_candidato: "",
    apellido_candidato: "",
    tipo_identificacion_id: "",
    consulta_tipo_identificacion: "",
    numero_documento_candidato: "",
    celular_candidato: "",
    correo_candidato: "",
  });
}

function eliminarCandidato(index) {
  candidatos.value.splice(index, 1);
}


function crearObjeto() {
  let formulario = {
    nit: nit.value,
    razon_social: razon_social.value,
    actividad_ciiu_id: actividad_ciiu.value,
    fecha_inicio: fecha_inicio.value,
    fecha_fin: fecha_fin.value,
    linea_servicio_id: linea_servicio_id.value,
    ciudad_prestacion_servicio_id: ciudad_prestacion_servicio_id.value,
    departamento_prestacion_servicio_id:
      departamento_prestacion_servicio_id.value,
    nombre_contacto: nombre_contacto.value,
    telefono_contacto: telefono_contacto.value,
    cargo_contacto: cargo_contacto.value,
    motivo_servicio_id: motivo_servicio_id.value,
    consulta_motivo_servicio: consulta_motivo_servicio.value,
    cantidad_contrataciones: cantidad_contrataciones.value,
    cargo_solicitado_id: cargo_solicitado_id.value,
    consulta_cargo_solicitado: consulta_cargo_solicitado.value,
    funciones_cargo: funciones_cargo.value,
    salario: salario.value,
    candidatos: candidatos.value,
  };
  return formulario;
}
function getTipoIdentificacion() {
  if (tiposIdentificacion.value == "") {
    axios
      .get(URL_API.value + "api/v1/tipodocumentolista", configHeader())
      .then(function (result) {
        tiposIdentificacion.value = result.data;
      });
  }
}

function setTipoIdentificacion(item = null, campo = null, index = null) {
  if (item != null) {
    switch (campo) {
      case 1:
        this.candidatos[index].tipo_identificacion_id = item.cod_tip;
        this.candidatos[index].consulta_tipo_identificacion = item.des_tip;
        break;
    }
  }
}
function validarNumero(valor) {
  return valor.replace(/\D/g, "");
}
</script>
<style scoped>
.card {
  margin: auto;
  padding: 20px;
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

.lista-multiple {
  border: 0.7px rgba(207, 205, 205, 0.815) solid;
  border-radius: 7px;
  position: relative;
  padding: 10px;
  margin-bottom: 10px;
}

#seccion,
.orientacion {
  border: solid #d5dbdb 0.5px;
  padding: 30px;
  border-radius: 10px;
  margin: 10px;
}

#btnMenu {
  background-color: rgb(28, 146, 77);
  color: white;
}
</style>
