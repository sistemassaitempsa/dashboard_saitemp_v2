<template>
  <div id="contenedor-select" class="was-validated">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">{{
        nombreCampo
      }}</label>
      <div class="input-group">
        <span class="input-group-text" id="basic-addon3"
          ><i class="bi bi-search"></i
        ></span>
        <input
          type="text"
          @focus="consultaEndPoint()"
          @click="hover = !hover"
          @keyup="hover = true"
          autocomplete="nope"
          @input="filterResults(registro, registros, 'registros')"
          class="form-control"
          @blur="validarSeleccion()"
          :placeholder="placeholder"
          v-model="registro"
          :disabled="disabled"
          :required="valida_campo"
          :class="[{ 'is-invalid': error }, 'form-control']"
        />
        <span
          class="input-group-text"
          style="
            cursor: pointer;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          " @click="(registro = ''), listaEnCadena(registro)" id="basic-addon3"><i class="bi bi-x"></i></span>
        <div class="invalid-feedback">
          {{ mensaje_error }}
        </div>
      </div>
    </div>
    <div v-if="hover && registros.length > 0" id="select1" @mouseleave="hover = false">
      <div id="lista1" v-for="(item, index) in registrosFilter" :key="index" @click="
        (registro = nombreItems(item)),
        retornoValorCampo(item),
        (hover = !hover),
        filterResults('', registros, 'registros'),
        listaEnCadena(item)
        ">
        {{ nombreItems(item) ? nombreItems(item).replace("null", "") : "" }}
        <!-- {{ item.nom_pai != null ? item.nom_pai: item.nom_dep != null? item.nom_dep: item.nom_ciu != null ? item.nom_ciu: '' }} -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    nombreCampo: {
      type: String, // Se asume que es un texto
      required: false,
      default: "", // Cadena vacía como valor predeterminado
    },
    placeholder: {
      type: String, // Texto para el atributo placeholder
      required: false,
      default: "", // Cadena vacía como valor predeterminado
    },
    registros: {
      type: Array, // Arreglo
      required: false,
      default: () => [], // Arreglo vacío por defecto
    },
    nombreItem: {
      type: String, // Nombre de un ítem
      required: false,
      default: "", // Cadena vacía como valor predeterminado
    },
    eventoCampo: {
      type: String, // Función para manejar eventos
      required: false,
      default: null, // No asigna una función predeterminada
    },
    ubicacion: {
      type: String, // Objeto para ubicaciones
      required: false,
      default: "", // Objeto vacío por defecto
    },
    clearInput: {
      type: Boolean, // Valor booleano
      default: false, // Falso por defecto
    },
    index: {
      type: Number, // Índice numérico
      default: null, // Null por defecto
    },
    ordenCampo: {
      type: Number, // Orden del campo
      default: null, // Null por defecto
    },
    archivos: {
      type: Boolean, // Si hay archivos
      default: false, // Falso por defecto
    },
    disabled: {
      type: Boolean, // Si el campo está deshabilitado
      default: false, // Falso por defecto
    },
    valida_campo: {
      type: Boolean, // Validación del campo
      default: true, // Verdadero por defecto
    },
    consulta: {
      type: String, // Consulta como cadena
      default: "", // Cadena vacía como valor predeterminado
    },
  },
  data() {
    return {
      hover: false,
      registro: "",
      registrosFilter: this.registros,
      mensaje_error: "¡Este campo debe ser diligenciado!",
      error: false,
      seleccionado: false,
    };
  },

  watch: {
    consulta: function () {
      this.registro = this.consulta;
    },
    registros: function () {
      this.registrosFilter = this.registros;
    },
    clearInput: function () {
      if (this.clearInput == true) {
        this.registro = "";
      }
    },
  },
  created() {
    this.registro = this.consulta;
  },
  methods: {
    consultaEndPoint() {
      if (this.eventoCampo != undefined) {
        this.$emit(this.eventoCampo);
      }
    },
    retornoValorCampo(item) {
      this.seleccionado = true;
      this.error = false;
      if (
        this.registro != "" &&
        this.nombreCampo != "Pais" &&
        this.nombreCampo != "Departamento" &&
        this.nombreCampo != "Ciudad" &&
        this.index == null
      ) {
        this.$emit(this.eventoCampo, item);
      } else if (this.index != null) {
        this.$emit(this.eventoCampo, item, this.index);
      }
    },
    nombreItems(item) {
      return item[this.nombreItem];
    },
    validarSeleccion() {
      if (!this.seleccionado) {
        this.registro = "";
      } else {
        this.error = false;
      }
    },
    filterResults(value, array, nombrearray) {
      var search = null;
      if (this.archivos) {
        let self = this;
        search = array.forEach(function (element) {
          if (self.nombreItems(element) != undefined) {
            return element;
          }
        });
      } else {
        search = array.filter((item) =>
          this.nombreItems(item).toLowerCase().match(value.toLowerCase())
        );
        if (nombrearray == "registros") {
          this.registrosFilter = search;
        }
      }
    },
    listaEnCadena(item) {
      if (item == "") {
        this.$emit(this.eventoCampo, null);
      }
      switch (this.eventoCampo) {
        case "getPaises":
          this.$emit("getDepartamentos", item, this.ordenCampo, this.index);
          break;
        case "getDepartamentos":
          this.$emit("getMunicipios", item, this.ordenCampo, this.index);
          break;
        case "setMunicipios":
          this.$emit("setMunicipios", item, this.ordenCampo, this.index);
          break;
        case "getCodigosCiiu":
          this.$emit("getActividadesCiiu", item);
          this.$emit("setCodigosCiiu", item, this.ordenCampo);
          break;
        case "getSubCategoryReports":
          this.$emit("getSubCategoryReports", item);
          break;
        case "getTipoIdentificacion":
          this.$emit(
            "setTipoIdentificacion",
            item,
            this.ordenCampo,
            this.index
          );
          break;
        case "getAfirmacionNegacion":
          this.$emit("setAfirmacionNegacion", item, this.ordenCampo, this.index );
          break;
        case "getBancos":
          this.$emit("setBanco", item, this.ordenCampo, this.index);
          break;
        case "getTipoCuentaBancos":
          this.$emit("setTipoCuentaBancos", item, this.ordenCampo, this.index);
          break;
        case "getTipoOrigenMedios":
          this.$emit("setTipoOrigenMedios", item, this.ordenCampo);
          break;
        case "getTipoArhivo":
          this.$emit("setTipoArchivo", item, this.index);
          break;
        case "getSubsidio":
          this.$emit("setSubsidio", item, this.ordenCampo, this.index);
          break;
        case "getVacante":
          this.$emit("setVacante", item, this.ordenCampo, this.index);
          break;
        case "getProfesionalsector":
          this.$emit("setProfesionalSector", item, this.ordenCampo, this.index);
          break;
        case "getClienteServicio":
          this.$emit("setClienteServicio", item);
          break;

      }
    },
  },
};
</script>
<style scoped>
label {
  float: left;
  margin: 20px 0px 5px 0px;
}

/* Select con filtro personalizado */
#contenedor-select {
  position: relative;
}

#select1 {
  z-index: 200;
}

#select2 {
  z-index: 100;
}

#select1,
#select2 {
  padding: 5px;
  border: solid #d5dbdb 0.5px;
  border-radius: 10px;
  text-align: left;
  max-height: 250px;
  width: 97%;
  margin: auto;
  overflow-y: auto;
  position: absolute;
  top: 85px;
  left: 35px;
  background-color: white;
  cursor: pointer;
}

#seccion {
  border: solid #d5dbdb 0.5px;
  padding: 30px;
  border-radius: 10px;
}

.tituloseccion {
  position: relative;
  display: inline-block;
  background-color: white;
  padding: 5px;
  top: 22px;
}

#select1 #lista1,
#select2 #lista2 {
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  color: black;
}

#select1 #lista1:hover,
#select2 #lista2:hover {
  background-color: #0d6efd;
  color: white;
}

span {
  height: 38px;
}

.is-invalid {
  border: 1px solid red;
}

/* Fin select con filtro personalizado */
</style>
