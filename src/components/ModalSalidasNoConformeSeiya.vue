<template>
  <div class="container">
    <form class="was-validated" @submit.prevent="save()">
      <div
        class="card"
        v-for="(item, index) in props.salidas_no_conforme"
        :key="item.id"
      >
        <h5>Servicio no conforme {{ index + 1 }}</h5>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Novedad en servicio: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              disabled
              v-model="item.categoria"
            />
          </div>

          <div class="col mb-3">
            <label class="form-label">Proceso: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              disabled
              v-model="item.proceso"
            />
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Corregir por: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              disabled
              v-model="item.responsable_corregir"
            />
          </div>
          <div class="col mb-3">
            <label class="form-label">Fecha novedad: </label>
            <input
              type="datetime-local"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              disabled
              :value="(item.created_at = formatearFecha(item.created_at))"
            />
          </div>
        </div>
        <div class="row" v-if="item.corrigio_novedad != null">
          <div class="col mb-3">
            <label class="form-label">Usuario que corrigió la novedad: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              disabled
              v-model="item.corrigio_novedad"
            />
          </div>
          <div class="col mb-3">
            <label class="form-label">Fecha correción novedad: </label>
            <input
              type="datetime-local"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              disabled
              :value="(item.updated_at = formatearFecha(item.updated_at))"
            />
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Afectación al servicio: </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              disabled
              v-model="item.descripcion"
            ></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Corrección aplicada: </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              v-model="item.correcion_aplicada"
              :disabled="item.subsanado == 1"
            ></textarea>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-success button">Guardar</button>
      <button type="button" class="btn btn-success button">Cancelar</button>
    </form>
  </div>
</template>

<script setup>
//import { ref } from 'vue'
//import { ref, onMounted } from 'vue'
import axios from "axios";
import { defineProps, defineEmits } from "vue";
import { useConfig } from "../composables/token";
import { Alerts } from "../composables/Alerts";
import { useRoute } from "vue-router";

const emit = defineEmits(['getRegistroIngreso']);

const { URL_API, configHeader } = useConfig();
const route = useRoute();
// const router = useRouter();
const { showAlert } = Alerts();

const props = defineProps({
  salidas_no_conforme: { type: Array, default: () => [] },
});



function formatearFecha(fechaOriginal) {
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
}

function save() {
  axios
    .post(
      URL_API.value + "api/v1/actualizasnc",
      props.salidas_no_conforme,
      configHeader()
    )
    .then(function (result) {
      showAlert(result.data.message, result.data.status);
      emit("getRegistroIngreso", route.params.id);
    });
}
</script>

<style scoped>
label {
  float: left;
}

.card {
  margin-bottom: 20px;
  padding: 10px;
}

.button {
  margin: 10px;
}
</style>
