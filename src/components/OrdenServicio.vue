<template>
  <div class="container">
    <h2>Orden de servicio</h2>
    <div class="card p-3">
      <form class="was-validated" @submit.prevent="save()">
        <div class="row">
          <div
            class="col-6 mb-3 text-start"
            style="margin-top: 50px; left: 0px"
          >
            <ModalCancelaServicio
              @motivoCancelacion="motivoCancelacion"
              @getMotivosCancelacionServicio="getMotivosCancelacionServicio"
              :motivos_cancelacion_servicio="motivos_cancelacion_servicio"
              :motivo_cancelacion_id="motivo_cancelacion_id"
              titulo_encabezado="Cancelación servicio"
              titulo_boton="Cancelar servicio"
              :index="0"
              :tipo="1"
            />
          </div>
          <div class="col-6" v-if="route.params.id != '' && asignacion_manual">
            <SearchList
              nombreCampo="Estado servicio: *"
              @getEstadoServicio="getEstadoServicio"
              eventoCampo="getEstadoServicio"
              nombreItem="nombre"
              :ordenCampo="1"
              :index="1"
              :registros="estados_servicio"
              placeholder="Seleccione una opción"
              :consulta="estado_servicio"
            />
          </div>
        </div>
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
              @setClienteServicio="setClienteServicio"
              :valida_campo="route.params.id == ''"
            />
          </div>
          <div
            class="col-6 mb-3"
            id="no-sede"
            tabindex="0"
            v-if="asignacion_manual"
          >
            <SearchList
              nombreCampo="Responsable"
              nombreItem="nombres"
              :registros="lista_asignacion"
              placeholder="Seleccione una opción"
              :consulta="consulta_responsable"
              @setResponsable="setResponsable"
              eventoCampo="setResponsable"
            />
          </div>
          <div class="col-6" v-if="route.params.id != '' && !asignacion_manual">
            <SearchList
              nombreCampo="Estado servicio: *"
              @getEstadoServicio="getEstadoServicio"
              eventoCampo="getEstadoServicio"
              nombreItem="nombre"
              :ordenCampo="1"
              :index="1"
              :registros="estados_servicio"
              placeholder="Seleccione una opción"
              :consulta="estado_servicio"
              :disabled="route.params.id != ''"
            />
          </div>
        </div>
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="fecha_inicio" class="form-label"
                >Fecha inicio solicitud: *</label
              >
              <input
                @keydown.prevent
                @click="abrirCalendario"
                type="date"
                class="form-control"
                id="fecha_inicio"
                aria-describedby="emailHelp"
                v-model="fecha_inicio"
                required
                :min="fecha_actual"
                :disabled="route.params.id != ''"
                @input="validaFecha()"
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="fecha_fin" class="form-label"
                >Fecha terminación solicitud: *</label
              >
              <input
                @keydown.prevent
                @click="abrirCalendario"
                type="date"
                class="form-control"
                id="fecha_fin"
                aria-describedby="emailHelp"
                v-model="fecha_fin"
                required
                :min="fecha_actual"
                @input="validaFecha()"
                :disabled="route.params.id != ''"
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
              nombreCampo="Linea de servicio: *"
              @lineaServicio="lineaServicio"
              eventoCampo="lineaServicio"
              nombreItem="nombre"
              :registros="lineas_servicio"
              placeholder="Seleccione una opción"
              :disabled="inhabilita_campo"
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
              :disabled="inhabilita_campo"
            />
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Ciudad de prestación del servicio: *"
              nombreItem="nombre"
              :registros="municipios"
              :ordenCampo="1"
              :consulta="consulta_municipio_prestacion_servicio"
              @setMunicipios="setMunicipios"
              :disabled="inhabilita_campo"
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
                disabled
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
                disabled
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
                disabled
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
                :id="'exampleRadios' + item.id"
                :value="item.id"
                v-model="motivo_servicio_id"
                required
                :disabled="inhabilita_campo"
              />
              <label class="form-check-label" :for="'exampleRadios' + item.id">
                {{ item.nombre }}
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mt-3">
            <label for="cantidad_contrataciones: *" class="form-label"
              >Cantidad contrataciones: *</label
            >
            <input
              type="text"
              class="form-control"
              id="cantidad_contrataciones"
              maxlength="2"
              aria-describedby="cantidad_contrataciones"
              v-model="cantidad_contrataciones"
              @input="
                cantidad_contrataciones = validarNumero(cantidad_contrataciones)
              "
              required
              :disabled="inhabilita_campo"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Cargo solicitado: *"
              nombreItem="cargo"
              :registros="cargos_cliente"
              :ordenCampo="1"
              :consulta="consulta_cargo_solicitado"
              @getCargos="getCargos"
              eventoCampo="getCargos"
              placeholder="Seleccione una opción"
              :disabled="inhabilita_campo"
            />
          </div>
        </div>
        <div class="row">
          <div class="row">
            <div class="col">
              <h5>Observaciones</h5>
            </div>
          </div>
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
              <label for="salario" class="form-label">Salario: *</label>
              <input
                type="text"
                class="form-control"
                id="salario"
                aria-describedby="emailHelp"
                v-model="salario"
                @input="salario = validarNumero(salario)"
                required
                :disabled="inhabilita_campo"
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="linea_servicio_id == 2">
          <h5>Carga masiva candidatos</h5>
          <div class="col">
            <div class="input-group">
              <input
                type="file"
                class="form-control"
                :id="'seleccionArchivos' + index"
                accept=".xls,.xlsx"
                @change="cargarArchivo($event, index)"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                :disabled="inhabilita_campo"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="deleteFile(index)"
                id="inputGroupFileAddon04"
              >
                Quitar archivo
              </button>
            </div>
          </div>
        </div>
        <hr style="clear: both" />
        <div>
          <div class="row">
            <h5>Candidatos</h5>
          </div>
          <div v-for="(item, index) in candidatos" :key="item">
            <div class="row">
              <div style="color: white">.</div>
              <h6 style="float: left; width: auto">
                Candidato {{ index + 1 }}
              </h6>
              <hr style="clear: both" />
              <div class="row">
                <div class="col">
                  <SearchList
                    nombreCampo="Tipo de Identificación: *"
                    @getTipoIdentificacion="getTipoIdentificacion"
                    @setTipoIdentificacion="setTipoIdentificacion"
                    eventoCampo="getTipoIdentificacion"
                    nombreItem="des_tip"
                    :ordenCampo="1"
                    :index="index"
                    :registros="tiposIdentificacion"
                    placeholder="Seleccione una opción"
                    :consulta="candidatos[index].consulta_tipo_identificacion"
                    :disabled="item.deshabilita_campo"
                  />
                </div>
                <div class="col">
                  <SearchList
                    nombreCampo="Estado candidato: *"
                    @getEstadosCandidato="getEstadosCandidato"
                    eventoCampo="getEstadosCandidato"
                    nombreItem="nombre"
                    :ordenCampo="1"
                    :index="index"
                    :registros="estados_candidato"
                    placeholder="Seleccione una opción"
                    :consulta="candidatos[index].estado_candidato"
                    :disabled="
                      item.deshabilita_campo &&
                      props.userlogued.tipo_usuario_id != 1
                    "
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="mt-3">
                  <label for="numero_documento_candidato" class="form-label"
                    >Número de documento: *</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="numero_documento_candidato"
                    aria-describedby="emailHelp"
                    v-model="item.numero_documento_candidato"
                    @input="
                      (item.numero_documento_candidato = validarNumero(
                        item.numero_documento_candidato
                      )),
                        confirmaDocumento(item, index)
                    "
                    required
                    :disabled="item.deshabilita_campo"
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="mt-3">
                  <label for="numero_documento_candidato" class="form-label"
                    >Confirma número de documento: *</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="numero_documento_candidato"
                    aria-describedby="emailHelp"
                    v-model="item.confirma_numero_documento_candidato"
                    @input="
                      (item.confirma_numero_documento_candidato = validarNumero(
                        item.confirma_numero_documento_candidato
                      )),
                        confirmaDocumento(item, index)
                    "
                    @focus="confirmaDocumento(item, index)"
                    required
                    :disabled="item.deshabilita_campo_documento"
                    :class="
                      error_documento_identidad[index]
                        ? 'is-invalid'
                        : 'input-success'
                    "
                  />
                  <div
                    :class="{
                      'invalid-feedback': error_documento_identidad[index],
                    }"
                  >
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label for="nombre_candidato" class="form-label"
                    >Nombres: *</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="nombre_candidato"
                    aria-describedby="nombres"
                    v-model="item.nombre_candidato"
                    required
                    :disabled="item.deshabilita_campo"
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label for="apellido_candidato" class="form-label"
                    >Apellidos: *</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="apellido_candidato"
                    aria-describedby="apellidos"
                    v-model="item.apellido_candidato"
                    required
                    :disabled="item.deshabilita_campo"
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
                    >Celular: *</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="celular_candidato"
                    aria-describedby="celular"
                    v-model="item.celular_candidato"
                    @input="
                      item.celular_candidato = validarNumero(
                        item.celular_candidato
                      )
                    "
                    required
                    :disabled="item.deshabilita_campo"
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label for="correo_candidato" class="form-label"
                    >Correo electrónico: *</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    id="correo_candidato"
                    aria-describedby="correo"
                    v-model="item.correo_candidato"
                    required
                    pattern="^[^\s@]+@[^\s@]+\..+$"
                    :disabled="item.deshabilita_campo"
                  />
                  <div class="invalid-feedback">
                    ¡Este campo debe ser diligenciado y con un formato válido!
                  </div>
                </div>
              </div>
            </div>
            <div class="row float mb-3" v-if="candidatos.length > 0">
              <div class="col text-start">
                <ModalCancelaServicio
                  @motivoCancelacion="motivoCancelacion"
                  @getMotivosCancelacionServicio="getMotivosCancelacionServicio"
                  :motivos_cancelacion_servicio="motivos_cancelacion_servicio"
                  :motivo_cancelacion_id="motivo_cancelacion_id"
                  titulo_encabezado="Cancelación candidato"
                  titulo_boton="Cancelar candidato"
                  :modal_id="'#mi-modal' + index"
                  :tipo="2"
                  :candidato="item"
                />
              </div>
              <div
                class="col"
                v-if="
                  route.params.id != '' && props.userlogued.tipo_usuario_id == 1
                "
              >
                <ModalCancelaServicio
                  @motivoCancelacion="motivoCancelacion"
                  @getMotivosCancelacionServicio="getMotivosCancelacionServicio"
                  :motivo_cancelacion_id="motivo_cancelacion_id"
                  titulo_encabezado="Bloquear candidato"
                  titulo_boton="Bloquear candidato"
                  :modal_id="'#mi-modal2' + index + 1 * 5"
                  :tipo="3"
                  :candidato="item"
                />
              </div>
              <div class="col text-end">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="eliminarCandidato(index)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <div style="color: white">.</div>
          </div>
        </div>
        <div class="row float-start" v-if="candidatos.length <= 98">
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
          <div
            class="col"
            v-if="
              route.params.id != '' &&
              boton_crear_seiya &&
              props.userlogued.tipo_usuario_id == 1
            "
          >
            <button
              type="button"
              @click="crearRadicadoSeiya()"
              class="btn btn-success"
            >
              Crear radicado seiya
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
import { ref, onMounted } from "vue";
import { watch } from "vue";
import axios from "axios";
import { useConfig } from "../composables/token"; // Asegúrate de ajustar la ruta
import SearchList from "./SearchList.vue";
import Tiptap from "./Tiptap.vue";
import { defineProps } from "vue";
import { Alerts } from "../composables/Alerts";
import { useRoute, useRouter } from "vue-router";
import * as XLSX from "xlsx";
import ModalCancelaServicio from "./ModalCancelaServicio.vue";

