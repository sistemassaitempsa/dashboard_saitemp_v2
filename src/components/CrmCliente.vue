<template>
  <div class="container">
    <Loading :loading="loading" />
    <h2>Interacción cliente CRM</h2>
    <div id="seccion">
      <div class="row" v-if="$route.params.id != undefined">
        <div class="col">
          <h6 style="text-align: left">Radicado: {{ radicado }}</h6>
        </div>
        <div class="col" v-if="$route.params.id != null">
          <button
            type="button"
            class="btn btn-success btn-sm"
            style="float: left"
            @click="limpiarFormulario()"
          >
            Crear nuevo radicado
          </button>
        </div>
      </div>
      <form class="was-validated" @submit.prevent="save()">
        <div class="row" v-if="$route.params.id != undefined">
          <div class="col mb-3">
            <label class="form-label">Fecha de radicado: </label>
            <input
              type="datetime-local"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="fecha_radicado"
              disabled
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label">Fecha de cierre: </label>
            <input
              type="datetime-local"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="fecha_cierre"
              disabled
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <SearchList
              nombreCampo="Sede*"
              @getSedes="getSedes"
              eventoCampo="getSedes"
              nombreItem="nombre"
              :registros="sedes"
              placeholder="Seleccione una opción"
              :consulta="consulta_sede"
              :disabled="$route.params.id != undefined"
            />
          </div>

          <div class="col mb-3">
            <SearchList
              nombreCampo="Proceso o área *"
              @getProcesos="getProcesos"
              eventoCampo="getProcesos"
              nombreItem="nombre"
              :registros="procesos"
              placeholder="Seleccione una opción"
              :consulta="consulta_proceso"
              :disabled="$route.params.id != undefined"
            />
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <SearchList
              nombreCampo="Solicitante *"
              @getSolicitanteCrm="getSolicitanteCrm"
              eventoCampo="getSolicitanteCrm"
              nombreItem="nombre"
              :registros="solicitantes"
              placeholder="Seleccione una opción"
              :consulta="consulta_solicitante"
              :disabled="$route.params.id != undefined"
            />
          </div>
          <div class="col mb-3">
            <SearchList
              nombreCampo="Tipo de atención *"
              @getInteracciones="getInteracciones"
              eventoCampo="getInteracciones"
              nombreItem="nombre"
              :registros="respuestas_interaccion"
              placeholder="Seleccione una opción"
              :consulta="consulta_interaccion"
              :disabled="$route.params.id != undefined"
            />
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Nombre / razón social: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="nombre_contacto"
              required
              :disabled="$route.params.id != undefined"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label">Nit / número de documento: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="nit_documento"
              required
              :disabled="$route.params.id != undefined"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Telefono de contacto: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="telefono_contacto"
              required
              :disabled="$route.params.id != undefined"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label">Correo de contacto: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="correo_contacto"
              required
              :disabled="$route.params.id != undefined"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <SearchList
              nombreCampo="Estado *"
              @getEstadoCierreCrm="getEstadoCierreCrm"
              eventoCampo="getEstadoCierreCrm"
              nombreItem="nombre"
              :registros="estados_cierre"
              placeholder="Seleccione una opción"
              :consulta="consulta_estado_cierre"
              :disabled="
                $route.params.id != undefined && fecha_cierre != undefined
              "
            />
          </div>
          <div class="col mb-3">
            <SearchList
              nombreCampo="PQRSF *"
              @getPQRSF="getPQRSF"
              eventoCampo="getPQRSF"
              nombreItem="nombre"
              :registros="lista_pqrsf"
              placeholder="Seleccione una opción"
              :consulta="consulta_pqrsf"
              :disabled="$route.params.id != undefined"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6 mb-3">
            <SearchList
              nombreCampo="Responsable *"
              @getUsuarios="getUsuarios"
              eventoCampo="getUsuarios"
              nombreItem="nombre"
              :registros="usuarios"
              placeholder="Seleccione una opción"
              :consulta="consulta_responsable"
              :disabled="$route.params.id != undefined"
              :index="1"
            />
          </div>
          <div
            class="col-6 mb-3"
            v-if="
              (estado_cierre_id == 2 && $route.params.id != undefined) ||
              (estado_cierre_id == 2 && $route.params.id == undefined)
            "
          >
            <SearchList
              nombreCampo="Cierra la PQRSF *"
              @getUsuarios="getUsuarios"
              eventoCampo="getUsuarios"
              nombreItem="nombre"
              :registros="usuarios"
              placeholder="Seleccione una opción"
              :consulta="consulta_cierra_pqrsf"
              :disabled="
                $route.params.id != undefined &&
                consulta_cierra_pqrsf != null &&
                fecha_cierre != undefined
              "
              :index="2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6 mb-3" v-if="$route.params.id != undefined">
            <label class="form-label">Crea PQRSF: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="crea_pqrsf"
              required
              :disabled="$route.params.id != undefined"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <!-- <div class="col mb-3" v-if="$route.params.id != undefined">
                        <label class="form-label">Cierra PQRSF:
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="cierra_pqrsf" required
                            :disabled="$route.params.id != undefined" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div> -->
        </div>
        <div class="row">
          <div class="col-5">
            <label class="form-label labelBlock">Adjuntar Imágenes</label>
          </div>
          <div class="col-7">
            <label class="form-label labelBlock">Obervaciones</label>
          </div>
        </div>

        <div class="col">
          <div
            class="row obs"
            v-for="(item, index) in evidencias"
            :key="item.id"
          >
            <div class="row">
              <div class="mb-3" v-if="$route.params.id == undefined">
                <div class="row">
                  <div class="col-5">
                    <div class="input-group">
                      <input
                        class="form-control"
                        type="file"
                        accept="image/*"
                        @change="cargarArchivo($event, index)"
                        id="formFileMultiple"
                        required
                      />
                      <span
                        style="cursor: pointer"
                        class="btn btn-outline-secondary"
                        @click="quitarAdjuntos(index)"
                        id="basic-addon1"
                        >Quitar imágenes</span
                      >
                    </div>
                  </div>

                  <div class="col-5">
                    <textarea
                      name=""
                      id="novedades"
                      class="form-control textareaControl"
                      rows="1"
                      v-model="item.observacion"
                      @input="
                        item.observacion = formatInputUpperCase(
                          item.observacion
                        )
                      "
                    ></textarea>
                  </div>
                  <div class="col-2 rightContent">
                    <label
                      class="bi bi-trash-fill labelOption"
                      v-if="index > 0"
                      @click="deleteDynamic(evidencias, index, 'identificador')"
                    >
                      Eliminar</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="botones"
              v-for="(item2, index2) in evidencias[index].file"
              :key="index2"
            >
              <div class="card mb-3" v-if="$route.params.id != undefined">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      v-bind:src="item2"
                      class="img-fluid rounded-start"
                      alt=""
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body" style="text-align: left">
                      <h5 class="card-title">Observación:</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row editor" v-if="$route.params.id == undefined"></div>
            <div
              class="row trash justify-content-center align-items-center padding-1"
              v-if="$route.params.id == undefined"
            >
              <label
                v-if="
                  $route.params.id == undefined &&
                  index == evidencias.length - 1
                "
                id="clasificador"
                @click="agregarObservacion()"
                style="cursor: pointer"
                ><i class="bi bi-plus-circle-fill"></i>
                Agregar imagen
              </label>
            </div>
          </div>
        </div>
        <button class="btn btn-success" type="submit">
          Guardar formulario
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Token } from "../Mixins/Token.js";
import { Alerts } from "../Mixins/Alerts.js";
import SearchList from "./SearchList.vue";
import Loading from "./Loading.vue";

