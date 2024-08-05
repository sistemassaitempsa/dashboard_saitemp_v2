<template>
  <div class="container">
    <h2>Criterio matriz riesgos</h2>
    <Loading :loading="loading" />
    <table class="table table-bordered border-dark" v-if="!loading">
      <thead class="table-dark">
        <tr>
          <th scope="col" colspan="5">Matriz calificación de oportunidades</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- Genera una celda para cada valor de columna definida -->
          <td v-for="key in columnKeys" :key="key">
            <div
              v-for="item in groupedItems[`column-${key}`]"
              :key="item.id"
              :style="{
                backgroundColor: item.color,
                color:
                  item.color === 'yellow'
                    ? 'black'
                    : 'white' /* Condición para el color del texto */,
                border: '1px solid black',
                padding: '8px',
                margin: '4px',
              }"
            >
              {{ item.atributo_1 }}<br />{{ item.atributo_2 }}<br />{{
                item.peso_celda
              }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered border-dark" v-if="!loading">
      <thead class="table-dark">
        <tr>
          <th scope="col" colspan="5">Matriz calificación de riesgo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- Genera una celda para cada valor de columna definida -->
          <td v-for="key in columnKeys2" :key="key">
            <div
              v-for="item in groupedItems2[`column-${key}`]"
              :key="item.id"
              :style="{
                backgroundColor: item.color,
                color:
                  item.color === 'yellow'
                    ? 'black'
                    : 'white' /* Condición para el color del texto */,
                border: '1px solid black',
                padding: '8px',
                margin: '4px',
              }"
            >
              {{ item.atributo_1 }}<br />{{ item.atributo_2 }}<br />{{
                item.peso_celda
              }}
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
    Loading
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
      return [1, 5, 10, 15, 20];
    },
    columnKeys2() {
      return [1, 5, 10, 15, 20];
    },
  },
  watch: {
    matriz_oportunidades() {
        this.validaLoading()
    },
    matriz_amenazas() {
        this.validaLoading()
    },
  },
  mounted() {
    this.getMatrizOportunidades();
    this.getMatrizAmenazas();
    this.getControl();
  },
  methods: {
    validaLoading(){
        if(this.matriz_oportunidades != [] &&
        this.matriz_amenazas != []){
            this.loading = false
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
<style scoped></style>
