<template>
  <div class="container">
    <form class="was-validated" @submit.prevent="save()">
      <h2>Cargos cliente</h2>
      <div class="row">
        <div
          class="col-6 mb-3"
          id="no-sede"
          tabindex="0"
          v-if="props.userlogued.tipo_usuario_id == 1"
        >
          <SearchList
            nombreCampo="Cliente: *"
            nombreItem="razon_social"
            :registros="clientes"
            placeholder="Seleccione una opción"
            :consulta="consulta_cliente"
            @getClienteServicio="getClienteServicio"
            eventoCampo="getClienteServicio"
            :valida_campo="$route.params.id == ''"
          />
          <!-- @setClienteServicio="setClienteServicio" -->
        </div>
      </div>
      <div class="row">
        <div class="row mt-4" v-if="cargos_cliente.length > 0">
          <label for="exampleInputEmail1" class="form-label"
            >Cargos del cliente:</label
          >
          <div class="col">
            <div class="col-12 lista-multiple">
              <button
                style="margin: 5px"
                class="btn btn-success btn-sm"
                v-for="(item, index) in cargos_cliente"
                :key="index"
                type="button"
              >
                <!-- {{ item.nombre }} -->
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    class="btn btn-sm adjunto"
                    @click.prevent="verCargo(item, index)"
                  >
                    <!-- @click="editarCorreo(item, index, 1)" -->
                    {{ item.cargo }}
                  </button>
                  <button
                    type="button"
                    class="btn adjunto btn-sm"
                    @click="eliminaCargoCliente(index)"
                  >
                    <i class="bi bi-x" @click="eliminaCargoCliente(index)"></i>
                  </button>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="ver_cargos">
        <div
          class="row"
          id="contenedor-select"
          v-for="(item, index) in cargos2"
          :key="item.id"
        >
          <div class="row mb-4">
            <div class="col">
              <label class="form-check-label" for="flexSwitchCheckChecked"
                >Por favor seleccione el tipo de cargo:</label
              >
            </div>
            <div style="display: flex">
              <div
                class="form-check m-2"
                v-for="(item, index2) in tipo_cargos"
                :key="index2"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  @click="getSubCategoriaCargo(item.id, index)"
                  :value="item.id"
                  v-model="tipo_cargo[index]"
                  :name="'radio' + index"
                  id="radio3"
                />
                {{ item.nombre }}
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <label for="exampleInputEmail1" class="form-label"
                >Categoria cargo: *</label
              >
            </div>
            <div class="col">
              <label for="exampleInputEmail1" class="form-label"
                >Cargo: *</label
              >
            </div>
            <div class="col">
              <label for="exampleInputEmail1" class="form-label"
                >Riesgo del cargo* (ARL):</label
              >
            </div>
          </div>
          <div class="col">
            <SearchList
              nombreItem="nombre"
              :registros="arry_subcategoria_cargos[index]"
              :consulta="consulta_subcategoria_cargos[index]"
              eventoCampo="getListaCargos"
              :index="index"
              :valida_campo="false"
              @getListaCargos="getListaCargos"
              placeholder="Seleccionar"
            />
          </div>
          <div class="col">
            <SearchList
              nombreItem="nombre"
              :registros="array_lista_cargos[index]"
              :consulta="consulta_lista_cargos[index]"
              eventoCampo="getExamenesRecomendaciones"
              @getExamenesRecomendaciones="getExamenesRecomendaciones"
              :index="index"
              :valida_campo="false"
              placeholder="Seleccionar"
            />
          </div>
          <div class="col">
            <SearchList
              eventoCampo="getRiesgosLaborales2"
              :index="index"
              :valida_campo="false"
              nombreItem="nombre"
              :registros="riesgos"
              @getRiesgosLaborales2="getRiesgosLaborales2"
              placeholder="Seleccionar"
              :consulta="consulta_riesgo_laboral[index]"
            />
          </div>
          <div class="row mt-4">
            <label for="exampleInputEmail1" class="form-label"
              >Funciones del cargo:</label
            >
            <div class="col">
              <EditorTextoHtml
                :consulta="consulta_textohtml[index]"
                :index="index"
                @retornoTexto="retornoTexto"
                :showToolbar="true"
              />
            </div>
            <!-- <div class="col-1 trash">
          <i
            class="bi bi-trash-fill"
            v-if="index > 0"
            @click="deleteDynamic(cargos2, index, 'identificador')"
          ></i>
        </div> -->
          </div>
          <div class="row">
            <div class="col-6">
              <SearchList
                nombreCampo="Exámenes médicos: *"
                eventoCampo="getListaExamenesCompleta"
                :index="index"
                :valida_campo="false"
                nombreItem="nombre"
                :registros="lista_examenes"
                @getListaExamenesCompleta="getListaExamenesCompleta"
                placeholder="Seleccionar"
                :consulta="examen_medico"
              />
            </div>
          </div>
          <div class="row mt-4" v-if="array_lista_examenes.length > 0">
            <label for="exampleInputEmail1" class="form-label">Exámenes:</label>
            <div class="col">
              <div class="col-12 lista-multiple">
                <button
                  style="margin: 5px"
                  class="btn btn-success btn-sm"
                  v-for="(item, index2) in array_lista_examenes[index]"
                  :key="index2"
                  type="button"
                >
                  <!-- {{ item.nombre }} -->
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <!-- @click="editarCorreo(item, index, 1)" -->
                    <button type="button" class="btn btn-sm adjunto">
                      {{ item.nombre }}
                    </button>
                    <button type="button" class="btn adjunto btn-sm">
                      <i class="bi bi-x" @click="eliminaExamen(index2)"></i>
                    </button>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div
            class="row"
            v-for="(item, index3) in array_lista_recomendaciones[index]"
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
          <hr v-if="cargos2.length > 1" />
        </div>
      </div>
      <div class="row" v-if="ver_cargos">
        <div class="col">
          <button
            type="submit"
            class="btn btn-sm btn-warning mt-4 mb-4"
            @click.prevent="agregarCargo()"
          >
            Agregar Cargo
          </button>
        </div>
        <div class="col">
          <button
            type="submit"
            class="btn btn-sm btn-warning mt-4 mb-4"
            @click.prevent="actualizarCargo()"
            v-if="actualiza_cargo"
          >
            Actualizar Cargo
          </button>
        </div>
        <div class="col" v-if="cargos_cliente.length > 0">
          <button type="submit" class="btn btn-sm btn-success mt-4 mb-4">
            Guardar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { defineProps } from "vue";