export default {
  components: {
    SearchList,
    Loading,
  },
  mixins: [Token, Alerts],
  props: {},
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      mensaje_error: "",
      procesos: [],
      consulta_proceso: "",
      loading: false,
      sedes: [],
      sede_id: "",
      consulta_sede: "",
      respuestas_interaccion: [],
      consulta_interaccion: "",
      solicitantes: [],
      solicitante_id: "",
      consulta_solicitante: "",
      telefono_contacto: "",
      correo_contacto: "",
      estado_cierre_id: "",
      consulta_estado_cierre: "",
      estados_cierre: [],
      observacion: "",
      proceso_id: "",
      interaccion_id: "",
      nombre_contacto: "",
      radicado: "",
      nit_documento: "",
      fecha_radicado: "",
      fecha_cierre: "",
      lista_pqrsf: [],
      consulta_pqrsf: "",
      pqrsf_id: "",
      id_registro: "",
      crea_pqrsf: "",
      cierra_pqrsf_id: "",
      consulta_cierra_pqrsf: "",
      responsable_id: "",
      consulta_responsable: "",
      usuarios: [],
      evidencias: [{ observacion: "", file: {} }],
      consulta_texto: [],
    };
  },
  computed: {},
  watch: {
    $route() {
      this.limpiarFormulario();
    },
  },
  mounted() {
    this.id_registro = this.$route.params.id;
    if (this.id_registro != undefined) {
      this.getItem(this.id_registro);
    }
  },
  methods: {
    agregarObservacion() {
      this.verLista = this.verLista + 1;
      if (this.evidencias.length <= 10) {
        this.evidencias.push({ observacion: "", file: {} });
      }
    },
    deleteDynamic(array, index, identificador = null) {
      if (identificador != null) {
        this.consulta_texto.splice(index, 1);
        this.evidencias[index].file = [];
      }
      array.splice(index, 1);
    },
    limpiarFormulario() {
      this.radicado = "";
      this.nombre_contacto = "";
      this.sede_id = "";
      this.consulta_sede = "";
      this.proceso_id = "";
      this.consulta_proceso = "";
      this.solicitante_id = "";
      this.consulta_solicitante = "";
      this.interaccion_id = "";
      this.consulta_interaccion = "";
      this.telefono_contacto = "";
      this.correo_contacto = "";
      this.estado_cierre_id = "";
      this.consulta_estado_cierre = "";
      this.observacion = "";
      this.nit_documento = "";
      this.fecha_radicado = "";
      this.fecha_cierre = "";
      this.pqrsf_id = "";
      this.consulta_pqrsf = "";
      this.crea_pqrsf = "";
      this.consulta_cierra_pqrsf = "";
      this.consulta_responsable = "";
      let currentRoute = { ...this.$route };
      delete currentRoute.params.id;
      this.$router.replace(currentRoute);
    },
    getItem(id) {
      let self = this;
      self.loading = true;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/seguimientocrmbyid/" + id, config)
        .then(function (result) {
          self.llenarFormulario(result.data);
        });
    },
    llenarFormulario(item) {
      this.radicado = item.numero_radicado;
      this.nombre_contacto = item.nombre_contacto;
      this.sede_id = item.sede_id;
      this.consulta_sede = item.sede;
      this.proceso_id = item.proceso_id;
      this.consulta_proceso = item.proceso;
      this.solicitante_id = item.solicitante_id;
      this.consulta_solicitante = item.solicitante;
      this.interaccion_id = item.tipo_atencion_id;
      this.consulta_interaccion = item.iteraccion;
      this.telefono_contacto = item.telefono;
      this.correo_contacto = item.correo;
      this.estado_cierre_id = item.estado_id;
      this.consulta_estado_cierre = item.estado;
      this.observacion = item.observacion;
      this.nit_documento = item.nit_documento;
      this.pqrsf_id = item.pqrsf_id;
      this.consulta_pqrsf = item.pqrsf;
      this.crea_pqrsf = item.creacion_pqrsf;
      this.consulta_cierra_pqrsf = item.cierre_pqrsf;
      this.consulta_responsable = item.responsable;
      this.fecha_radicado = this.formatearFecha(item.created_at);
      this.fecha_cierre = this.formatearFecha(item.fecha_cerrado);
      this.loading = false;
    },
    formatearFecha(fechaOriginal) {
      if (fechaOriginal != null) {
        var fecha = new Date(fechaOriginal);
        var year = fecha.getFullYear();
        var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
        var day = ("0" + fecha.getDate()).slice(-2);
        var hour = ("0" + fecha.getHours()).slice(-2);
        var minute = ("0" + fecha.getMinutes()).slice(-2);
        var formattedDate = `${year}-${month}-${day}T${hour}:${minute}`;
        return formattedDate;
      }
    },
    cargarArchivo(event, index) {
      const file = event.target.files[0]; // Tomar solo el primer archivo
      this.evidencias[index].file = file;
    },
    quitarAdjuntos(index) {
      this.evidencias[index].file = [];
    },
    formatearPesoArchivo(pesoBytes) {
      if (pesoBytes < 1024) {
        return `${pesoBytes} bytes`;
      } else if (pesoBytes < 1024 * 1024) {
        return `${Math.ceil(pesoBytes / 1024)} KB`;
      } else if (pesoBytes < 1024 * 1024 * 1024) {
        return `${Math.ceil(pesoBytes / (1024 * 1024))} MB`;
      } else {
        return `${Math.ceil(pesoBytes / (1024 * 1024 * 1024))} GB`;
      }
    },

    save() {
      let self = this;
      let config = this.configHeader();
      const formulario = new FormData();
      formulario.append("nombre_contacto", this.nombre_contacto);
      formulario.append("sede_id", this.sede_id);
      formulario.append("proceso_id", this.proceso_id);
      formulario.append("solicitante_id", this.solicitante_id);
      formulario.append("tipo_atencion_id", this.interaccion_id);
      formulario.append("telefono", this.telefono_contacto);
      formulario.append("correo", this.correo_contacto);
      formulario.append("estado_id", this.estado_cierre_id);
      formulario.append("observacion", this.observacion);
      formulario.append("nit_documento", this.nit_documento);
      formulario.append("pqrsf_id", this.pqrsf_id);
      formulario.append("creacion_pqrsf", this.crea_pqrsf);
      formulario.append("cierre_pqrsf", this.consulta_cierra_pqrsf);
      formulario.append("responsable", this.consulta_responsable);
      this.evidencias.forEach((evidencia, index) => {
        if (evidencia.file) {
          formulario.append(`evidencias[${index}][file]`, evidencia.file);
        }
        formulario.append(
          `evidencias[${index}][observacion]`,
          evidencia.observacion
        );
      });
      console.log(formulario);
      var id = this.$route.params.id;
      var url = "";
      if (id != null) {
        url = self.URL_API + "api/v1/seguimientocrm/" + id;
      } else {
        url = self.URL_API + "api/v1/seguimientocrm";
      }
      axios.post(url, formulario, config).then(function (result) {
        self.showAlert(result.data.message, result.data.status);
        const rutaActual = self.$route;
        const nuevosParametros = { ...rutaActual.params, id: result.data.id };
        self.$router.replace({ ...rutaActual, params: nuevosParametros });
        self.getItem(result.data.id);
      });
    },
    getSedes(item = null) {
      if (item != null) {
        this.sede_id = item.id;
        this.consulta_sede = item.nombre;
      }
      let self = this;
      let config = this.configHeader();
      axios.get(self.URL_API + "api/v1/sede", config).then(function (result) {
        self.sedes = result.data;
      });
    },
    getProcesos(item = null) {
      let self = this;
      if (item != null) {
        this.proceso_id = item.id;
        this.consulta_proceso = item.nombre;
      }
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/procesos", config)
        .then(function (result) {
          self.procesos = result.data;
        });
    },
    getInteracciones(item = null) {
      let self = this;
      if (item != null) {
        this.interaccion_id = item.id;
        this.consulta_interaccion = item.nombre;
      }
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/interaccion", config)
        .then(function (result) {
          self.respuestas_interaccion = result.data;
        });
    },
    getSolicitanteCrm(item = null) {
      let self = this;
      if (item != null) {
        this.solicitante_id = item.id;
        this.consulta_solicitante = item.nombre;
      }
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/solicitantecrm", config)
        .then(function (result) {
          self.solicitantes = result.data;
        });
    },
    getEstadoCierreCrm(item = null) {
      let self = this;
      if (item != null) {
        this.estado_cierre_id = item.id;
        this.consulta_estado_cierre_id = item.nombre;
        if (item.id == 1) {
          this.cierra_pqrsf_id = "";
          this.consulta_cierra_pqrsf = "";
        }
      }
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/estadocirrecrm", config)
        .then(function (result) {
          self.estados_cierre = result.data;
        });
    },
    getPQRSF(item = null) {
      let self = this;
      if (item != null) {
        this.pqrsf_id = item.id;
        this.consulta_pqrsf = item.nombre;
      }
      let config = this.configHeader();
      axios.get(self.URL_API + "api/v1/pqrsf", config).then(function (result) {
        self.lista_pqrsf = result.data;
      });
    },
    getUsuarios(item = null, index = null) {
      if (item != null) {
        switch (index) {
          case 1:
            this.responsable_id = item.id;
            this.consulta_responsable = item.nombre;
            break;
          case 2:
            this.cierra_pqrsf_id = item.id;
            this.consulta_cierra_pqrsf = item.nombre;
            break;
        }
      }

      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/userslist", config)
        .then(function (result) {
          self.usuarios = result.data;
        });
    },
  },
};
</script>
<style scoped>
#seccion {
  border: solid #d5dbdb 0.5px;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.tituloseccion {
  position: relative;
  display: inline-block;
  background-color: white;
  padding: 5px;
  top: 22px;
}
.bi bi-x {
  margin: 20px 0px 20px 0px;
  max-width: 400px;
  cursor: pointer;
}
.btn-group {
  overflow: auto;
}

span {
  height: 38px;
}
.botones {
  padding: 5px;
}
.adjunto {
  white-space: nowrap;
  margin-bottom: 10px;
  background-color: #239b56;
  color: rgb(255, 255, 255);
  width: 100%;
}

label {
  float: left;
  margin: 20px 0px 5px 0px;
}

.adjuntos_container {
  display: flex;
  flex-direction: column;
}
.form_controlContainer {
  width: 100%;
}
.spanContainer {
  width: 20%;
  display: flex;
  justify-content: left;
}
.option_container {
  display: flex;
  gap: 0;
  width: 100%;
}
.labelOption {
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
  margin: auto;
}
.right {
  justify-content: right;
}
.left {
  justify-content: left;
}
.center {
  justify-content: center;
}
.labelBlock {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.3em;
  padding-left: 0;
}
.padding-1 {
  padding: 0.5em;
}
</style>
