<template>
  <div class="table-container">
    <div class="col-xs-3 col-md-3">
      <label for="exampleFormControlInput1" class="form-label" style="float: left">Cantidad de registros a
        listar</label>
      <select class="form-select form-select-sm" @change="verificarConsultaFiltro()" v-model="cantidad_registros"
        aria-label="Default select example">
        <option>10</option>
        <option v-if="total_registros > 10">20</option>
        <option v-if="total_registros > 50">50</option>
        <option v-if="total_registros > 100">100</option>
        <option v-if="total_registros > 300">200</option>
        <option v-if="total_registros > 500">300</option>
        <option v-if="total_registros > 1000">500</option>
      </select>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th v-for="(columna, index) in columnas" :key="index">
            {{ columna }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dato, index) in datosformateados" :key="index" :class="{ 'bg-light-gray': index % 2 === 1 }">
          <td>
            {{ index + 1 }}
          </td>
          <td v-for="(valor, key) in dato" :key="key" :class="{ 'text-danger': key === 'oportuno' && valor === 'No' }">
            <RouterLink v-if="key == 'radicado'" :to="`${linkRegistro}${columnasocultas[index].id}`"
              class="link-offset-2 link-underline link-underline-opacity-0">
              {{ valor }}
            </RouterLink>
            <label for="" v-else>
              {{ valor }}
            </label>
          </td>
          <td>
            <div style="display: flex; gap:1em; align-content: center;">
              <button type="button" class="btn btn-success" v-for="item in acciones" :key="item"
                @click="accion(item, columnasocultas[index].id)">{{ item.nombre }}</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TablaHistoricoEstados",
  props: {
    datosformateados: {
      type: Array,
      required: true
    },
    total_registros: {
      type: Number,
      required: true,
    },
    linkRegistro: {
      type: String,
      required: false,
    },
    columnasocultas: {
      type: Array,
      required: true,
    },
    columnas: {
      type: Array,
      required: true,
    },
    acciones: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      cantidad_registros: 10,
    };
  },
  computed: {

  },
  methods: {
    verificarConsultaFiltro() {
      this.$emit("cantidadRegistros", this.cantidad_registros);
    },
    accion(item, id) {
      this.$router.push(item.url + id);
    }
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #125379;
}

a:hover {
  color: rgb(28, 102, 57);
}

.table-container {
  overflow-x: auto;
  max-width: 100%;
  margin-top: 2em;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2em;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #cbcbcb;
  font-weight: bold;
}

.text-danger {
  color: red;
  font-weight: bold;
}

.bg-light-gray {
  background-color: #f9f9f9;
}
</style>
