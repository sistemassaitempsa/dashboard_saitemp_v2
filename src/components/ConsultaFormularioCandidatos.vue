<template>
  <div class="container">
    <Loading :loading="loading" />
    <NotificacionesSocket />
    <h2>Candidatos</h2>
    <Tabla
      :datos="datos"
      :tabla="tabla"
      :userlogued="userlogued"
      :endpoint="endpoint"
      :listas="listas"
      :endpointexport="endpointexport"
    />
  </div>
</template>
<script>
import axios from "axios";
import Tabla from "./Tabla.vue";
import Loading from "./Loading.vue";
import { Token } from "../Mixins/Token.js";
import { Alerts } from "../Mixins/Alerts.js";
import NotificacionesSocket from "./NotificacionSocket.vue";
export default {
  components: {
    Loading,
    Tabla,
    NotificacionesSocket,
  },
  mixins: [Token, Alerts],
  props: {
    userlogued: {},
  },
  data() {
    return {
      loading: false,
      show_table: false,
      datos: [],
      endpoint: "consultaFormularioCandidato",
      endpointexport: "consultaFormularioCandidatoExport",
      URL_API: process.env.VUE_APP_URL_API,
      tabla: [
        { nombre: "#", orden: "DESC" },
        {
          nombre: "Identificacion",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Tipo de documento",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Nombre",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Apellido",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        { nombre: "Edad", orden: "DESC", tipo: "texto", calculado: "false" },
        {
          nombre: "Ciudad de residencia",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Teléfono celular",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Genero",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Fecha registro",
          orden: "DESC",
          tipo: "fecha",
          calculado: "false",
        },
      ],
      listas: [],
      first_page_url: "",
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.urlExterna();
    this.getItems();
    this.llenarLista();
  },
  methods: {
    llenarLista() {
      this.tabla.forEach((item) => {
        if (item.calculado == "false") {
          this.listas.push([]);
        }
      });
      this.listas.push([]);
    },
    getItems() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/consultaFormularioCandidato/" + 10, config)
        .then(function (result) {
          self.first_page_url = result.data.first_page_url.replace('"');
          self.datos = result;
        });
    },
  },
};
</script>
<style>
h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}
</style>