const { URL_API, configHeader } = useConfig();
const route = useRoute();
const router = useRouter();
const { showAlert, confirmAlert, confirmSaveAlert } = Alerts();

const props = defineProps({
  userlogued: { type: Object, default: () => {} },
});

let mensaje_error = ref("¡Este campo debe ser diligenciado!");
let radicado = ref("");
let radicador = ref("");
let nit = ref("");
let razon_social = ref("");
let cliente_id = ref("");
let actividad_ciiu = ref("");
let sector_economico = ref("");
let sector_economico_id = ref("");
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
let consulta_municipio_prestacion_servicio = ref("");
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
let asignacion_manual = ref(false);
let lista_asignacion = ref([]);
let array_lista_recomendaciones = ref([]);
let array_lista_examenes = ref([]);
let consulta_responsable = ref("");
let consulta_cliente = ref("");
let responsable_id = ref("");
let clientes = ref([]);
let params_id = ref(route.params.id);
let candidatos = ref([]);
let error_documento_identidad = ref([]);
let boton_crear_seiya = ref(false);
let fecha_actual = ref(false);
let inhabilita_campo = ref(false);
let estados_servicio = ref([]);
let estado_servicio_id = ref("");
let estados_candidato = ref([]);
let estado_servicio = ref("");
let motivos_cancelacion_servicio = ref([]);
let consulta_motivo_cancelacion = ref("");
let motivo_cancelacion_id = ref("");
let servicio_cancelado = ref("");
let cargos_cliente = ref([]);

