<template>
  <div class="container">
    <h2>Criterio matriz riesgos</h2>
    <Loading :loading="loading" />
    <table class="table table-bordered border-dark table-responsive" v-if="!loading">
      <thead class="table-dark">
        <tr>
          <td scope="col" colspan="6">Matriz calificación de oportunidades</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- Genera una celda para cada valor de columna definida -->
          <td v-for="key in columnKeys" :key="key">
            <div
              class="center-flex formatted-text"
              v-for="item in groupedItems[`column-${key}`]"
              :key="item.id"
              :style="{
                backgroundColor: item.color != '' ? item.color : 'white',
                color:
                  item.color == ''
                    ? 'black'
                    : item.color === 'yellow'
                    ? 'black'
                    : 'white' /* Condición para el color del texto */,
                border: '1px solid black',
                padding: '8px',
                margin: '4px',
                minHeight: '120px',
                width: '200px',
                borderRadius: '5px',
                cursor: 'pointer',
              }"
              @mouseover="mostrarDescripcion(item, true, matriz_oportunidades)"
              @mouseleave="
                mostrarDescripcion(item, false, matriz_oportunidades)
              "
            >
              <div class="popover" v-if="item.show && item.descripcion != null">
                {{ item.descripcion }}
              </div>
              {{ formattedText(item.atributo_1) }}<br />{{ item.atributo_2
              }}<br />{{ item.peso_celda }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered border-dark" table-responsive v-if="!loading">
      <thead class="table-dark">
        <tr>
          <td scope="col" colspan="6">Matriz calificación de riesgo</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- Genera una celda para cada valor de columna definida -->
          <td v-for="key in columnKeys2" :key="key">
            <div
              class="center-flex formatted-text"
              v-for="item in groupedItems2[`column-${key}`]"
              :key="item.id"
              :style="{
                backgroundColor: item.color != '' ? item.color : 'white',
                color:
                  item.color == ''
                    ? 'black'
                    : item.color === 'yellow'
                    ? 'black'
                    : 'white' /* Condición para el color del texto */,
                border: '1px solid black',
                padding: '8px',
                margin: '4px',
                minHeight: '120px',
                width: '200px',
                borderRadius: '5px',
                cursor: 'pointer',
              }"
              @mouseover="mostrarDescripcion(item, true, matriz_amenazas)"
              @mouseleave="mostrarDescripcion(item, false, matriz_amenazas)"
            >
              <div class="popover" v-if="item.show && item.descripcion != null">
                {{ item.descripcion }}
              </div>
              {{ formattedText(item.atributo_1) }}<br />{{ item.atributo_2
              }}<br />{{ item.peso_celda }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import { Token } from "../Mixins/Token.js";
import { Alerts } from "../Mixins/Alerts.js";
import Loading from "./Loading.vue";
export default {
  components: {
    Loading,
  },
  mixins: [Token, Alerts],
  props: {},
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      matriz_oportunidades: [],
      matriz_amenazas: [],
      controles: [],
      loading: true,
      posicion: 0,
    };
  },
  computed: {
    groupedItems() {
      return this.matriz_oportunidades.reduce((acc, item) => {
        const key = `column-${item.peso_columna}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});
    },
    groupedItems2() {
      return this.matriz_amenazas.reduce((acc, item) => {
        const key = `column-${item.peso_columna}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});
    },
    columnKeys() {
      return [0, 1, 5, 10, 15, 20];
    },
    columnKeys2() {
      return [0, 1, 5, 10, 15, 20];
    },
  },
  watch: {
    matriz_oportunidades() {
      this.validaLoading();
    },
    matriz_amenazas() {
      this.validaLoading();
    },
  },
  mounted() {
    this.getMatrizOportunidades();
    this.getMatrizAmenazas();
    this.getControl();
  },
  methods: {
    mostrarDescripcion(registro, booleano, array) {
      array.forEach(function (item, index) {
        if (item.id == registro.id) {
          array[index].show = booleano;
        }
      });
    },
    formattedText(text) {
      return text.replace(/,/g, ",\n");
    },
    validaLoading() {
      if (this.matriz_oportunidades != [] && this.matriz_amenazas != []) {
        this.loading = false;
      }
    },
    getMatrizOportunidades() {
      if (this.matriz_oportunidades.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/matrizoportunidades", config)
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
          .get(self.URL_API + "api/v1/matrizamenazas", config)
          .then(function (result) {
            self.matriz_amenazas = result.data;
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
  },
};
</script>
<style scoped>
.center-flex {
  display: flex;
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  height: 100px; /* Ajusta la altura según sea necesario */
}

.formatted-text {
  white-space: pre-line; /* Mantiene los saltos de línea del texto */
  /* Otros estilos opcionales como color, padding, etc. */
  position:relative;
}

.popover {
  background-color: white;
  position: absolute;
  color: black;
  padding: 10px;
  top:-60px;
  left:30px;
}

table{
    margin-bottom:50px
}

</style>