import { useConfig } from "../composables/token"; // Asegúrate de ajustar la ruta
import SearchList from "./SearchList.vue";
import EditorTextoHtml from "./EditorTextoHtml.vue";
import { Alerts } from "../composables/Alerts";

const { showAlert } = Alerts();
const { URL_API, configHeader } = useConfig();

const props = defineProps({
  userlogued: { type: Object, default: () => {} },
});

let clientes = ref([]);
let tipo_cargos = ref([]);
let tipo_cargo = ref([]);
let arry_subcategoria_cargos = ref([]);
let consulta_subcategoria_cargos = ref([]);
let categoria_cargo_id = ref("");
let array_lista_cargos = ref([]);
let consulta_lista_cargos = ref([]);
let consulta_riesgo_laboral = ref([]);
let consulta_textohtml = ref([]);
let array_lista_recomendaciones = ref([]);
let riesgos = ref([]);
let lista_examenes = ref([]);
let actividades_ciiu = ref([]);
let riesgos_laborales = ref([]);
let riesgo_laboral = ref("");
let examen_medico = ref("");
let cargos_cliente = ref([]);
let cliente_id = ref("");
let ver_cargos = ref(false);
let actualiza_cargo = ref(false);
let index_cargo = ref("");
let cargos2 = ref([
  {
    cargo: "",
    cargo_id: "",
    examenes: [],
    recomendaciones: [],
    funcion_cargo: "",
    riesgo_laboral_id: "",
  },
]);
let array_lista_examenes = ref([]);
let consulta_cliente = ref("");

getCategoriaCargo();
getRiesgosLaborales();

function verCargo(item, index) {
  index_cargo.value = index;
  actualiza_cargo.value = true;
  this.tipo_cargo[0] = item.tipo_cargo_id;
  this.categoria_cargo_id = item.categoria_cargo_id;
  this.consulta_subcategoria_cargos[0] = item.categoria;
  this.consulta_lista_cargos[0] = item.cargo;
  this.consulta_textohtml[0] = item.funcion_cargo;
  this.consulta_riesgo_laboral[0] = item.riesgo_laboral;
  this.array_lista_examenes[0] = item.examenes;
  this.array_lista_recomendaciones[0] = item.recomendaciones;
}

function agregarCargo() {
  if (
    !cargos_cliente.value.some(
      (array) => array.cargo === cargos2.value[0].cargo
    )
  ) {
    cargos_cliente.value.push(JSON.parse(JSON.stringify(cargos2.value[0])));
    showAlert("El cargo se añadió exitosamente.", "success");
  } else {
    showAlert("Este cargo ya ha sido añadido.", "error");
  }
}

function actualizarCargo() {
  const index = cargos_cliente.value.findIndex(
    (item) => item.id_cargo === cargos2.value[0].id_cargo
  );

  if (index !== -1) {
    cargos_cliente.value.splice(
      index_cargo,
      1,
      JSON.parse(JSON.stringify(cargos_cliente.value[0]))
    );
    showAlert("El cargo se actualizó exitosamente.", "success");
    actualiza_cargo.value = false;
  }
}

function eliminaExamen(index) {
  array_lista_examenes.value[0].splice(index, 1);
}

function eliminaCargoCliente(index) {
  cargos_cliente.value.splice(index, 1);
}

function getClienteServicio(item = null) {
  if (item != null) {
    getActividadesCiiu(item.codigo_ciiu_id);
    ver_cargos.value = true;
    cliente_id.value = item.id;
    getCargoCliente(cliente_id.value);
  } else {
    ver_cargos.value = false;
  }
  axios
    .get(URL_API.value + "api/v1/listaclienteservicio", configHeader())
    .then(function (result) {
      clientes.value = result.data;
    });
}