watch(
  () => route.path,
  () => {
    if (route.params.id == "") {
      limpiarFormulario();
    }
  }
);

onMounted(() => {
  const hoy = new Date().toISOString().split("T")[0];
  fecha_actual.value = hoy;
  getMotivosCancelacionServicio();
}),
  lineaServicio();
getDepartamentos(43);
getMotivosServicio();

if (props.userlogued.tipo_usuario_id == 1) {
  getClienteServicio();
}
if (props.userlogued.tipo_usuario_id == 2 && route.params.id != "") {
  inhabilita_campo.value = true;
}
if (route.params.id != "") {
  ordenservicio(route.params.id);
} else {
  getDatosCliente();
}

function getCargoCliente(cliente_id) {
  axios
    .get(URL_API.value + "api/v1/cargoscliente/" + cliente_id, configHeader())
    .then(function (result) {
      cargos_cliente.value = result.data;
    });
}

function getEstadoServicio(item = null) {
  if (item != null) {
    estado_servicio.value = item.nombre;
    estado_servicio_id.value = item.id;
  }
  axios
    .get(URL_API.value + "api/v1/estadoservicio", configHeader())
    .then(function (result) {
      estados_servicio.value = result.data;
    });
}
function getEstadosCandidato(item = null, index) {
  if (item != null) {
    candidatos.value[index].estado_candidato_id = item.id;
    candidatos.value[index].estado_candidato = item.nombre;
  }
  axios
    .get(URL_API.value + "api/v1/estadocandidatoservicio", configHeader())
    .then(function (result) {
      estados_candidato.value = result.data;
    });
}

