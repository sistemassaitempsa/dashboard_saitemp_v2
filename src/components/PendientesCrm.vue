<template>
  <div class="container">
    <h2>Tareas pendientes CRM</h2>
    <Tabla :datos="datos" :tabla="tabla" :userlogued="userlogued" :endpoint="endpoint"
      :endpointexport="endpointexport" :acciones="acciones" @accion="accion" />
  </div>
</template>
<script>
import axios from "axios";
import Tabla from "./Tabla.vue";
import { Token } from "../Mixins/Token.js";
import { Alerts } from "../Mixins/Alerts.js";
export default {
  components: {
    Tabla,
  },
  mixins: [Token, Alerts],
  props: {
    userlogued: {
      type: Object, // Define que debe ser un objeto
      required: false, // No es obligatorio
      default: () => ({}), // Proporciona un objeto vacío como valor predeterminado
    },
  },
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      show_table: false,
      datos: [],
      endpoint: "seguimientocrmpendientes",
      endpointexport: "exportaseguimientocrm",
      tabla: [
        { nombre: "#", orden: "DESC" },
        {
          nombre: "Radicado",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        { nombre: "Sede", orden: "DESC", tipo: "texto", calculado: "false" },
        {
          nombre: "Proceso / área",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Solicitante",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Nombre/ Razón social",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Tipo de atención",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Teléfono del contacto",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Correo del contacto",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        { nombre: "Estado", orden: "DESC", tipo: "texto", calculado: "false" },
      ],
      first_page_url: "",
      cantidad: 10,
      acciones: [{ nombre: "ver registro", }]
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(
          self.URL_API + "api/v1/seguimientocrmpendientes/" + this.cantidad,
          config
        )
        .then(function (result) {
          // self.first_page_url = result.data.first_page_url.replace("\"");
          self.datos = result;
        });
    },
    accion(item) {
      this.$router.push({ name: "crm-intreraccion", params: { id: item.id } });
    }
  },
};
</script>
<style scoped></style>
