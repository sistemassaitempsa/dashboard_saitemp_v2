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
      <form class="was-validated" @submit.prevent="save()" autocomplete="off">
        <div class="row" v-if="$route.params.id != undefined">
          <div class="col mb-3">
            <label class="form-label">Fecha de radicado: </label>
            <input
              type="datetime-local"
              class="form-control"
              autocomplete="off"
              id="fechaRadicado"
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
              id="fechaCierre"
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
          <div class="col mb-3" id="no-sede" tabindex="0">
            <SearchList
              nombreCampo="Sede*"
              @getSedes="getSedes"
              eventoCampo="getSedes"
              nombreItem="nombre"
              :registros="sedes"
              placeholder="Seleccione una opción"
              :consulta="consulta_sede"
              :disabled="
                $route.params.id != undefined && !permisos[32].autorizado
              "
            />
          </div>

          <div class="col mb-3" id="no-proceso" tabindex="0">
            <SearchList
              nombreCampo="Proceso o área *"
              @getProcesos="getProcesos"
              eventoCampo="getProcesos"
              nombreItem="nombre"
              :registros="procesos"
              placeholder="Seleccione una opción"
              :consulta="consulta_proceso"
              :disabled="
                $route.params.id != undefined && !permisos[32].autorizado
              "
            />
          </div>
        </div>
        <div class="row">
          <div class="col mb-3" id="no-solicitante" tabindex="0">
            <SearchList
              nombreCampo="Solicitante *"
              @getSolicitanteCrm="getSolicitanteCrm"
              eventoCampo="getSolicitanteCrm"
              nombreItem="nombre"
              :registros="solicitantes"
              placeholder="Seleccione una opción"
              :consulta="consulta_solicitante"
              :disabled="
                $route.params.id != undefined && !permisos[32].autorizado
              "
            />
          </div>
          <div class="col mb-3" id="no-medio-atencion" tabindex="0">
            <SearchList
              nombreCampo="Medio de atención *"
              @getInteracciones="getInteracciones"
              eventoCampo="getInteracciones"
              nombreItem="nombre"
              :registros="respuestas_interaccion"
              placeholder="Seleccione una opción"
              :consulta="consulta_interaccion"
              :disabled="
                $route.params.id != undefined && !permisos[32].autorizado
              "
            />
          </div>
        </div>
        <div class="row">
          <div class="col" id="no-nit" tabindex="0">
            <SearchList
              v-if="solicitante_id == 1 && $route.params.id == undefined"
              nombreCampo="Nit/identificacion: *"
              @getEmpresasCliente="getEmpresasCliente"
              eventoCampo="getEmpresasCliente"
              nombreItem="nit"
              :consulta="nit_documento"
              :registros="empresas_cliente"
              placeholder="Seleccione una opción"
              :disabled="
                bloquea_campos &&
                nit_documento != null &&
                !permisos[32].autorizado
              "
            />
            <div v-else>
              <label class="form-label">Nit/identificacion: * </label>
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                id="no-id"
                aria-describedby="emailHelp"
                v-model="nit_documento"
                required
                :disabled="
                  $route.params.id != undefined && !permisos[32].autorizado
                "
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label">Nombre / razón social:* </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="no-name"
              aria-describedby="emailHelp"
              v-model="nombre_contacto"
              required
              :disabled="
                ($route.params.id != undefined && !permisos[32].autorizado) ||
                disableName
              "
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Telefono de contacto:* </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="no-tel"
              aria-describedby="emailHelp"
              v-model="telefono_contacto"
              :disabled="
                $route.params.id != undefined && !permisos[32].autorizado
              "
              required
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label">Correo de contacto:* </label>
            <input
              type="email"
              class="form-control"
              autocomplete="off"
              id="no-email"
              aria-describedby="emailHelp"
              v-model="correo_contacto"
              :disabled="
                $route.params.id != undefined && !permisos[32].autorizado
              "
              required
              @input="validateEmail"
            />
            <small
              v-if="!emailValido && correo_contacto.length > 0"
              class="text-danger"
            >
              Por favor ingresa un correo válido.
            </small>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 mb-3" id="no-estado-form" tabindex="0">
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
          <div
            class="col mb-3"
            v-if="interaccion_id != 5 && interaccion_id != 6"
            id="no-tipo-pqrsf"
            tabindex="0"
          >
            <SearchList
              nombreCampo="PQRSF *"
              @getPQRSF="getPQRSF"
              eventoCampo="getPQRSF"
              nombreItem="nombre"
              :registros="lista_pqrsf"
              placeholder="Seleccione una opción"
              :consulta="consulta_pqrsf"
              :disabled="
                $route.params.id != undefined && !permisos[32].autorizado
              "
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6 mb-3" id="no-respoonsable-form" tabindex="0">
            <SearchList
              nombreCampo="Responsable *"
              @getUsuarios="getUsuarios"
              eventoCampo="getUsuarios"
              nombreItem="nombre"
              :registros="usuarios"
              placeholder="Seleccione una opción"
              :consulta="consulta_responsable"
              :index="1"
              :disabled="
                $route.params.id != undefined && !permisos[32].autorizado
              "
            />
          </div>
          <div
            class="col-6 mb-3"
            v-if="
              (estado_cierre_id == 3 && $route.params.id != undefined) ||
              (estado_cierre_id == 3 && $route.params.id == undefined)
            "
          >
            <SearchList
              nombreCampo="Cierra radicado *"
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

          <div class="col-6 mb-3" v-if="$route.params.id != undefined">
            <label class="form-label">Crea radicado: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="no-pqr"
              aria-describedby="emailHelp"
              v-model="crea_pqrsf"
              required
              :disabled="
                $route.params.id != undefined && !permisos[32].autorizado
              "
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Observación:</label>
            <textarea
              class="form-control"
              name=""
              id="observacion_PQRSF"
              rows="5"
              v-model="observacion"
              placeholder="Observación"
              maxlength="3000"
            ></textarea>
            <div class="d-flex justify-content-end">
              <small class="char-count"
                >{{ remainingCharsObservasion3 }}/3000</small
              >
            </div>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row"></div>
        <!-- columnas para visita -->
        <h5
          class="text-start mt-4"
          v-if="interaccion_id == 5 || interaccion_id == 6"
        >
          Formulario de visita:*
        </h5>
        <div
          v-if="interaccion_id == 5 || interaccion_id == 6"
          class="border rounded p-4"
        >
          <div class="row">
            <div
              v-if="interaccion_id == 5 || interaccion_id == 6"
              :class="
                $route.params.id !== undefined ? 'col-6 mb-3' : 'col-6 mb-3'
              "
            >
              <label class="form-label">Hora inicio de visita:* </label>
              <input
                type="time"
                class="form-control"
                autocomplete="off"
                id="no-hora"
                aria-describedby="emailHelp"
                v-model="hora_inicio"
                required
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
            <div
              class="col-6 mb-3"
              v-if="
                $route.params.id != undefined &&
                (interaccion_id == 5 || interaccion_id == 6)
              "
            >
              <label class="form-label">Hora fin de visita:* </label>
              <input
                type="time"
                class="form-control"
                autocomplete="off"
                id="no-hora-fin"
                aria-describedby="emailHelp"
                v-model="hora_cierre"
                required
                disabled
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 mb-3" id="no-visitante-sel" tabindex="0">
              <SearchList
                nombreCampo="Visita realizada por: *"
                @getUsuarios="getUsuarios"
                eventoCampo="getUsuarios"
                nombreItem="nombre"
                :registros="usuarios"
                placeholder="Seleccione una opción"
                :consulta="visitante"
                :index="3"
                :disabled="
                  $route.params.id != undefined && !permisos[32].autorizado
                "
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>

            <div class="col mb-3" id="no-cargo-visitante" tabindex="0">
              <SearchList
                nombreCampo="Cargo del visitante: *"
                @getCargosPlanta="getCargosPlanta"
                eventoCampo="getCargosPlanta"
                nombreItem="cargo"
                :registros="cargos_planta"
                placeholder="Seleccione una opción"
                :consulta="cargo_visitante"
                :disabled="
                  $route.params.id != undefined && !permisos[32].autorizado
                "
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label class="form-label">Visita atendida por:* </label>
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                id="no-visitante"
                aria-describedby="emailHelp"
                v-model="visitado"
                required
                :disabled="
                  $route.params.id != undefined && !permisos[32].autorizado
                "
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>

            <div class="col mb-3">
              <label class="form-label">Cargo del visitado:* </label>
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                id="no-visitado"
                aria-describedby="emailHelp"
                v-model="cargo_visitado"
                required
                :disabled="
                  $route.params.id != undefined && !permisos[32].autorizado
                "
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label class="form-label">Objetivo de la visita:* </label>
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                id="no-objetivo"
                aria-describedby="emailHelp"
                v-model="objetivo_visita"
                required
                :disabled="
                  $route.params.id != undefined && !permisos[32].autorizado
                "
                maxlength="200"
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>

            <div class="col mb-3">
              <label class="form-label">Alcance de la visita:* </label>
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                id="no-alcance"
                aria-describedby="emailHelp"
                v-model="alcance_visita"
                required
                :disabled="
                  $route.params.id != undefined && !permisos[32].autorizado
                "
                maxlength="500"
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col mb-3 position-relative">
              <label class="form-label">Tema de la visita:*</label>
              <textarea
                class="form-control"
                required
                name=""
                id="temaArea"
                rows="3"
                v-model="temasPrincipales[0].descripcion"
                placeholder="Tema"
                @input="checkCharLimit"
                maxlength="3000"
                :disabled="
                  $route.params.id != undefined && !permisos[32].autorizado
                "
              ></textarea>
              <div class="d-flex justify-content-end">
                <small class="char-count">{{ remainingChars }}/3000</small>
              </div>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="row border rounded">
            <div class="row">
              <div class="col align-self-center">
                <label class="form-label">Compromiso 1:*</label>
              </div>
              <div class="col-3 mb-3" v-if="$route.params.id != undefined">
                <label class="form-label">Fecha de apertura: </label>
                <input
                  type="datetime-local"
                  class="form-control"
                  autocomplete="off"
                  id="no-fecha-open"
                  aria-describedby="emailHelp"
                  v-model="fecha_radicado"
                  disabled
                />
              </div>
            </div>
            <div class="row">
              <div class="col mb-3">
                <textarea
                  class="form-control"
                  name=""
                  id="compromiso1"
                  rows="2"
                  maxlength="4000"
                  v-model="compromisos[0].descripcion"
                  placeholder="Compromiso 1"
                  :disabled="
                    $route.params.id != undefined && !permisos[32].autorizado
                  "
                ></textarea>
                <div class="d-flex justify-content-end">
                  <small class="char-count"
                    >{{ remainingCharsCompromiso }}/4000</small
                  >
                </div>
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 mb-3">
                <SearchList
                  nombreCampo="Responsable: *"
                  @getUsuarios="getUsuarios"
                  eventoCampo="getUsuarios"
                  nombreItem="nombre"
                  :registros="usuarios"
                  placeholder="Seleccione una opción"
                  :consulta="compromisos[0].responsable"
                  :index="4"
                  :valida_campo="compromisos[0].descripcion != ''"
                  :disabled="
                    $route.params.id != undefined && !permisos[32].autorizado
                  "
                />

                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
              <!-- <div class="col-3 mb-3">
                  <label class="form-label">Fecha de cierre: </label>
                  <input
                    type="date"
                    class="form-control"
                    autocomplete="off"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="compromisos[0].fecha_cierre"
                  />
                </div> -->
              <div class="col-6 was-validated mb-3">
                <label for="validationCustom" class="form-label"
                  >Estado:*</label
                >
                <select
                  class="form-select"
                  :required="
                    estado_cierre_id == 3 && compromisos[0].descripcion != ''
                  "
                  v-model="compromisos[0].estado_cierre_id"
                >
                  <option :value="1">Eficaz</option>
                  <option :value="2">Ineficaz</option>
                </select>
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col mb-3">
                <label class="form-label"
                  >Observaciones para el responsable: *</label
                >
                <textarea
                  class="form-control"
                  name=""
                  id="razon_social"
                  rows="1"
                  v-model="compromisos[0].observacion"
                  placeholder="Observación"
                  :disabled="
                    $route.params.id != undefined && !permisos[32].autorizado
                  "
                  maxlength="3000"
                ></textarea>
                <div class="d-flex justify-content-end">
                  <small class="char-count"
                    >{{ remainingCharsObservasion }}/3000</small
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row border mt-1 rounded">
            <div class="row">
              <div class="col align-self-center">
                <label class="form-label">Compromiso 2:*</label>
              </div>
              <div class="col-3 mb-3" v-if="$route.params.id != undefined">
                <label class="form-label">Fecha de apertura: </label>
                <input
                  type="datetime-local"
                  class="form-control"
                  autocomplete="off"
                  id="no-fecha-open2"
                  aria-describedby="emailHelp"
                  v-model="fecha_radicado"
                  disabled
                />
              </div>
            </div>
            <div class="row">
              <div class="col mb-3">
                <textarea
                  class="form-control"
                  name=""
                  id="compromiso2"
                  rows="2"
                  v-model="compromisos[1].descripcion"
                  placeholder="Compromiso 2"
                  :disabled="
                    $route.params.id != undefined && !permisos[32].autorizado
                  "
                  maxlength="4000"
                ></textarea>
                <div class="d-flex justify-content-end">
                  <small class="char-count"
                    >{{ remainingCharsCompromiso2 }}/4000</small
                  >
                </div>
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 mb-3">
                <SearchList
                  nombreCampo="Responsable: *"
                  @getUsuarios="getUsuarios"
                  eventoCampo="getUsuarios"
                  nombreItem="nombre"
                  :registros="usuarios"
                  placeholder="Seleccione una opción"
                  :consulta="compromisos[1].responsable"
                  :index="5"
                  :valida_campo="compromisos[1].descripcion != ''"
                  :disabled="
                    $route.params.id != undefined && !permisos[32].autorizado
                  "
                />
              </div>
              <!--     <div class="col-3 mb-3">
                  <label class="form-label">Fecha de cierre: </label>
                  <input
                    type="date"
                    class="form-control"
                    autocomplete="off"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="compromisos[1].fecha_cierre"
                  />
                </div> -->
              <div class="col-6 was-validated mb-3">
                <label for="validationCustom" class="form-label"
                  >Estado:*</label
                >
                <select
                  class="form-select"
                  :required="
                    estado_cierre_id == 3 && compromisos[1].descripcion != ''
                  "
                  v-model="compromisos[1].estado_cierre_id"
                >
                  <option :value="1">Eficaz</option>
                  <option :value="2">Ineficaz</option>
                </select>
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col mb-3">
                <label class="form-label"
                  >Observaciones para el responsable: *</label
                >
                <textarea
                  class="form-control"
                  name=""
                  id="observacion_compromiso1"
                  rows="1"
                  v-model="compromisos[1].observacion"
                  placeholder="Observación"
                  :disabled="
                    $route.params.id != undefined && !permisos[32].autorizado
                  "
                ></textarea>
                <div class="d-flex justify-content-end">
                  <small class="char-count"
                    >{{ remainingCharsObservasion2 }}/3000</small
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- finaliza aqui -->

        <!-- campo visita firmas -->
        <div v-if="interaccion_id == 5 || interaccion_id == 6">
          <div v-for="(asistencia, index) in asistencias" :key="index">
            <div class="row">
              <h6 class="padding-1">{{ "Asistencia" + " " + (index + 1) }}</h6>
            </div>
            <div class="row border rounded border-2">
              <div class="col mb-3">
                <label class="form-label">Nombre:* </label>
                <input
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  id="no-name-asist"
                  aria-describedby="emailHelp"
                  v-model="asistencia.nombre"
                  required
                  :disabled="
                    $route.params.id != undefined && !permisos[32].autorizado
                  "
                />
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
              <div class="col mb-3">
                <label class="form-label">Cargo:* </label>
                <input
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  id="no-cargo"
                  aria-describedby="emailHelp"
                  v-model="asistencia.cargo"
                  required
                  :disabled="
                    $route.params.id != undefined && !permisos[32].autorizado
                  "
                />
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-6 mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    >Firma *:</label
                  >
                  <div
                    v-if="
                      $route.params.id != undefined &&
                      asistencia.firma.length != 0
                    "
                    class="imagen_firma"
                  >
                    <img :src="URL_API + asistencia.firma" alt="" />
                  </div>
                  <div v-else class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon2"
                      ><i
                        class="bi bi-pen"
                        style="cursor: pointer"
                        @click="signature(asistencias, index)"
                      ></i
                    ></span>
                    <input
                      type="password"
                      disabled
                      class="form-control"
                      placeholder=""
                      aria-label="firma"
                      v-model="asistencia.firma_hash"
                      aria-describedby="basic-addon1"
                    />
                    <span class="input-group-text" id="basic-addon3"
                      ><i
                        class="bi bi-x-circle"
                        style="cursor: pointer"
                        @click="
                          asistencia.firma = [];
                          asistencia.firma_hash = '';
                        "
                      ></i
                    ></span>
                  </div>
                  <FirmaDigital
                    class="tochpad"
                    v-if="asistencia.show_pad"
                    @firma="firma($event, index)"
                  />
                </div>
                <div class="col-sm-12 col-md-6 mb-3">
                  <div
                    v-if="
                      ($route.params.id != null &&
                        asistencia.firma.length == 0) ||
                      $route.params.id == null
                    "
                    class="d-flex justify-content-end align-items-end w-100 h-100"
                  >
                    <label
                      class="bi bi-trash-fill labelOption"
                      v-if="index > 0"
                      @click="
                        deleteDynamicAsistencia(
                          asistencias,
                          index,
                          'identificador'
                        )
                      "
                    >
                      Eliminar</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row trash justify-content-center align-items-center padding-1"
            >
              <label
                v-if="index == asistencias.length - 1"
                id="clasificador"
                @click="agregarAsistencia()"
                style="cursor: pointer"
                ><i class="bi bi-plus-circle-fill"></i>
                Agregar asistencia
              </label>
            </div>
          </div>
        </div>
        <!-- finaliza aqui -->
        <div class="row">
          <div class="col" v-if="$route.params.id != null">
            <label class="form-label labelBlock">Archivos adjuntos:</label>
          </div>
        </div>

        <div v-if="consulta_evidencias.length > 0">
          <div class="d-flex justify-content-center p-5 gap-8 flex-wrap">
            <div
              class="card p-3 fontSize-5"
              v-for="evidencia in consulta_evidencias"
              :key="evidencia.id"
              style="width: 18rem"
            >
              <div class="col d-flex justify-content-end">
                <a
                  :href="URL_API + `api/v1/verEvidencia/${evidencia.id}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    type="button"
                    :class="
                      evidencia.archivo != undefined
                        ? 'btn btn-sm ver'
                        : 'btn btn-sm btn-secondary'
                    "
                  >
                    <i class="bi bi-eye"> ver</i>
                  </button>
                </a>
              </div>

              <div class="card-body">
                <h6 class="card-title">{{ getFileName(evidencia.archivo) }}</h6>
              </div>

              <div class="col">
                <div class="mb-3">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    v-model="evidencia.descripcion"
                    :disabled="!evidencia.edit"
                  ></textarea>
                </div>
              </div>

              <div class="col">
                <div
                  class="d-flex justify-content-between align-items-center p-1"
                >
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="messageDelete(evidencia)"
                  >
                    <label class="bi bi-trash-fill labelOption">
                      Eliminar
                    </label>
                  </button>
                  <button
                    type="button"
                    :class="
                      evidencia.edit ? 'btn btn-success' : 'btn btn-warning'
                    "
                    @click="toggleEdit(evidencia)"
                  >
                    <label class="bi bi-pencil-square labelOption">
                      {{ evidencia.edit ? "Guardar" : "Editar" }}
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div
            class="row"
            style="text-align: left; clear: both; margin-top: 40px"
          >
            <h5 @click="adjuntos = !adjuntos" style="cursor: pointer">
              Cargar Archivos
              <i v-if="adjuntos" class="bi bi-chevron-down"></i
              ><i v-if="!adjuntos" class="bi bi-chevron-compact-up"></i>
            </h5>
          </div>
          <div v-if="adjuntos">
            <div
              class="row obs"
              v-for="(item, index) in evidencias"
              :key="item.id"
            >
              <div class="row">
                <div class="mb-3">
                  <div class="row">
                    <div class="col-5">
                      <div class="input-group">
                        <input
                          class="form-control"
                          type="file"
                          accept="image/*,.pdf, .msg, audio/*"
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
                      ></textarea>
                    </div>
                    <div class="col-2 rightContent">
                      <label
                        class="bi bi-trash-fill labelOption"
                        v-if="index > 0"
                        @click="
                          deleteDynamic(evidencias, index, 'identificador')
                        "
                      >
                        Eliminar</label
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="row trash justify-content-center align-items-center padding-1"
              >
                <label
                  v-if="index == evidencias.length - 1"
                  id="clasificador"
                  @click="agregarObservacion()"
                  style="cursor: pointer"
                  ><i class="bi bi-plus-circle-fill"></i>
                  Agregar archivo
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="col" v-if="$route.params.id != undefined">
          <div
            class="row"
            style="text-align: left; clear: both; margin-top: 40px"
          >
            <h5 @click="reenvioPdf = !reenvioPdf" style="cursor: pointer">
              Reenviar PDF
              <i v-if="reenvioPdf" class="bi bi-chevron-down"></i
              ><i v-if="!reenvioPdf" class="bi bi-chevron-compact-up"></i>
            </h5>
          </div>
          <div v-if="reenvioPdf" class="border rounded p-4 mb-3">
            <div class="row border-bottom p-4">
              <div class="col">
                <h6 class="text-start">Cliente</h6>
              </div>
              <div class="col">
                <h6 class="text-start">{{ correo_contacto }}</h6>
              </div>
              <div class="col-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  @change="
                    agregarCorreosSeleccionados(
                      correo_contacto,
                      (observacion = '')
                    )
                  "
                />
              </div>
            </div>
            <div
              class="row border-bottom p-4"
              v-for="(compromiso, index) in compromisos"
              :key="index"
            >
              <div class="col" v-if="compromiso.descripcion != ''">
                <h6 class="text-start">{{ compromiso.responsable }}</h6>
              </div>
              <div class="col" v-if="compromiso.descripcion != ''">
                <h6 class="text-start">{{ compromiso.email }}</h6>
              </div>
              <div class="col-2" v-if="compromiso.descripcion != ''">
                <input
                  class="form-check-input"
                  type="checkbox"
                  @change="
                    agregarCorreosSeleccionados(
                      compromiso.email,
                      compromiso.observacion
                    )
                  "
                />
              </div>
            </div>
            <button
              class="btn btn-success mt-4"
              type="button"
              @click="reenviarCorreosSeleccionados"
            >
              Reenviar PDF
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col" v-if="$route.params.id != undefined">
            <button
              class="btn btn-success"
              type="button"
              @click="descargarInforme(2)"
            >
              Descargar PDF
            </button>
          </div>
          <div class="col">
            <div class="btn-group-vertical" role="group">
              <button
                id="btnGroupDrop1"
                type="button"
                class="btn btn-success dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Guardar Formulario
              </button>
              <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <li @click="save(1)">
                  <a class="dropdown-item" href="#">Guardar y enviar PDF</a>
                </li>
                <li @click="save(2)">
                  <a class="dropdown-item" href="#">Guardar y descargar PDF</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="save(3)"
                    >Guardar sin enviar PDF</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div
      class="row"
      v-if="$route.params.id != undefined"
      style="text-align: left; clear: both; margin-bottom: 40px"
    >
      <h5 @click="envio_correo = !envio_correo" style="cursor: pointer">
        Envío correo <i v-if="envio_correo" class="bi bi-chevron-down"></i
        ><i v-if="!envio_correo" class="bi bi-chevron-compact-up"></i>
      </h5>
    </div>
    <SolicitudNovedadesNomina
      v-if="$route.params.id != undefined && envio_correo"
      :menu="menu"
      :reenvio_correo="reenvio_correo"
      :adjuntos_candidato_string="adjuntos_candidato_string"
      @lanzarLoading="lanzarLoading"
      @correoEnviado="manejarCorreoEnviado"
    />

    <div
      class="row"
      v-if="gestioningresocorreos.length > 0"
      style="text-align: left; clear: both; margin-bottom: 40px"
    >
      <h5
        @click="historico_correos = !historico_correos"
        style="cursor: pointer"
      >
        Historico correos enviados
        <i v-if="historico_correos" class="bi bi-chevron-compact-up"></i
        ><i v-if="!historico_correos" class="bi bi-chevron-down"></i>
      </h5>
    </div>
    <div class="table-responsive" v-if="!historico_correos">
      <table
        class="table table-striped table-hover table-bordered align-middle"
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Remitente</th>
            <th scope="col">Destinatario</th>
            <th scope="col">Con copia</th>
            <th scope="col">Con copia oculta</th>
            <th scope="col">Asunto</th>
            <th scope="col">Mensaje</th>
            <th scope="col">Adjuntos</th>
            <th scope="col">Fecha envío</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in gestioningresocorreos" :key="index">
            <th scope="row">{{ index }}</th>
            <td>{{ item.remitente }}</td>
            <td>{{ item.destinatario }}</td>
            <td>{{ item.con_copia }}</td>
            <td>{{ item.con_copia_oculta }}</td>
            <td>{{ item.asunto }}</td>
            <td>{{ item.mensaje }}</td>
            <td>{{ item.adjunto }}</td>
            <td>{{ reformatearFecha(item.created_at) }}</td>
            <td scope="col">
              <button
                class="btn btn-success"
                type="button"
                @click="reenviar(item)"
              >
                Reenviar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row mt-4" v-if="latitud != null">
      <h3>Geolocalización <i class="bi bi-geo-alt"></i></h3>
      <MapaVue
        @coordenadas="coordenadas"
        :showMap="showMap"
        :latitud="latitud"
        :longitud="longitud"
        :label="label"
        :marcador="marcador"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import MapaVue from "./MapaVue.vue";