function cargarArchivo(event) {
  const archivo = event.target.files[0];
  if (!archivo) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const datosExcel = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    let datos;
    if (datosExcel.length > 1) {
      const headers = datosExcel[0]; // Primera fila como claves
      datos = datosExcel.slice(1).map((fila) => {
        let obj = {};
        headers.forEach((key, index) => {
          obj[key] = fila[index] || ""; // Evita valores undefined
        });
        return obj;
      });
    } else {
      datos = [];
    }

    candidatos.value = [];
    for (let i = 0; i < datos.length; i++) {
      if (datos[i].numero_identificacion == "") {
        continue;
      }
      candidatos.value.push({
        nombre_candidato: datos[i].nombres,
        apellido_candidato: datos[i].apellidos,
        celular_candidato: datos[i].celular,
        correo_candidato: datos[i].correo,
        tipo_identificacion_id: datos[i].tipo_identificacion_id,
        numero_documento_candidato: datos[i].numero_identificacion,
        confirma_numero_documento_candidato: datos[i].numero_identificacion,
        consulta_tipo_identificacion: datos[i].tipo_identificacion,
        registrado: 2,
      });
      error_documento_identidad.value[i] = false;
      mensaje_error.value = " ";
      if (i >= 99) {
        return;
      }
    }
  };

  reader.readAsArrayBuffer(archivo);
}

