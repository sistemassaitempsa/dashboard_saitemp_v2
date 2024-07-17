<template>
  <div class="container">
    <h2>Matriz de riesgos</h2>
    <form class="was-validated" @submit.prevent="save()">
      <div id="seccion">
        <div class="row">
          <div class="col">
            <label class="form-label">Tipo de proceso: *</label>
            <select
              @click="getTiposProceso"
              class="form-select"
              aria-label="Default select example"
              v-model="tipo_proceso"
              required
            >
              <option
                :value="item"
                v-for="(item, index) in tipos_proceso"
                :key="index"
              >
                {{ item.nombre }}
              </option>
            </select>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <label class="form-label">Nombre del proceso: *</label>
            <select
              @click="getNombresProceso"
              class="form-select"
              aria-label="Default select example"
              v-model="nombre_proceso"
              required
            >
              <option
                :value="item"
                v-for="(item, index) in nombres_proceso"
                :key="index"
              >
                {{ item.nombre }}
              </option>
            </select>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="form-label">Nombre del riesgo: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="nombre_riesgo"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <label class="form-label">Oportunidad: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="oportunidad"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="form-label">Causa: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="causa"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <label class="form-label">Plan de acción: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="plan_accion"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="form-label">Consecuencia: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="consecuencia"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <label class="form-label">Efecto: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="efecto"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="form-label">Amenaza: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="amenaza"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <label class="form-label">Oportunidad: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="oportunidad2"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <ul class="nav nav-tabs mt-3 mb-2" id="tab">
          <li class="nav-item">
            <a
              :class="['nav-link', { active: tab_amenaza }]"
              :style="{
                backgroundColor: tab_amenaza ? '#339c66' : '',
                color: tab_amenaza ? 'white' : 'black',
              }"
              @click="
                (tab_amenaza = true), (tab_oportunidad = false), (indice = 0)
              "
              >Amenaza</a
            >
          </li>
          <li class="nav-item">
            <a
              :class="['nav-link', { active: tab_oportunidad }]"
              :style="{
                backgroundColor: tab_oportunidad ? '#339c66' : '',
                color: tab_oportunidad ? 'white' : 'black',
              }"
              @click="
                (tab_amenaza = false), (tab_oportunidad = true), (indice = 1)
              "
              >Oportunidad</a
            >
          </li>
        </ul>

        <div>
          <div class="row">
            <div class="col">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Probabilidad
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <select
                    @click="getNivelProbabilidad"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="probabilidad[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in nivel_probabilidad"
                      :key="index"
                    >
                      {{ item.nivel }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <input
                    type="text"
                    class="form-control"
                    autocomplete="off"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="probabilidad[indice].probabilidad"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Impacto
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <select
                    @click="getNivelImpacto"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="impacto[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in nivel_impacto"
                      :key="index"
                    >
                      {{ item.nivel }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <input
                    type="text"
                    class="form-control"
                    autocomplete="off"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="impacto[indice].impacto"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Total
                </div>
                <div class="col">
                  <label class="form-label">Impacto * probabilidad: </label>
                  <input
                    type="text"
                    class="form-control"
                    autocomplete="off"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="resultado[indice].total"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label class="form-label">{{
                indice == 0 ? "Nivel de riesgo: *" : "Nivel de oportunidad: *"
              }}</label>
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                id="direccion_empresa"
                :style="`background-color: ${
                  nivel_riesgo_oportunidad[this.indice].background
                }; color: ${nivel_riesgo_oportunidad[this.indice].color}`"
                aria-describedby="emailHelp"
                v-model="nivel_oportunidad_riesgo[indice].nivel"
                disabled
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
            <div class="col">
              <label class="form-label">Tratamiento: *</label>
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                id="direccion_empresa"
                :style="`background-color: ${nivel_riesgo_oportunidad[indice].background}; color: ${nivel_riesgo_oportunidad[indice].color}`"
                aria-describedby="emailHelp"
                v-model="nivel_oportunidad_riesgo[indice].tratamiento"
                disabled
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label class="form-label">Método de identificación: *</label>
              <select
                @click="getMetodosIdentificacion"
                class="form-select"
                aria-label="Default select example"
                v-model="metodo_identificacion[indice]"
                required
              >
                <option
                  :value="item"
                  v-for="(item, index) in metodos_identificacion"
                  :key="index"
                >
                  {{ item.nombre }}
                </option>
              </select>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
            <div class="col">
              <label class="form-label">Factor: *</label>
              <select
                @click="getFactores"
                class="form-select"
                aria-label="Default select example"
                v-model="factor[indice]"
                required
              >
                <option
                  :value="item"
                  v-for="(item, index) in factores"
                  :key="index"
                >
                  {{ item.nombre }}
                </option>
              </select>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label class="form-label">Control: * </label>
              <textarea
                id="novedades"
                class="form-control"
                rows="1"
                v-model="control[indice].control"
                required
              ></textarea>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
            <div class="col">
              <label class="form-label">soporte: * </label>
              <textarea
                id="novedades"
                class="form-control"
                rows="1"
                v-model="soporte[indice].soporte"
                required
              ></textarea>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label class="form-label">Seguimiento: * </label>
              <select
                @click="getSeguimientos"
                class="form-select"
                aria-label="Default select example"
                v-model="seguimiento[indice]"
                required
              >
                <option
                  :value="item"
                  v-for="(item, index) in seguimientos"
                  :key="index"
                >
                  {{ item.nombre }}
                </option>
              </select>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
            <div class="col mb-3" v-if="indice == 1">
              <label for="formFileMultiple" class="form-label"
                >Adjuntar evidencia</label
              >
              <div class="input-group mb-3">
                <input
                  class="form-control"
                  ref="inputFile"
                  type="file"
                  @change="cargarArchivo($event)"
                  id="formFileMultiple"
                  multiple
                />
                <span
                  style="cursor: pointer"
                  class="input-group-text"
                  @click="quitarAdjuntos()"
                  id="basic-addon1"
                  >Quitar archivo</span
                >
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Documento registrado
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <select
                    @click="getDocumentosRegistrados"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="documento_registrado[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in documentos_registrados"
                      :key="index"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    class="form-control"
                    autocomplete="off"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="documento_registrado[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Clase de control
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <select
                    @click="getClasesControl"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="clase_control[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in clases_control"
                      :key="index"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    class="form-control"
                    autocomplete="off"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="clase_control[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Frecuencia del control
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <select
                    @click="getFrecuenciasControl"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="frecuencia_control[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in frecuencias_control"
                      :key="index"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    class="form-control"
                    autocomplete="off"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="frecuencia_control[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Tipo de control
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <select
                    @click="getTiposControl"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="tipo_control[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in tipos_control"
                      :key="index"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    class="form-control"
                    autocomplete="off"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="tipo_control[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Existe evidencia
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <select
                    @click="getEvidencias"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="existe_evidencia[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in existe_evidencias"
                      :key="index"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    class="form-control"
                    autocomplete="off"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="existe_evidencia[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Se ejecutó eficaz
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <select
                    @click="getEjecucionesEficaces"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="ejecucion_eficas[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in ejecuciones_eficaces"
                      :key="index"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    class="form-control"
                    autocomplete="off"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="ejecucion_eficas[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Resultado del control
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <input
                    type="text"
                    :style="`background-color: ${
                      this.resultado_control[this.indice].background
                    }; color: ${this.resultado_control[this.indice].color}`"
                    class="form-control"
                    autocomplete="off"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="resultado_control[indice].descripcion"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    :style="`background-color: ${
                      this.resultado_control[this.indice].background
                    }; color: ${this.resultado_control[this.indice].color}`"
                    class="form-control"
                    autocomplete="off"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="resultado_control[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul class="nav nav-tabs mt-3 mb-2">
          <li class="nav-item">
            <a
              :class="['nav-link', { active: tab_amenaza }]"
              :style="{
                backgroundColor: tab_amenaza ? '#339c66' : '',
                color: tab_amenaza ? 'white' : 'black',
              }"
              @click="
                (tab_amenaza = true),
                  (tab_oportunidad = false),
                  (indice = 0),
                  scrollToDiv()
              "
              >Amenaza</a
            >
          </li>
          <li class="nav-item">
            <a
              :class="['nav-link', { active: tab_oportunidad }]"
              :style="{
                backgroundColor: tab_oportunidad ? '#339c66' : '',
                color: tab_oportunidad ? 'white' : 'black',
              }"
              @click="
                (tab_amenaza = false),
                  (tab_oportunidad = true),
                  (indice = 1),
                  scrollToDiv()
              "
              >Oportunidad</a
            >
          </li>
        </ul>
        <div class="row mb-5">
          <!-- <div class="col">
            <label class="form-label">Responsable: *</label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="direccion_empresa"
              required
              aria-describedby="emailHelp"
              v-model="responsable"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div> -->
          <div class="col">
            <label class="form-label">Responsable: *</label>
            <select
              @click="getLideres"
              class="form-select"
              aria-label="Default select example"
              required
              v-model="lider"
            >
              <option
                :value="item"
                v-for="(item, index) in lideres"
                :key="index"
              >
                {{ item.nombre }}
              </option>
            </select>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <label class="form-label">Última revisión: *</label>
            <input
              type="date"
              class="form-control"
              autocomplete="off"
              id="direccion_empresa"
              required
              aria-describedby="emailHelp"
              v-model="ultima_revision"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
      </div>
      <!-- :disabled="deshabilitar_boton" -->
      <button class="btn btn-success m-4" type="submit">
        Guardar formulario
      </button>
    </form>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import { Token } from "../Mixins/Token.js";

export default {
  components: {},
  mixins: [Token],
  props: {},
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      mensaje_error: "¡Este campo debe ser diligenciado!",
      tipo_proceso: {},
      nombre_proceso: {},
      causa: "",
      nombre_riesgo: "",
      plan_accion: "",
      oportunidad: "",
      probabilidad: [{}, {}],
      impacto: [{}, {}],
      documento_registrado: [{}, {}],
      clase_control: [{}, {}],
      frecuencia_control: [{}, {}],
      tipo_control: [{}, {}],
      existe_evidencia: [{}, {}],
      ejecucion_eficas: [{}, {}],
      metodo_identificacion: [{}, {}],
      factor: [{}, {}],
      seguimiento: [{}, {}],
      control: [{}, {}],
      soporte: [{}, {}],
      nivel_oportunidad_riesgo: [{}, {}],
      plan_accion: "",
      consecuencia: "",
      efecto: "",
      amenaza: "",
      oportunidad2: "",
      tab_amenaza: true,
      tab_oportunidad: false,
      indice: 0,
      resultado: [{}, {}],
      resultado_control: [{}, {}],
      nivel_probabilidad: [],
      nivel_impacto: [],
      tipos_proceso: [],
      nombres_proceso: [],
      metodos_identificacion: [],
      factores: [],
      seguimientos: [],
      documentos_registrados: [],
      clases_control: [],
      frecuencias_control: [],
      tipos_control: [],
      existe_evidencias: [],
      ejecuciones_eficaces: [],
      niveles_probabilidad: [],
      responsable: "",
      ultima_revision: "",
      color_celda_oportunidades: "",
      nivel_riesgo_oportunidad: [{}, {}],
      matriz_oportunidades: [],
      matriz_amenazas: [],
      controles: [],
      lideres: [],
      lider: {},
      riesgo_id: this.$route.params.id,
    };
  },
  computed: {},
  watch: {
    documento_registrado() {
      this.getResultadoControl();
    },
    clase_control() {
      this.getResultadoControl();
    },
    frecuencia_control() {
      this.getResultadoControl();
    },
    tipo_control() {
      this.getResultadoControl();
    },
    existe_evidencia() {
      this.getResultadoControl();
    },
    ejecucion_eficas() {
      this.getResultadoControl();
    },
    indice() {
      if (this.nivel_riesgo_oportunidad[this.indice].background == undefined) {
        this.nivel_riesgo_oportunidad[this.indice].background = "#e9ecef";
      } else {
        this.nivel_riesgo_oportunidad[this.indice].background =
          this.nivel_riesgo_oportunidad[this.indice].background;
        this.nivel_riesgo_oportunidad[this.indice].color =
          this.nivel_riesgo_oportunidad[this.indice].color;
      }

      if (this.resultado_control[this.indice].background == undefined) {
        this.resultado_control[this.indice].background = "#e9ecef";
      } else {
        this.resultado_control[this.indice].background =
          this.resultado_control[this.indice].background;
        this.resultado_control[this.indice].color =
          this.resultado_control[this.indice].color;
      }
    },
    color_celda_oportunidades() {
      this.nivel_riesgo_oportunidad[this.indice].background =
        this.color_celda_oportunidades;
      this.nivel_riesgo_oportunidad[this.indice].color =
        this.color_celda_oportunidades === "yellow" ? "black" : "white";
    },
    impacto() {
      if (
        this.impacto[this.indice].nivel != undefined &&
        this.probabilidad[this.indice].nivel != undefined
      ) {
        let total = "";
        total =
          parseInt(this.impacto[this.indice].nivel) *
          parseInt(this.probabilidad[this.indice].nivel);
        this.resultado[this.indice].total = total + " %";
        this.oportunidadTratamiento(total);
      }
    },
    probabilidad() {
      if (
        this.impacto[this.indice].nivel != undefined &&
        this.probabilidad[this.indice].nivel != undefined
      ) {
        let total = "";
        total =
          parseInt(this.probabilidad[this.indice].nivel) *
          parseInt(this.impacto[this.indice].nivel);
        this.resultado[this.indice].total = total + " %";
        this.oportunidadTratamiento(total);
      }
    },
  },
  mounted() {
    this.getTiposProceso()
    this.getNombresProceso()
    this.getNivelProbabilidad()
    this.getNivelImpacto()
    this.getMetodosIdentificacion()
    this.getFactores()
    this.getSeguimientos()
    this.getControl();
    this.getMatrizOportunidades();
    this.getMatrizAmenazas();
    if (this.riesgo_id != undefined) {
      this.getItems();
    }
  },
  methods: {
    getItems() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/matrizriesgobyid/" + self.riesgo_id, config)
        .then(function (result) {
          self.llenarFormulario(result.data);
        });
    },
    llenarFormulario(formulario) {
      console.log(formulario);
      
        this.nombre_riesgo = formulario.nombre_riesgo
        this.oportunidad = formulario.oportunidad
        this.causa = formulario.causa
        this.plan_accion = formulario.plan_accion
        this.consecuencia = formulario.consecuencia
        this.efecto = formulario.efecto
        this.amenaza = formulario.amenaza
        this.oportunidad2 = formulario.oportunidad_2
        this.tipo_proceso = this.tipos_proceso[formulario.a_tipo_proceso_id]
        this.nombre_proceso = this.nombres_proceso[formulario.a_nombre_proceso_id]
        this.probabilidad[this.indice] = this.nivel_probabilidad[formulario.a_nivel_probabilidad]
        this.impacto[this.indice] = this.nivel_impacto[formulario.a_nivel_impacto]
        this.metodo_identificacion[this.indice] = this.metodos_identificacion[formulario.a_metodo_identificacion_id]
        this.factor[this.indice] = this.factores[formulario.a_factor_id]
        // this.control[this.indice].control = formulario.a_
        // this.soporte[this.indice].soporte = formulario.a_
        this.seguimiento[this.indice] = this.seguimientos[formulario.a_seguimiento_id]
        this.algo = formulario.a_probabilidad
        this.algo = formulario.a_nivel_probabilidad
        this.algo = formulario.a_impacto_id
        this.algo = formulario.a_impacto
        this.algo = formulario.a_nivel_impacto
        this.algo = formulario.a_metodo_identificacion_id
        this.algo = formulario.a_metodo_identificacion
        this.algo = formulario.a_factor_id
        this.algo = formulario.a_factor
        this.algo = formulario.a_seguimiento_id
        this.algo = formulario.a_seguimiento
        this.algo = formulario.a_documento_registrado_id
        this.algo = formulario.a_documento_registrado
        this.algo = formulario.a_documento_registrado_peso
        this.algo = formulario.a_clase_control_id
        this.algo = formulario.a_clase_control
        this.algo = formulario.a_clase_control_peso
        this.algo = formulario.a_frecuencia_control_id
        this.algo = formulario.a_frecuencia_control
        this.algo = formulario.a_frecuencia_control_peso
        this.algo = formulario.a_tipo_control_id
        this.algo = formulario.a_tipo_control
        this.algo = formulario.a_tipo_control_peso
        this.algo = formulario.a_existe_evidencia_id
        this.algo = formulario.a_existe_evidencia
        this.algo = formulario.a_existe_evidencia_peso
        this.algo = formulario.a_ejecucion_eficaz_id
        this.algo = formulario.a_ejecucion_eficaz
        this.algo = formulario.a_ejecucion_eficaz_peso
        this.algo = formulario.o_probabilidad_id
        this.algo = formulario.o_probabilidad
        this.algo = formulario.o_nivel_probabilidad
        this.algo = formulario.o_impacto_id
        this.algo = formulario.o_impacto
        this.algo = formulario.o_nivel_impacto
        this.algo = formulario.o_metodo_identificacion_id
        this.algo = formulario.o_metodo_identificacion
        this.algo = formulario.o_factor_id
        this.algo = formulario.o_factor
        this.algo = formulario.o_seguimiento_id
        this.algo = formulario.o_seguimiento
        this.algo = formulario.o_documento_registrado_id
        this.algo = formulario.o_documento_registrado
        this.algo = formulario.o_documento_registrado_peso
        this.algo = formulario.o_clase_control_id
        this.algo = formulario.o_clase_control
        this.algo = formulario.o_clase_control_peso
        this.algo = formulario.o_frecuencia_control_id
        this.algo = formulario.o_frecuencia_control
        this.algo = formulario.o_frecuencia_control_peso
        this.algo = formulario.o_tipo_control_id
        this.algo = formulario.o_tipo_control
        this.algo = formulario.o_tipo_control_peso
        this.algo = formulario.o_existe_evidencia_id
        this.algo = formulario.o_existe_evidencia
        this.algo = formulario.o_existe_evidencia_peso
        this.algo = formulario.o_ejecucion_eficaz_id
        this.algo = formulario.o_ejecucion_eficaz
        this.algo = formulario.o_ejecucion_eficaz_peso
      
    },
    getNivelImpacto() {
      if (this.nivel_impacto.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/nivelimpacto", config)
          .then(function (result) {
            self.nivel_impacto = result.data;
          });
      }
    },
    getNivelProbabilidad() {
      if (this.nivel_probabilidad.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/nivelprobabilidad", config)
          .then(function (result) {
            self.nivel_probabilidad = result.data;
          });
      }
    },
    getTiposProceso() {
      if (this.tipos_proceso.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/tiposproceso", config)
          .then(function (result) {
            self.tipos_proceso = result.data;
          });
      }
    },
    getNombresProceso() {
      if (this.nombres_proceso.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/nombresproceso", config)
          .then(function (result) {
            self.nombres_proceso = result.data;
          });
      }
    },
    getMetodosIdentificacion() {
      if (this.metodos_identificacion.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/metodosidentificacion", config)
          .then(function (result) {
            self.metodos_identificacion = result.data;
          });
      }
    },
    getFactores() {
      if (this.factores.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/factores", config)
          .then(function (result) {
            self.factores = result.data;
          });
      }
    },
    getSeguimientos() {
      if (this.seguimientos.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/seguimientos", config)
          .then(function (result) {
            self.seguimientos = result.data;
          });
      }
    },
    getDocumentosRegistrados() {
      if (this.documentos_registrados.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/documentosregistrados", config)
          .then(function (result) {
            self.documentos_registrados = result.data;
          });
      }
    },
    getClasesControl() {
      if (this.clases_control.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/clasescontrol", config)
          .then(function (result) {
            self.clases_control = result.data;
          });
      }
    },
    getFrecuenciasControl() {
      if (this.frecuencias_control.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/frecuenciascontrol", config)
          .then(function (result) {
            self.frecuencias_control = result.data;
          });
      }
    },
    getTiposControl() {
      if (this.tipos_control.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/tiposcontrol", config)
          .then(function (result) {
            self.tipos_control = result.data;
          });
      }
    },
    getEvidencias() {
      if (this.existe_evidencias.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/existeevidencias", config)
          .then(function (result) {
            self.existe_evidencias = result.data;
          });
      }
    },
    getEjecucionesEficaces() {
      if (this.ejecuciones_eficaces.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/ejecucioneseficaces", config)
          .then(function (result) {
            self.ejecuciones_eficaces = result.data;
          });
      }
    },
    getControl() {
      if (this.controles.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/riesgoscontrol", config)
          .then(function (result) {
            self.controles = result.data;
          });
      }
    },
    getMatrizOportunidades() {
      if (this.matriz_oportunidades.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/matrizamenazas", config)
          .then(function (result) {
            self.matriz_oportunidades = result.data;
          });
      }
    },
    getMatrizAmenazas() {
      if (this.matriz_amenazas.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/matrizoportunidades", config)
          .then(function (result) {
            self.matriz_amenazas = result.data;
          });
      }
    },
    scrollToDiv() {
      document.getElementById("tab").scrollIntoView({ behavior: "smooth" });
    },
    getResultadoControl() {
      var self = this;
      if (
        this.documento_registrado[this.indice].peso != undefined &&
        this.clase_control[this.indice].peso != undefined &&
        this.frecuencia_control[this.indice].peso != undefined &&
        this.tipo_control[this.indice].peso != undefined &&
        this.existe_evidencia[this.indice].peso != undefined &&
        this.ejecucion_eficas[this.indice].peso != undefined
      ) {
        var peso_total =
          parseInt(this.documento_registrado[this.indice].peso) +
          parseInt(this.clase_control[this.indice].peso) +
          parseInt(this.frecuencia_control[this.indice].peso) +
          parseInt(this.tipo_control[this.indice].peso) +
          parseInt(this.existe_evidencia[this.indice].peso) +
          parseInt(this.ejecucion_eficas[this.indice].peso);

        this.resultado_control[this.indice].peso = peso_total;
        this.controles.forEach(function (item) {
          if (item.peso == 0) {
            self.getColorCeldaResultadoControl(item);
          } else {
            var peso = item.peso.split("-");
            if (peso_total >= peso[0] && peso_total <= peso[1]) {
              self.getColorCeldaResultadoControl(item);
            }
          }
        });
      }
    },
    getColorCeldaResultadoControl(item) {
      this.resultado_control[this.indice].descripcion = item.control;
      this.resultado_control[this.indice].background = item.color;
      this.resultado_control[this.indice].color =
        item.color === "yellow" ? "black" : "white";
    },
    oportunidadTratamiento(total) {
      if (this.indice == 0) {
        this.recorreMatriz(this.matriz_amenazas, total);
      } else {
        this.recorreMatriz(this.matriz_oportunidades, total);
      }
    },
    recorreMatriz(matriz, total) {
      var self = this;
      matriz.forEach((item) => {
        if (item.peso_celda == total) {
          self.nivel_oportunidad_riesgo[self.indice].nivel = item.atributo_1;
          self.nivel_oportunidad_riesgo[self.indice].tratamiento =
            item.atributo_2;
          self.color_celda_oportunidades = item.color;
        }
      });
    },
    formatInputUpperCase(value) {
      const formattedValue = value.toUpperCase();
      return formattedValue;
    },
    getLideres() {
      if (this.lideres.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/lideres", config)
          .then(function (result) {
            self.lideres = result.data;
          });
      }
    },
    save() {
      let self = this;
      let form = this.crearObjetoRiesgo();
      let config = this.configHeader();
      axios
        .post(self.URL_API + "api/v1/matrizriesgo", form, config)
        .then(function (result) {
          console.log(result);
        });
    },
    crearObjetoRiesgo() {
      let objeto_riesgo = {
        tipo_proceso: this.tipo_proceso,
        nombre_proceso: this.nombre_proceso,
        nombre_riesgo: this.nombre_riesgo,
        oportunidad: this.oportunidad,
        causa: this.causa,
        plan_accion: this.plan_accion,
        consecuencia: this.consecuencia,
        efecto: this.efecto,
        amenaza: this.amenaza,
        oportunidad2: this.oportunidad2,
        a_probabilidad: this.probabilidad[0],
        a_impacto: this.impacto[0],
        a_total: this.resultado[0].total,
        a_nivel_riesgo: this.nivel_oportunidad_riesgo[0].nivel,
        a_tratamiento: this.nivel_oportunidad_riesgo[0].tratamiento,
        a_metodo_indentificacion: this.metodo_identificacion[0],
        a_factor: this.factor[0],
        a_nombre_control: this.control[0].control,
        a_soporte: this.soporte[0].soporte,
        a_seguimiento: this.seguimiento[0],
        a_documento_registrado: this.documento_registrado[0],
        a_clase_control: this.clase_control[0],
        a_frecuencia_control: this.frecuencia_control[0],
        a_tipo_control: this.tipo_control[0],
        a_existe_evidencia: this.existe_evidencia[0],
        a_ejecucion_eficas: this.ejecucion_eficas[0],
        a_resultado_control: this.resultado_control[0],

        o_probabilidad: this.probabilidad[1],
        o_impacto: this.impacto[1],
        o_total: this.resultado[1].total,
        o_nivel_riesgo: this.nivel_oportunidad_riesgo[1].nivel,
        o_tratamiento: this.nivel_oportunidad_riesgo[1].tratamiento,
        o_metodo_indentificacion: this.metodo_identificacion[1],
        o_factor: this.factor[1],
        o_nombre_control: this.control[1].control,
        o_soporte: this.soporte[1].soporte,
        o_seguimiento: this.seguimiento[1],
        o_documento_registrado: this.documento_registrado[1],
        o_clase_control: this.clase_control[1],
        o_frecuencia_control: this.frecuencia_control[1],
        o_tipo_control: this.tipo_control[1],
        o_existe_evidencia: this.existe_evidencia[1],
        o_ejecucion_eficas: this.ejecucion_eficas[1],
        o_resultado_control: this.resultado_control[1],

        responsable_id: this.lider.id,
        responsable_nombre: this.lider.nombre,
        ultima_revision: this.ultima_revision,
      };

      return objeto_riesgo;
    },
  },
};
</script>
<style scoped>
label {
  float: left;
  margin: 20px 0px 5px 0px;
}

.nav-item {
  cursor: pointer;
}

.nav-link {
  color: black;
}
</style>
