<template>
  <div class="container">
    <Loading :loading="loading" />
    <h2>Administrar estados Debida Diligencia</h2>
    <div class="row">
      <div class="col">
        <SearchList
          nombreCampo="Estados"
          :valida_campo="true"
          nombreItem="nombre"
          eventoCampo="getEstados"
          :consulta="estado"
          :registros="estados"
          @getEstados="getEstados"
          placeholder="Seleccione una opción"
        />
      </div>
      <div class="col pt-5">
        <button type="button" class="btn btn-success" style="float: left">
          Añadir nuevo estado
        </button>
      </div>
    </div>
    <form action="" class="was-validated">
      <div class="row">
        <div class="col-6 mb-3">
          <label class="form-label labelLeft">Nombre: </label>
          <input
            type="text"
            class="form-control"
            autocomplete="off"
            id="nombreEstado"
            aria-describedby="inputName"
            v-model="nombre"
          />
          <div class="invalid-feedback">
            {{ mensaje_error }}
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col">
              <label class="form-label labelLeft">Tiempo: </label>
            </div>
          </div>
          <div class="row d-flex align-items-center">
            <div class="col">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="option1"
                />
                <label class="form-check-label" for="inlineRadio1"
                  >Minutos</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="option2"
                />
                <label class="form-check-label" for="inlineRadio2">Horas</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="option3"
                />
                <label class="form-check-label" for="inlineRadio3">Dias</label>
              </div>
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control"
                autocomplete="off"
                id="tiempoEstado"
                aria-describedby="inputTiempo"
                v-model="tiempo"
              />
            </div>
          </div>
        </div>
        <div class="row border rounded">
          <label for="" class="labelLeft">Responsables:</label>
          <div class="col">
            <SearchList
              nombreCampo=""
              :valida_campo="false"
              nombreItem="nombre"
              eventoCampo="getUsuarios"
              :consulta="usuario"
              :registros="usuarios"
              @getUsuarios="getUsuarios"
              placeholder="Seleccione una opción"
              :index="1"
            />
            <div class="row mt-4">
              <div class="col-2">
                <label class="form-label labelLeft">Color: </label>
              </div>
              <div class="col-2 d-flex align-items-center">
                <input
                  type="color"
                  class="form-control"
                  autocomplete="off"
                  id="nombreEstado"
                  aria-describedby="inputName"
                  v-model="color"
                />
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div
              class="mb-3"
              style="
                padding: 10px;
                border: solid #d5dbdb 0.5px;
                border-radius: 10px;
              "
            >
              <button
                type="button"
                style="margin: 10px 10px 5px 10px"
                id="btnMenu"
                class="btn btn-sm"
                data-bs-toggle="button"
                v-for="(usuario, index) in asignar_usuarios"
                :key="index"
              >
                {{ usuario.nombre }}
                <i
                  class="bi bi-x"
                  @click="asignar_usuarios.splice(index, 1)"
                ></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-6"></div>
          <div class="col-6">
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-success dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Guardar Estado
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import SearchList from "./SearchList.vue";
import Loading from "./Loading.vue";
import axios from "axios";
export default {
  components: {
    Loading,
    SearchList,
  },
  data() {
    return {
      tiempo: 0,
      color: "#9EAEAC",
      loading: false,
      nombre: "",
      asignar_usuarios: [
        { id: 1, nombre: "Daniel Botache" },
        { id: 1, nombre: "Daniel Botache" },
        { id: 1, nombre: "Daniel Botache" },
        { id: 1, nombre: "Daniel Botache" },
        { id: 1, nombre: "Daniel Botache" },
        { id: 1, nombre: "Daniel Botache" },
        { id: 1, nombre: "Daniel Botache" },
      ],
    };
  },
  methods: {
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
          /*           case 4:
            this.compromisos[0].responsable = item.nombre;
            this.compromisos[0].email = item.email;
            this.compromisos[0].responsable_id = item.id;
            break;
          case 5:
            this.compromisos[1].responsable = item.nombre;
            this.compromisos[1].email = item.email;
            this.compromisos[1].responsable_id = item.id;
            break; */
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
.container {
  animation: fadeIn;
  animation-duration: 2s;
}
.labelLeft {
  float: left;
  margin: 20px 0px 5px 0px;
  text-align: left;
}
#btnMenu {
  background-color: rgb(28, 146, 77);
  color: white;
}
</style>