import { Token } from "../Mixins/Token.js";
import { Alerts } from "../Mixins/Alerts.js";
import SearchList from "./SearchList.vue";
import Loading from "./Loading.vue";
import { Permisos } from "../Mixins/Permisos.js";
import SolicitudNovedadesNomina from "./SolicitudNovedadesNomina.vue";
import FirmaDigital from "./FirmaDigital.vue";
import { Geolocal } from "../Mixins/Geolocal.js";

export default {
  components: {
    SearchList,
    Loading,
    SolicitudNovedadesNomina,
    FirmaDigital,
    MapaVue,
  },
  mixins: [Token, Alerts, Permisos, Geolocal],
  props: {
    menu: [],
  },
  data() {
    return {
      correosSeleccionados: {
        correos: [],
      },
      reenvioPdf: false,
      disableName: false,
      emailValido: true,
      correo_responsablePqrsf: "",
      correo_responsable1: "",
      correo_responsable2: "",
      charLimit_tema: 3000,
      cargos_planta: [],
      usuarios_lider: [],
      geolocalizacion: null,
      marcador: require("@/assets/marcador_saitemp.png"),
      label: "",
      showMap: true,
      latitud: "",
      longitud: "",
      visitante_id: "",
      empresas_cliente: [],
      bloquea_campos: false,
      asistencias: [
        { nombre: "", cargo: "", firma: [], show_pad: false, firma_hash: "" },
      ],
      compromisos: [
        {
          titulo: "compromiso1",
          descripcion: "",
          estado_cierre_id: "",
          fecha_cierre: "",
          fecha_inicio: "",
          responsable: "",
          observacion: "",
          responsable_id: "",
          email: "",
          id: "",
        },
        {
          titulo: "compromiso2",
          descripcion: "",
          estado_cierre_id: "",
          fecha_cierre: "",
          fecha_inicio: "",
          responsable: "",
          observacion: "",
          responsable_id: "",
          email: "",
          id: "",
        },
      ],
      empresa_cliente_nombre: "",
      temasPrincipales: [{ titulo: "tema1", descripcion: "" }],
      consulta_empresa_cliente: "",
      alcance_visita: "",
      objetivo_visita: "",
      cargo_visitado: "",
      visitado: "",
      cargo_visitante: "",
      visitante: "",
      hora_cierre: "",
      hora_inicio: "",
      reenvio_correo: "",
      historico_correos: true,
      URL_API: process.env.VUE_APP_URL_API,
      envio_correo: false,
      adjuntos_candidato_string: "",
      gestioningresocorreos: [],
      menu_id: "",
      adjuntos: false,
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
      observacion: " ",
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
      evidencias: [{ observacion: "", file: [] }],
      consulta_texto: [],
      consulta_evidencias: [],
    };
  },
  computed: {
    remainingChars() {
      return 0 + this.temasPrincipales[0].descripcion.length;
    },
    remainingCharsCompromiso() {
      return 0 + this.compromisos[0].descripcion.length;
    },
    remainingCharsObservasion() {
      return 0 + this.compromisos[0].observacion.length;
    },
    remainingCharsCompromiso2() {
      return 0 + this.compromisos[1].descripcion.length;
    },
    remainingCharsObservasion2() {
      return 0 + this.compromisos[1].observacion.length;
    },
    remainingCharsObservasion3() {
      if (this.observacion) {
        return 0 + this.observacion.length;
      }
      return 0;
    },
  },
  watch: {
    $route() {
      this.limpiarFormulario();
    },
    menu() {
      this.getModulo();
    },
  },
  created() {
    this.getModulo();
  },
  async mounted() {
    this.id_registro = this.$route.params.id;

    if (this.id_registro !== undefined) {
      this.getItem(this.id_registro);
    }
    if (this.$route.params.id == undefined) {
      this.geolocal();
    }
  },

  methods: {
    coordenadas(item) {
      console.log(item);
    },
    validateEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailValido = regex.test(this.correo_contacto);
    },
    async geolocal() {
      try {
        // Llamar a obtenerGeolocalizacion y esperar la respuesta
        const result = await this.obtenerGeolocalizacion();
        this.label = "Ubicacion actual";
        this.latitud = String(result.latitud);
        this.longitud = String(result.longitud);
        this.showMap = !this.showMap;
        return true;
      } catch (error) {
        this.showMap = false;
        return false;
      }
    },
    agregarCorreosSeleccionados(correo, observacion) {
      this.correosSeleccionados.correos.push({
        correo: correo,
        observacion: observacion,
      });
    },
    reenviarCorreosSeleccionados() {
      this.enviarCorreos(this.id_registro, 1, this.correosSeleccionados);
      this.correosSeleccionados = [];
      this.reenvioPdf = false;
    },
    async validaLocalizacion() {
      try {
        const resultado = await this.geolocal();
        if (resultado) {
          this.save();
        } else {
          this.showAlert(
            "No se a podido obtener la geolocalización del dispositivo, por favor verifica tu conexión a internet o activa el gps del dispositivo.",
            "error"
          );
        }
      } catch (error) {
        this.showAlert(
          "No se a podido obtener la geolocalización del dispositivo, por favor verifica tu conexión a internet o activa el gps del dispositivo.",
          "error"
        );
      }
    },
    getFileName(filePath) {
      let lastUnderscoreIndex = 0;
      if (filePath) {
        lastUnderscoreIndex = filePath.lastIndexOf("_");
      } else {
        return null;
      }
      if (lastUnderscoreIndex === -1) return filePath;
      return filePath.substring(lastUnderscoreIndex + 1);
    },
    manejarCorreoEnviado() {
      this.historico_correos = true;
      this.historicoCorreos();
    },
    formatearHora(hora) {
      // Extraer las primeras 5 posiciones (HH:MM) de la cadena recibida
      return hora.slice(0, 5); // Devolver solo '01:00'
    },
    reformatearFecha(fechaOriginal) {
      const fechaHora = new Date(fechaOriginal);
      const año = fechaHora.getFullYear();
      const mes = (fechaHora.getMonth() + 1).toString().padStart(2, "0"); // Los meses son indexados desde 0
      const dia = fechaHora.getDate().toString().padStart(2, "0");
      const horas = fechaHora.getHours().toString().padStart(2, "0");
      const minutos = fechaHora.getMinutes().toString().padStart(2, "0");
      const segundos = fechaHora.getSeconds().toString().padStart(2, "0");
      const fechaFormateada = `${dia}/${mes}/${año}  `;
      const horaFormateada = `${horas}:${minutos}:${segundos}`;
      return fechaFormateada + " " + horaFormateada;
    },
    toggleEdit(evidencia) {
      evidencia.edit = !evidencia.edit;
      if (!evidencia.edit) {
        this.saveEvidencia(evidencia);
      }
    },
    saveEvidencia(evidencia) {
      let self = this;
      let config = this.configHeader();
      axios
        .put(
          self.URL_API + "api/v1/seguimientocrmupdateevidencia/" + evidencia.id,
          evidencia,
          config
        )
        .then(function (result) {
          self.showAlert(result.data.message, result.data.status);
        });
    },
    /* funcion para agregar multiples temas */
    /* agregarTema() {
      this.temas.push({ titulo: "", descripcion: "" });
    }, */
    agregarObservacion() {
      this.verLista = this.verLista + 1;
      if (this.evidencias.length <= 10) {
        this.evidencias.push({ body: "", file: [] });
      }
    },
    agregarAsistencia() {
      const indexUltimaAsistencia = this.asistencias.length - 1;
      if (
        this.asistencias[indexUltimaAsistencia].cargo &&
        /*  this.asistencias[indexUltimaAsistencia].firma_hash && */
        this.asistencias[indexUltimaAsistencia].nombre
      ) {
        this.asistencias.push({
          nombre: "",
          cargo: "",
          firma: [],
          show_pad: false,
        });
        return;
      }
      this.showAlert(
        "Debe llenar los campos requeridos de la asistencia ",
        "error"
      );
      return;
    },
    deleteDynamic(array, index, identificador = null) {
      if (identificador != null) {
        this.consulta_texto.splice(index, 1);
        this.evidencias[index].file = [];
      }
      array.splice(index, 1);
    },
    deleteDynamicAsistencia(array, index, identificador = null) {
      if (identificador != null) {
        this.asistencias[index] = {};
      }
      array.splice(index, 1);
    },
    deleteConsultaEvidencia(array, index, identificador = null) {
      if (identificador != null) {
        this.consulta_texto.splice(index, 1);
        this.consulta_evidencias[index] = [];
      }
      array.splice(index, 1);
    },
    /* funcion para cambiar el estado de cada "pad" */
    signature(array, index) {
      console.log(array);
      array.forEach((asistencia) => {
        asistencia.show_pad = false;
      });
      array[index].show_pad = true;
    },
    /* funcion para firmar */
    firma(firma, index) {
      if (this.asistencias[index].show_pad) {
        this.asistencias[index].firma_hash = firma;
        this.funcionGenericaUrlaArchivo(firma, index);
      }

      this.asistencias.forEach((asistencia) => {
        asistencia.show_pad = false;
      });
    },
    funcionGenericaUrlaArchivo(firma, index) {
      var self = this;
      this.urltoFile(firma, index + ".png", "image/png").then(function (file) {
        self.asistencias[index].firma.push(file);
      });
    },
    urltoFile(url, filename, mimeType) {
      return fetch(url)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          return new File([buf], filename, { type: mimeType });
        });
    },
    limpiarFormulario() {
      this.responsable_id = "";
      this.correosSeleccionados = {
        correos: [],
      };
      this.reenvioPdf = false;
      this.correo_responsablePqrsf = "";
      this.correo_responsable1 = "";
      this.correo_responsable2 = "";
      this.bloquea_campos = false;
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
      this.historico_correos = true;
      this.gestioningresocorreos = [];
      this.consulta_evidencias = [];
      this.evidencias = [{ observacion: "", file: [] }];
      this.adjuntos = false;
      this.asistencias = [
        { nombre: "", cargo: "", firma: [], show_pad: false, firma_hash: "" },
      ];
      this.compromisos = [
        {
          titulo: "compromiso1",
          descripcion: "",
          estado_cierre_id: "",
          fecha_cierre: "",
          fecha_inicio: "",
          observacion: "",
          email: "",
          id: "",
        },
        {
          titulo: "compromiso2",
          descripcion: "",
          estado_cierre_id: "",
          fecha_cierre: "",
          fecha_inicio: "",
          observacion: "",
          email: "",
          id: "",
        },
      ];
      this.temasPrincipales = [{ titulo: "tema1", descripcion: "" }];
      this.alcance_visita = "";
      this.objetivo_visita = "";
      this.cargo_visitado = "";
      this.visitado = "";
      this.cargo_visitante = "";
      this.visitante = "";
      this.hora_cierre = "";
      this.hora_inicio = "";
    },
    getItem(id) {
      this.limpiarFormulario();
      let self = this;
      self.loading = true;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/seguimientocrmbyid/" + id, config)
        .then(function (result) {
          self.loading = false;
          self.llenarFormulario(result.data);
          self.historicoCorreos();
        });
    },
    llenarFormulario(item) {
      /* formulario visita */
      this.correo_responsablePqrsf = item.responsable_email;
      this.responsable_id = item.responsable_id;
      this.latitud = item.latitud;
      this.longitud = item.longitud;
      if (this.latitud != null) {
        this.showMap = !this.showMap;
      }
      this.consulta_empresa_cliente = item.nit;
      self.bloquea_campos = true;
      this.asistencias =
        item.asistencias.length > 0
          ? item.asistencias
          : [
              {
                nombre: "",
                cargo: "",
                firma: [],
                show_pad: false,
                firma_hash: "",
              },
            ];
      /*    this.compromisos = [
           {
             titulo: "compromiso1",
             id: "",
             descripcion: "",
             estado_cierre_id: "",
             fecha_cierre: "",
             fecha_inicio: "",
             responsable: "",
             observacion: "",
             responsable_id: "",
           },
           {
             titulo: "compromiso2",
             id: "",
             descripcion: "",
             estado_cierre_id: "",
             fecha_cierre: "",
             fecha_inicio: "",
             responsable: "",
             observacion: "",
             responsable_id: ""
           },
         ]; */
      if (item.compromisos.length > 0) {
        for (let i = 0; i < 2; i++) {
          const compromiso = item.compromisos[i];
          if (compromiso) {
            this.compromisos[i] = compromiso;
          } else {
            this.compromisos[i] = {
              titulo: `compromiso${i + 1}`,
              id: "",
              descripcion: "",
              estado_cierre_id: "",
              fecha_cierre: "",
              fecha_inicio: "",
              responsable: "",
              observacion: "",
              responsable_id: "",
              email: "",
            };
          }
        }
      }
      /*   this.compromisos =
          item.compromisos.length > 0
            ? item.compromisos
            : [
              {
                titulo: "compromiso1",
                id: "",
                descripcion: "",
                estado_cierre_id: "",
                fecha_cierre: "",
                fecha_inicio: "",
                responsable: "",
                observacion: "",
                responsable_id: "",
              },
              {
                titulo: "compromiso2",
                id: "",
                descripcion: "",
                estado_cierre_id: "",
                fecha_cierre: "",
                fecha_inicio: "",
                responsable: "",
                observacion: "",
                responsable_id: ""
              },
            ]; */
      this.formatearFechaCompromisos();
      this.alcance_visita = item.alcance;
      this.objetivo_visita = item.objetivo;
      this.cargo_visitado = item.cargo_visitado;
      this.visitado = item.visitado;
      this.cargo_visitante = item.cargo_visitante;
      this.visitante = item.visitante;
      this.hora_cierre = item.hora_cierre
        ? this.formatearHora(item.hora_cierre)
        : " ";
      this.hora_inicio = item.hora_inicio
        ? this.formatearHora(item.hora_inicio)
        : " ";
      this.temasPrincipales =
        item.temasPrincipales.length > 0
          ? item.temasPrincipales
          : [{ titulo: "tema1", descripcion: "", id: "" }];
      /* finaliza aqui */
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
      this.consulta_evidencias = item.Evidencias;
    },
    formatearFechaCompromisos() {
      this.compromisos.forEach((item, index) => {
        // Usar Vue.set para garantizar reactividad
        const fechaFormateada = this.formateoFechaSinHora(item.fecha_cierre);
        console.log(fechaFormateada);
        if (fechaFormateada) {
          this.$set(this.compromisos, index, {
            ...item,
            fecha_cierre: fechaFormateada,
          });
        }
      });
    },
    formateoFechaSinHora(fechaOriginal) {
      if (fechaOriginal != null) {
        const fecha = new Date(fechaOriginal);
        if (isNaN(fecha.getTime())) {
          console.error("Fecha inválida: ", fechaOriginal);
          return fechaOriginal;
        }
        const year = fecha.getFullYear();
        const month = ("0" + (fecha.getMonth() + 1)).slice(-2);
        const day = ("0" + fecha.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
      }
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
      var self = this;
      const file = event.target.files;
      for (var i = 0; i < file.length; i++) {
        self.evidencias[index].file.push(file[i]);
      }
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
    tomarHoraCierre() {
      const now = new Date();
      const horas = now.getHours().toString().padStart(2, "0");
      const minutos = now.getMinutes().toString().padStart(2, "0");
      const segundos = now.getSeconds().toString().padStart(2, "0");
      const horaActual = `${horas}:${minutos}:${segundos}`;
      this.hora_cierre = horaActual;
    },
    getEmpresasCliente(item = null) {
      if (item != null) {
        this.nit_documento = item.nit;
        this.nombre_contacto = item.nombre;
        this.disableName = true;
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/empresascliente", config)
        .then(function (result) {
          self.empresas_cliente = result.data.filter(
            (empresa) => empresa.nit !== null
          );
        });
    },
    save(tipoSave) {
      if (this.$route.params.id == undefined || this.hora_cierre == " ") {
        this.tomarHoraCierre();
      }

      //validacion de compromisos según si es visita o reunion
      if (
        this.estado_cierre_id == 3 &&
        (this.interaccion_id == 5 || this.interaccion_id == 6)
      ) {
        let missedAsistencia = false;
        this.compromisos.forEach((compromiso) => {
          if (
            compromiso.descripcion != "" &&
            (!compromiso.responsable ||
              !compromiso.estado_cierre_id ||
              compromiso.estado_cierre_id == "0")
          ) {
            missedAsistencia = true;
            this.showAlert(
              "Debe llenar los campos requeridos en compromisos ",
              "error"
            );
            return;
          }
        });
        if (missedAsistencia) {
          return;
        }
      }
      // Validación de PQRSF
      if (
        this.estado_cierre_id == 3 &&
        this.consulta_cierra_pqrsf == null &&
        this.cierra_pqrsf_id == ""
      ) {
        this.showAlert(
          "Para el campo 'Cierra la PQRS' debe seleccionar uno de la lista desplegable ",
          "error"
        );
        return;
      }

      //validaciones para interacciones 5(Visita) y 6(Reunión)
      if (this.interaccion_id == 5 || this.interaccion_id == 6) {
        this.pqrsf_id = 6;
        let missedAsistencia = false;
        this.compromisos.forEach((compromiso) => {
          if (compromiso.descripcion != "" && !compromiso.responsable) {
            missedAsistencia = true;
            this.showAlert(
              "Debe seleccionar de la lista los responsables de los compromisos ",
              "error"
            );
            return;
          }
        });
        if (missedAsistencia) {
          return;
        }
        let lastIndexAsistencia = this.asistencias.length - 1;
        if (this.alcance_visita == "") {
          this.validarCampoSeleccionado("Alcance visita", "no-alcance", 1);
          return;
        }
        if (this.sede_id == "") {
          this.validarCampoSeleccionado("Sede", "no-sede", 2);
          return;
        }
        if (this.nombre_contacto == "") {
          this.validarCampoSeleccionado("Nombre / razón social", "no-name", 1);
          return;
        }
        if (this.nit_documento == "" && this.solicitante_id == 1) {
          this.validarCampoSeleccionado("Nit/identificacion", "no-nit", 2);
          return;
        }
        if (this.nit_documento == "" && this.solicitante_id == 2) {
          this.validarCampoSeleccionado("Nit/identificacion", "no-nit", 1);
          return;
        }
        if (this.pqrsf_id == "") {
          this.validarCampoSeleccionado("PQRSF", "no-tipo-pqrsf", 2);
          return;
        }
        if (this.telefono_contacto == "") {
          this.validarCampoSeleccionado("Telefono de contacto", "no-tel", 1);
          return;
        }
        if (this.objetivo_visita == "") {
          this.validarCampoSeleccionado(
            "Objetivo de la visita",
            "no-objetivo",
            1
          );
          return;
        }
        if (this.cargo_visitado == "") {
          this.validarCampoSeleccionado("Cargo del visitado", "no-visitado", 1);
          return;
        }
        if (this.visitado == "") {
          this.validarCampoSeleccionado(
            "Visita atendida por",
            "no-visitante",
            1
          );
          return;
        }
        if (this.cargo_visitante == "") {
          this.validarCampoSeleccionado(
            "Cargo del visitante",
            "no-cargo-visitante",
            2
          );
          return;
        }
        if (this.visitante == "") {
          this.validarCampoSeleccionado(
            "Visita realizada por",
            "no-visitante-sel",
            2
          );
          return;
        }
        if (this.temasPrincipales[0].descripcion == "") {
          this.validarCampoSeleccionado("Tema", "temaArea", 1);
          return;
        }

        if (
          this.asistencias[lastIndexAsistencia].nombre == "" ||
          this.asistencias[lastIndexAsistencia].cargo == "" ||
          this.asistencias[lastIndexAsistencia].firma_hash == ""
        ) {
          this.showAlert(
            "Debe llenar los campos requeridos para la firma ",
            "error"
          );
          return;
        }
        if (this.estado_cierre_id == "") {
          this.validarCampoSeleccionado("Estado", "no-estado-form", 2);
          return;
        }
        if (this.responsable_id == "") {
          this.validarCampoSeleccionado(
            "Responsable",
            "no-respoonsable-form",
            2
          );
          return;
        }
        if (this.hora_inicio == "") {
          this.validarCampoSeleccionado("Hora inicio de visita", "no-hora", 1);
          return;
        }
        if (this.proceso_id == "") {
          this.validarCampoSeleccionado("Proceso o área", "no-proceso", 2);
          return;
        }
        if (this.solicitante_id == "") {
          this.validarCampoSeleccionado("Solicitante", "no-solicitante", 2);
          return;
        }
      } else {
        if (this.sede_id == "") {
          this.validarCampoSeleccionado("Sede", "no-sede", 2);
          return;
        }
        if (this.proceso_id == "") {
          this.validarCampoSeleccionado("Proceso o área", "no-proceso", 2);
          return;
        }
        if (this.solicitante_id == "") {
          this.validarCampoSeleccionado("Solicitante", "no-solicitante", 2);
          return;
        }
        if (this.nit_documento == "" && this.solicitante_id == 1) {
          this.validarCampoSeleccionado("Nit/identificacion", "no-nit", 2);
          return;
        }
        if (this.nit_documento == "" && this.solicitante_id == 2) {
          this.validarCampoSeleccionado("Nit/identificacion", "no-nit", 1);
          return;
        }
        if (this.nombre_contacto == "") {
          this.validarCampoSeleccionado("Nombre / razón social", "no-name", 1);
          return;
        }
        if (this.telefono_contacto == "") {
          this.validarCampoSeleccionado("Telefono de contacto", "no-tel", 1);
          return;
        }
        if (this.estado_cierre_id == "") {
          this.validarCampoSeleccionado("Estado", "no-estado-form", 2);
          return;
        }
        if (this.pqrsf_id == "") {
          this.validarCampoSeleccionado("PQRSF", "no-tipo-pqrsf", 2);
          return;
        }
        if (this.responsable_id == "") {
          this.validarCampoSeleccionado(
            "Responsable",
            "no-respoonsable-form",
            2
          );
          return;
        }
      }

      let correosResponsables = {
        correos: [
          {
            correo: this.correo_contacto,
            observacion: "",
          },
          {
            correo: this.correo_responsablePqrsf,
            observacion: "",
          },
          {
            correo: this.compromisos[0].email,
            observacion: this.compromisos[0].observacion,
          },
          {
            correo: this.compromisos[1].email,
            observacion: this.compromisos[1].observacion,
          },
        ],
      };

      console.log(this.asistencias);
      let self = this;
      let config = this.configHeader();
      const formulario = new FormData();
      if (!this.emailValido || this.correo_contacto == "") {
        self.showAlert("Ingrese un correo de contacto valido", "error");
        return;
      }
      // Creacion del formulario con los datos que no corresponden a visita
      formulario.append("nombre_contacto", this.nombre_contacto);
      formulario.append("latitud", this.latitud);
      formulario.append("longitud", this.longitud);
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
      formulario.append(
        "cierre_pqrsf",
        this.consulta_cierra_pqrsf == null ? "" : this.consulta_cierra_pqrsf
      );
      formulario.append("responsable", this.consulta_responsable);
      formulario.append("responsable_id", this.responsable_id);
      //creacion del formulario de visita
      if (this.interaccion_id == 5 || this.interaccion_id == 6) {
        formulario.append("compromisos", JSON.stringify(this.compromisos));
        formulario.append(
          "temasPrincipales",
          JSON.stringify(this.temasPrincipales)
        );
        formulario.append("hora_inicio", this.hora_inicio);
        formulario.append("hora_cierre", this.hora_cierre);
        formulario.append("cargo_visitante", this.cargo_visitante);
        formulario.append("cargo_atendio", this.cargo_visitado);
        formulario.append("objetivo_visita", this.objetivo_visita);
        formulario.append("alcance_visita", this.alcance_visita);
        formulario.append("visitante", this.visitante);
        formulario.append("visitado", this.visitado);
        this.asistencias.forEach(function (item, index) {
          formulario.append(
            "asistencia[" + index + "][0]",
            JSON.stringify({
              nombre: item.nombre,
              cargo: item.cargo,
            })
          );
          Array.isArray(item.firma)
            ? item.firma.forEach(function (item2, index2) {
                formulario.append(
                  "asistencia[" + index + "][" + (index2 + 1) + "]",
                  item2
                );
              })
            : item.firma;
        });
      }

      // Evidencias
      this.evidencias.forEach(function (item, index) {
        formulario.append("imagen[" + index + "][0]", item.observacion);
        item.file.forEach(function (item2, index2) {
          formulario.append(
            "imagen[" + index + "][" + (index2 + 1) + "]",
            item2
          );
        });
      });

      // Asistencias

      var id = this.$route.params.id;
      var url =
        id != null
          ? `${self.URL_API}api/v1/seguimientocrm/${id}`
          : `${self.URL_API}api/v1/seguimientocrm`;

      axios
        .post(url, formulario, config)
        .then((result) => {
          self.getItem(result.data.id);
          self.showAlert(result.data.message, result.data.status);
          const id = result.data.id;
          if (tipoSave == 1) {
            self
              .enviarCorreos(id, tipoSave, correosResponsables)
              .then(() => {
                self.showAlert("correo enviado correctamente", "success");
              })
              .catch(function (error) {
                console.log(error);
                self.showAlert(
                  "Error al enviar correo verifique el correo de contacto",
                  "error"
                );
              });
          }
          const rutaActual = self.$route.path;
          const nuevosParametros = { ...rutaActual.params, id: result.data.id };
          self.$router.replace({ ...rutaActual, params: nuevosParametros });
        })
        .then(() => {
          this.historicoCorreos();
          if (tipoSave == 2) {
            this.descargarInforme(2);
          }
        })
        .catch(function (error) {
          console.error("Error al guardar el formulario:", error);
        });
    },
    eliminarDocumento(item) {
      let self = this;
      let config = this.configHeader();
      axios
        .delete(
          self.URL_API +
            "api/v1/eliminararevidencia/" +
            this.$route.params.id +
            "/" +
            item.id,
          config
        )
        .then(function (result) {
          self.showAlert(result.data.message, result.data.status);
          if (result.data.status == "success") {
            self.consulta_evidencias = self.consulta_evidencias.filter(
              (evidencia) => evidencia.id !== item.id
            );
          }
        });
    },
    messageDelete(item) {
      let self = this;
      var title = "Estas seguro de elimiar el resgistro?";
      this.$swal
        .fire({
          title: title,
          text: "Esta operación no se puede revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            self.eliminarDocumento(item);
          }
        });
    },
    enviarCorreos(id, tipoSave, correosResponsables) {
      this.loading = true;
      let config = this.configHeader();
      axios
        .post(
          this.URL_API + "api/v1/seguimientocrmpdf/" + id + "/" + tipoSave,
          correosResponsables,
          config
        )
        .then((response) => {
          this.showAlert(response.data.message, response.data.status);
          this.loading = false;
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
    reenviar(item) {
      this.envio_correo = true;
      setTimeout(() => {
        this.reenvio_correo = item;
      }, 1000);
    },
    getEstadoCompromisosCrm(estado, index) {
      if (estado != null) {
        this.compromisos[index].estado_cierre_id = estado.id; // Asigna el ID del estado al compromiso correspondiente // Asigna el nombre del estado si es necesari
      }
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/estadocirrecrm", config)
        .then(function (result) {
          self.estados_cierre = result.data;
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
    historicoCorreos() {
      var self = this;
      var config = this.configHeader();
      axios
        .get(
          self.URL_API +
            "api/v1/consultacorreo/" +
            self.menu_id +
            "/" +
            self.$route.params.id,
          config
        )
        .then(function (result) {
          self.gestioningresocorreos = result.data;
        });
    },
    getModulo() {
      var self = this;
      if (self.$route.path != "/navbar/gestion-ingresosl") {
        var ruta =
          self.$route.path.split("/")[1] + "/" + self.$route.path.split("/")[2];
        this.menu.forEach(function (item) {
          item.opciones.forEach((element) => {
            if (element.url == ruta) {
              self.menu_id = element.id;
              self.historicoCorreos();
            }
          });
        });
      }
    },
    descargarInforme(id) {
      this.idSeleccionado = id;
      if (this.$route.params.id !== undefined) {
        const urlDescarga =
          this.URL_API +
          "api/v1/seguimientocrmpdf/" +
          this.$route.params.id +
          "/" +
          this.idSeleccionado;
        window.open(urlDescarga, "_blank");
      }
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
        if (item.id != 1) {
          this.disableName = false;
        }
      }
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/solicitantecrm", config)
        .then(function (result) {
          self.solicitantes = result.data;
        });
    },
    enviarArchivos(booleano, ruta_archivo, nombre) {
      var self = this;
      if (booleano) {
        this.adjuntos_candidato.push({
          nombre_archivo: nombre,
          ruta_archivo: ruta_archivo,
        });
      } else {
        this.adjuntos_candidato.forEach(function (item, index) {
          if (item.nombre_archivo == nombre) {
            self.adjuntos_candidato.splice(index, 1);
          }
        });
      }
      this.adjuntos_candidato_string = JSON.stringify(self.adjuntos_candidato);
    },
    lanzarLoading(loading) {
      this.loading = loading;
    },
    getTipoArchivoSubir() {
      let config = this.configHeader();
      axios
        .get(self.URL_API + "/api/v1/extensionArchivos", config)
        .then((result) => {
          return result.data;
        });
    },
    getEstadoCierreCrm(item = null) {
      let self = this;
      if (item != null) {
        this.estado_cierre_id = item.id;
        this.consulta_estado_cierre_id = item.nombre;
        if (item.id == 4) {
          this.cierra_pqrsf_id = "";
          this.consulta_cierra_pqrsf = "";
        }
      }
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/estadocirrecrm", config)
        .then(function (result) {
          self.estados_cierre = self.estados_cierre = result.data.filter(
            (estado) => estado.tipo_estado == 2
          );
        });
    },
    valida_envioCorreo() {
      if (this.correo_empresa == null && this.correo_laboratorio == null) {
        this.showAlert(
          "Para enviar el correo debe diligenciar por lo menos el correo de la empresa y guardar el formulario",
          "error"
        );
        return true;
      }
    },
    validarCampoSeleccionado(mensaje, id_campo, tipo) {
      if (tipo == 1) {
        /* this.showAlert(`El campo ${mensaje} es obligatorio`, "error"); */
        setTimeout(() => {
          const input = document.getElementById(id_campo);
          if (input) {
            input.focus();
          }
        }, 0);
      }
      if (tipo == 2) {
        /*     this.showAlert(
          `En el campo "${mensaje}" debe seleccionar uno de la lista desplegable.`,
          "error"
        ); */
        setTimeout(() => {
          const input = document.getElementById(id_campo);
          if (input) {
            input.focus();
          }
        }, 0);
      }
    },
    envioCorreo(id) {
      let self = this;
      if (this.valida_envioCorreo()) {
        return;
      }
      this.idSeleccionado = id;
      this.loading = true;
      this.scrollTop();
      let config = this.configHeader();
      axios
        .get(
          self.URL_API +
            "api/v1/gestioningresospdf/" +
            self.menu_id +
            "/" +
            self.$route.params.id +
            "/" +
            this.idSeleccionado,
          config
        )
        .then(function (result) {
          // self.estados_ingreso = result.data
          self.showAlert(result.data.message, result.data.status);
          self.loading = false;
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
    checkCharLimit() {
      if (this.temasPrincipales[0].descripcion.length > this.charLimit_tema) {
        this.temasPrincipales[0].descripcion =
          this.temasPrincipales[0].descripcion.slice(0, this.charLimit_tema);
      }
    },
    getCargosPlanta(item = null) {
      let self = this;
      if (item != null) {
        this.cargoPlanta_id = item.id;
        this.cargo_visitante = item.cargo;
      }
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/cargosPlanta", config)
        .then(function (result) {
          self.cargos_planta = result.data;
        });
    },
    getUsuariosLideres(item = null, index = null) {
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
          case 3:
            this.visitante_id = item.id;
            this.visitante = item.nombre;
            break;
          case 4:
            this.compromisos[0].responsable = item.nombre;
            this.correo_responsable1 = item.email;
            break;
          case 5:
            this.compromisos[1].responsable = item.nombre;
            this.correo_responsable2 = item.email;
            break;
        }
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/userslist", config)
        .then(function (result) {
          self.usuarios_lider = result.data.filter((user) => user.lider == 1);
        });
    },
    getUsuarios(item = null, index = null) {
      if (item != null) {
        switch (index) {
          case 1:
            this.responsable_id = item.id;
            this.consulta_responsable = item.nombre;
            this.correo_responsablePqrsf = item.email;
            break;
          case 2:
            this.cierra_pqrsf_id = item.id;
            this.consulta_cierra_pqrsf = item.nombre;
            break;
          case 3:
            this.visitante_id = item.id;
            this.visitante = item.nombre;
            break;
          case 4:
            this.compromisos[0].responsable = item.nombre;
            this.compromisos[0].email = item.email;
            this.compromisos[0].responsable_id = item.id;
            break;
          case 5:
            this.compromisos[1].responsable = item.nombre;
            this.compromisos[1].email = item.email;
            this.compromisos[1].responsable_id = item.id;
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
  margin: 0;
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

.ver {
  background-color: #006b3f;
  color: white;
}

.fontSize-5 {
  font-size: 0.5em;
}

.gap-8 {
  gap: 6em;
}

.char-count {
  font-size: 12px;
  color: #6c757d;
  margin-top: 10px;
}
</style>