function getCargoCliente(cliente_id) {
  axios
    .get(URL_API.value + "api/v1/cargoscliente/" + cliente_id, configHeader())
    .then(function (result) {
      cargos_cliente.value = result.data;
    });
}

function getCategoriaCargo() {
  axios
    .get(URL_API.value + "api/v1/categoriacargo", configHeader())
    .then(function (result) {
      tipo_cargos.value = result.data;
    });
}

function retornoTexto(index, texto) {
  cargos2.value[index].funcion_cargo = texto;
  consulta_textohtml.value[index] = texto;
}

function getListaCargos(item = null, index = null) {
  if (item != null) {
    categoria_cargo_id.value = item.id;
    consulta_subcategoria_cargos.value[index] = item.nombre;
    axios
      .get(URL_API.value + "api/v1/listacargos/" + item.id, configHeader())
      .then(function (result) {
        array_lista_cargos.value.splice(index, 1, result.data);
      });
  }
}

function getExamenesRecomendaciones(item = null, index = null) {
  if (index != null) {
    cargos2.value[index].cargo_id = item.id;
    cargos2.value[index].cargo = item.nombre;
    consulta_lista_cargos.value[index] = item.nombre;
  }
  getListaRecomendaciones(index);
  getListaExamenes(index);
}

function getSubCategoriaCargo(id, index = null) {
  actualiza_cargo.value = false;
  if (index != null) {
    if (cargos2.value[index].cargo_id != "") {
      consulta_subcategoria_cargos.value[index] = " ";
      consulta_lista_cargos.value[index] = " ";
      cargos2.value[index].cargo_id = "";
    }

    array_lista_cargos.value[index] = [];
    arry_subcategoria_cargos.value[index] = [];
    array_lista_examenes.value[index] = [];
    cargos2.value[index].examenes = [];
  }

  axios
    .get(URL_API.value + "api/v1/subcategoriacargo/" + id, configHeader())
    .then(function (result) {
      arry_subcategoria_cargos.value.splice(index, 1, result.data);
    });
}
function getListaExamenes(index = null) {
  if (index != null) {
    axios
      .get(
        URL_API.value + "api/v1/listaexamenes/" + categoria_cargo_id.value,
        configHeader()
      )
      .then(function (result) {
        array_lista_examenes.value.splice(index, 1, result.data);
        cargos2.value[index].examenes = result.data;
      });
  }
}
function getListaRecomendaciones(index = null) {
  if (index != null) {
    axios
      .get(
        URL_API.value +
          "api/v1/listarecomendaciones/" +
          categoria_cargo_id.value,
        configHeader()
      )
      .then(function (result) {
        array_lista_recomendaciones.value.splice(index, 1, result.data);
        cargos2.value[index].recomendaciones = result.data;
      });
  }
}
function getListaExamenesCompleta(item = null) {
  if (
    item != null &&
    !array_lista_examenes.value[0].some((array) => array.nombre === item.nombre)
  ) {
    array_lista_examenes.value[0].push(item);
  }
  axios
    .get(URL_API.value + "api/v1/listaexamenes", configHeader())
    .then(function (result) {
      lista_examenes.value = result.data;
    });
}

function getActividadesCiiu(item = null) {
  var id = "";
  if (item != null) {
    id = item;
  }
  axios
    .get(URL_API.value + "api/v1/actividadciiu/" + id, configHeader())
    .then(function (result) {
      actividades_ciiu.value = result.data.data;
    });
}

function getRiesgosLaborales(item = null, index = null) {
  if (item != null && index == null) {
    riesgo_laboral.value = item.id;
  }
  if (riesgos_laborales.value == "") {
    axios
      .get(URL_API.value + "api/v1/riesgolaboral", configHeader())
      .then(function (result) {
        riesgos_laborales.value = result.data;
      });
  }
}

function getRiesgosLaborales2(item = null, index = null) {
  if (item != null && index != null) {
    cargos2.value[index].riesgo_laboral_id = item.id;
    consulta_riesgo_laboral.value[index] = item.nombre;
  }
  riesgos.value = [];
  var riesgo = "";
  actividades_ciiu.value.forEach(function (item) {
    riesgos_laborales.value.forEach(function (item2) {
      if (item.codigo_actividad.split("")[0] == item2.id) {
        if (riesgo != item2.nombre) {
          riesgos.value.push({ id: item2.id, nombre: item2.nombre });
          riesgo = item2.nombre;
        }
      }
    });
  });
}

function save() {
  axios
    .post(
      URL_API.value + "api/v1/cargoscliente/" + cliente_id.value,
      cargos_cliente.value,
      configHeader()
    )
    .then(function (result) {
      showAlert(result.data.message, result.data.status);
    });
}
</script>
<style scoped>
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
}

.adjunto {
  white-space: nowrap;
  /* margin-bottom: 10px; */
  /* background-color: #239b56; */
  color: rgb(255, 255, 255);
  width: 100%;
}
</style>