function motivoCancelacion(motivo, tipo, candidato) {
  let form = {
    motivo_cancelacion_id: motivo_cancelacion_id.value,
    descripcion_cancelacion: motivo,
  };
  if (tipo == 1) {
    confirmSaveAlert("¿Esta seguro de cancelar el servicio?", () => {
      axios
        .post(
          URL_API.value + "api/v1/cancelaservicio/" + route.params.id,
          form,
          configHeader()
        )
        .then(function (result) {
          showAlert(result.data.message, result.data.status);
        });
    });
  } else if (tipo == 2) {
    confirmSaveAlert("¿Esta seguro de cancelar el candidato?", () => {
      axios
        .post(
          URL_API.value +
            "api/v1/cancelacandidatoservicio/" +
            route.params.id +
            "/" +
            candidato.usuario_id,
          form,
          configHeader()
        )
        .then(function (result) {
          showAlert(result.data.message, result.data.status);
        });
    });
  } else if (tipo == 3) {
    console.log(candidato.numero_documento_candidato);
    console.log(candidato.nombre_candidato);
    console.log(candidato.apellido_candidato);
    candidato.motivo = motivo;
    console.log(motivo);
    axios
      .post(URL_API.value + "api/v1/listatrump", candidato, configHeader())
      .then(function (result) {
        showAlert(result.data.message, result.data.status);
      });
  }
}

function crearRadicadoSeiya() {
  let servicio = {
    id: route.params.id,
  };
  router.push({
    path: "/navbar/gestion-ingresos",
    state: servicio,
  });
}

function validaFecha() {
  if (fecha_inicio.value != "" && fecha_fin.value != "") {
    const fecha1 = new Date(fecha_inicio.value);
    const fecha2 = new Date(fecha_fin.value);
    if (fecha1.getTime() > fecha2.getTime()) {
      fecha_fin.value = "";
      confirmAlert(
        "Fecha terminación solicitud inválida",
        "La fecha terminación solicitud no puede ser menor a la fecha inicio solicitud",
        "error"
      );
    }
  }
}

function confirmaDocumento(item, index) {
  let documento = item.numero_documento_candidato;
  let confirma_documento = item.confirma_numero_documento_candidato;
  if (candidatos.value[index].tipo_identificacion_id != "") {
    item.deshabilita_campo_documento = false;
  }
  if (
    documento !== "" &&
    confirma_documento !== "" &&
    documento !== confirma_documento
  ) {
    error_documento_identidad.value[index] = true;
    mensaje_error.value = "¡Este campo debe ser diligenciado!";
  } else if (
    documento === confirma_documento &&
    item.tipo_identificacion_id != "" &&
    documento !== "" &&
    confirma_documento !== ""
  ) {
    const otrosCandidatos = candidatos.value.filter((_, i) => i !== index);
    if (
      otrosCandidatos.some(
        (array) =>
          array.confirma_numero_documento_candidato ===
          item.confirma_numero_documento_candidato
      )
    ) {
      candidatos.value[index].confirma_numero_documento_candidato = "";
      confirmAlert(
        "Candidato registrado",
        "La persona con número de documento " +
          item.numero_documento_candidato +
          " ya se encuentra en la lista de candidatos",
        "success"
      );
    } else {
      validaCandidato(
        item.numero_documento_candidato,
        index,
        item.tipo_identificacion_id,
        item
      );
      error_documento_identidad.value[index] = false;
      mensaje_error.value = " ";
    }
  }
}

function validaCandidato(documento, index, tipo_identificacion) {
  axios
    .get(
      URL_API.value +
        "api/v1/validacandidato/" +
        documento +
        "/" +
        index +
        "/" +
        tipo_identificacion,
      configHeader()
    )
    .then(function (result) {
      candidatoValidado(result.data);
    });
}

function candidatoValidado(data) {
  if (data.status == "error") {
    let indice = candidatos.value.findIndex(
      (candidato) =>
        candidato.confirma_numero_documento_candidato === data.documento
    );
    candidatos.value[indice].confirma_numero_documento_candidato = "";
    confirmAlert(data.titulo, data.message, data.status);
  }
  if (data.status == "success") {
    if (data.motivo == "1") {
      candidatos.value[data["usuario_id"].index].nombre_candidato =
        data["usuario_id"].nombres;
      candidatos.value[data["usuario_id"].index].apellido_candidato =
        data["usuario_id"].apellidos;
      candidatos.value[data["usuario_id"].index].celular_candidato =
        data["usuario_id"].celular;
      candidatos.value[data["usuario_id"].index].correo_candidato =
        data["usuario_id"].correo;
      candidatos.value[data["usuario_id"].index].usuario_id =
        data["usuario_id"].usuario_id;
      candidatos.value[data["usuario_id"].index].registrado = 1;
    }
  }
}

function save() {
  let error_campo = false;
  error_documento_identidad.value.forEach((element, index) => {
    if (element == true) {
      showAlert(
        "Por favor verifique los datos del candidato número " + (index + 1),
        "error"
      );
      error_campo = true;
    }
  });
  if (error_campo) {
    return;
  }
  let url = URL_API.value + "api/v1/ordenservicio";
  if (route.params.id != "") {
    url = URL_API.value + "api/v1/ordenservicio/" + route.params.id;
  }
  axios.post(url, crearObjeto(), configHeader()).then(function (result) {
    if (result.data.status == "success") {
      const rutaActual = route.path;
      const nuevosParametros = { ...rutaActual.params, id: result.data.id };
      router.replace({ ...rutaActual, params: nuevosParametros });
      boton_crear_seiya.value = true;
      confirmAlert(result.data.titulo, result.data.message, result.data.status);
    } else if (result.data.status == "error") {
      confirmAlert(result.data.titulo, result.data.message, result.data.status);
    }
  });
}

function abrirCalendario(event) {
  event.target.showPicker(); // Abre el selector de fecha
}

function getDatosCliente() {
  axios
    .get(URL_API.value + "api/v1/clienteservicio", configHeader())
    .then(function (result) {
      nit.value = result.data.nit;
      razon_social.value = result.data.razon_social;
      cliente_id.value = result.data.id;
      actividad_ciiu.value = result.data.actividad_ciiu;
      sector_economico.value = result.data.sector_economico;
      nombre_contacto.value = result.data.nombre_contacto;
      telefono_contacto.value = result.data.telefono_contacto;
      cargo_contacto.value = result.data.cargo_contacto;
      sector_economico_id.value = result.data.sector_economico_id;
      if (props.userlogued.tipo_usuario_id == 2) {
        getCargoCliente(result.data.id);
      }
    });
}

function ordenservicio(id) {
  axios
    .get(URL_API.value + "api/v1/ordenserviciobyid/" + id, configHeader())
    .then(function (result) {
      llenarFormulario(result.data);
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
    cargo_solicitado_id.value = item.cargo_id;
    consulta_cargo_solicitado.value = item.cargo;
    array_lista_recomendaciones.value = item.recomendaciones;
    array_lista_examenes.value = item.examenes;
    funciones_cargo.value = item.funcion_cargo;
  }
  return cargos_cliente.value;
}
function getRecomendaciones(id) {
  axios
    .get(URL_API.value + "api/v1/listarecomendaciones/" + id, configHeader())
    .then(function (result) {
      array_lista_recomendaciones.value = result.data;
    });
}
function getExamenes(id) {
  axios
    .get(URL_API.value + "api/v1/listaexamenes/" + id, configHeader())
    .then(function (result) {
      array_lista_examenes.value = result.data;
    });
}
function lineaServicio(item = null) {
  if (item != null) {
    consulta_linea_servicio.value = item.nombre;
    linea_servicio_id.value = item.id;
    if (item.id == 3 || item.id == 4) {
      candidatos.value = [];
    } else if (item.id == 2) {
      agregarCandidato();
    }
    asignaciónServicio(item);
  }
  axios
    .get(URL_API.value + "api/v1/tiposserviofi", configHeader())
    .then(function (result) {
      lineas_servicio.value = result.data;
    });
}

function asignaciónServicio(item) {
  axios
    .post(URL_API.value + "api/v1/asignacionServicio", item, configHeader())
    .then(function (result) {
      asignacion_manual.value = result.data.campo["manual"] == 1 ? true : false;
      lista_asignacion.value = result.data.usuarios;
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
    confirma_numero_documento_candidato: "",
    usuario_id: "",
    registrado: 0,
    estado_candidato: "",
    estado_candidato_id: "",
    deshabilita_campo_documento: true,
    deshabilita_campo: false,
    candidato_cancelado: "",
  });
  error_documento_identidad.value.push(true);
}

function eliminarCandidato(index) {
  candidatos.value.splice(index, 1);
  error_documento_identidad.value.splice(index, 1);
}

function crearObjeto() {
  let formulario = {
    nit: nit.value,
    razon_social: razon_social.value,
    cliente_id: cliente_id.value,
    actividad_ciiu: actividad_ciiu.value,
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
    sector_economico: sector_economico_id.value,
    responsable_id: responsable_id.value,
    responsable: consulta_responsable.value,
    estado_servicio_id: estado_servicio_id.value,
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
    candidatos.value[index].deshabilita_campo_documento = false;
    switch (campo) {
      case 1:
        candidatos.value[index].tipo_identificacion_id = item.cod_tip;
        candidatos.value[index].consulta_tipo_identificacion = item.des_tip;
        break;
    }
  }
}
function validarNumero(valor) {
  return valor.replace(/\D/g, "");
}

function setResponsable(item = null) {
  if (item != null) {
    consulta_responsable.value = item.nombres;
    responsable_id.value = item.usuario_id;
  }
}

function getClienteServicio() {
  axios
    .get(URL_API.value + "api/v1/listaclienteservicio", configHeader())
    .then(function (result) {
      clientes.value = result.data;
    });
}

function setClienteServicio(item) {
  axios
    .get(
      URL_API.value + "api/v1/clienteresponsableservicio/" + item.id,
      configHeader()
    )
    .then(function (result) {
      nit.value = result.data.nit;
      cliente_id.value = result.data.id;
      razon_social.value = result.data.razon_social;
      actividad_ciiu.value = result.data.actividad_ciiu;
      sector_economico.value = result.data.sector_economico;
      sector_economico_id.value = result.data.sector_economico_id;
      nombre_contacto.value = result.data.nombre_contacto;
      telefono_contacto.value = result.data.telefono_contacto;
      cargo_contacto.value = result.data.cargo_contacto;
      getCargoCliente(result.data.id);
    });
}

function llenarFormulario(item) {
  nombre_contacto.value = item.nombre_contacto;
  telefono_contacto.value = item.telefono_contacto;
  cargo_contacto.value = item.cargo_contacto;
  nit.value = item.nit;
  razon_social.value = item.razon_social;
  radicado.value = item.radicado;
  radicador.value = item.radicador;
  fecha_inicio.value = item.fecha_inicio;
  fecha_fin.value = item.fecha_fin;
  linea_servicio_id.value = item.linea_servicio_id;
  consulta_linea_servicio.value = item.linea_servicio;
  consulta_municipio_prestacion_servicio.value =
    item.ciudad_prestacion_servicio;
  ciudad_prestacion_servicio_id.value = item.ciudad_prestacion_servicio_id;
  departamento_prestacion_servicio_id.value =
    item.departamento_prestacion_servicio_id;
  consulta_departamento_prestacion_servicio.value =
    item.departamento_prestacion_servicio;
  motivo_servicio_id.value = item.motivo_servicio_id;
  consulta_motivo_servicio.value = item.motivo_servicio;
  cantidad_contrataciones.value = item.cantidad_contrataciones;
  cargo_solicitado_id.value = item.cargo_solicitado_id;
  consulta_cargo_solicitado.value = item.cargo_solicitado;
  funciones_cargo.value = item.funciones_cargo;
  actividad_ciiu.value = item.ciiu;
  salario.value = item.salario;
  sector_economico.value = item.sector_economico;
  estado_servicio.value = item.estado_servicio;
  estado_servicio_id.value = item.estado_servicio_id;
  if (item.candidatos.length > 0) {
    for (let i = 0; i < item.candidatos.length; i++) {
      error_documento_identidad.value[i] = false;
      candidatos.value.push(item.candidatos[i]);
      candidatos.value[i].registrado = 1;
      candidatos.value[i].deshabilita_campo = true;
      candidatos.value[i].deshabilita_campo_documento = true;
    }
  }
  getRecomendaciones(item.subcategoria_cargo_id);
  getExamenes(item.subcategoria_cargo_id);
  boton_crear_seiya.value = true;
}

function limpiarFormulario() {
  radicado.value = "";
  radicador.value = "";
  nit.value = "";
  razon_social.value = "";
  cliente_id.value = "";
  actividad_ciiu.value = "";
  sector_economico.value = "";
  sector_economico_id.value = "";
  fecha_inicio.value = "";
  fecha_fin.value = "";
  municipios.value = [];
  lineas_servicio.value = [];
  linea_servicio_id.value = "";
  consulta_linea_servicio.value = "";
  cargos.value = [];
  tiposIdentificacion.value = [];
  consulta_departamento_prestacion_servicio.value = "";
  departamento_prestacion_servicio_id.value = "";
  consulta_municipio_prestacion_servicio.value = "";
  ciudad_prestacion_servicio_id.value = "";
  nombre_contacto.value = "";
  telefono_contacto.value = "";
  cargo_contacto.value = "";
  motivos_servicio.value = [];
  motivo_servicio_id.value = "";
  consulta_motivo_servicio.value = "";
  cantidad_contrataciones.value = "";
  consulta_cargo_solicitado.value = "";
  cargo_solicitado_id.value = "";
  funciones_cargo.value = "";
  salario.value = "";
  asignacion_manual.value = false;
  lista_asignacion.value = [];
  array_lista_recomendaciones.value = [];
  array_lista_examenes.value = [];
  consulta_responsable.value = "";
  consulta_cliente.value = "";
  responsable_id.value = "";
  clientes.value = [];
  params_id.value = "";
  candidatos.value = [];
  boton_crear_seiya.value = false;
}

function getMotivosCancelacionServicio(item = null, index) {
  if (item != null) {
    console.log(index);
    if (index > 0) {
      index = index - 1;
      candidatos.value[index].candidato_cancelado = item.id;
    } else if (index == 0) {
      servicio_cancelado.value = item.id;
    }
    motivo_cancelacion_id.value = "" + item.id;
    consulta_motivo_cancelacion.value = item.nombre;
  }
  axios
    .get(URL_API.value + "api/v1/motivocancelaservicio", configHeader())
    .then(function (result) {
      motivos_cancelacion_servicio.value = result.data;
    });
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

.is-invalid {
  border-color: red !important;
  box-shadow: 0px 0px 2px 3px rgba(221, 43, 43, 0.2) !important;
}

.input-success {
  border-color: green !important;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875em;
  margin-top: 0.25rem;
}
</style>
