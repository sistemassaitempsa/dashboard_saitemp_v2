<template>
    <div class="container">
        <h2>{{ titulo }}</h2>
        <div class="card p-3">
            <form class="was-validated form" @submit.prevent="save()">
                <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <label for="nit" class="form-label">Nombre sector</label>
                            <input type="text" class="form-control" id="sector_economico" aria-describedby="emailHelp"
                                v-model="nombre" required />
                            <div class="invalid-feedback">
                                {{ mensaje_error }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Descripción</label>
                            <div class="mb-3">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                    v-model="descripcion"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button type="submit" class="btn btn-success">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
        <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :endpointexport="endpointexport"
            :filtro_sencillo="false" :checked="false" :editar="true" :eliminar="true" @response="response" />
    </div>
</template>
<script setup>

// import { vue } from "vue";
import { ref, onMounted } from "vue";
import Tabla from "./Tabla.vue";
import axios from "axios";
import { useConfig } from "../composables/token";
import { Alerts } from "../composables/Alerts";

const { showAlert } = Alerts();
const { URL_API, configHeader } = useConfig();
let id_sector = ref('');
let nombre = ref('');
let descripcion = ref('');
let titulo = ref('Insertar sector económico');
let mensaje_error = ref('¡Este campo debe ser diligenciado!');
let endpoint = ref('sectoreconomico');
let endpointexport = ref('');
let datos = ref([]);
let checks = ref([]);
let formulario = ref({
    id:'',
    nombre:'',
    descripcion:'',
});
let tabla = ref([
    {
        nombre: "#", orden: "DESC"
    },
    {
        nombre: "Sector economico",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    }, {
        nombre: "Descripción",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },]);

onMounted(() => {
    getItems()
});


function getItems() {
    axios.get(URL_API.value + 'api/v1/sectoreconomico/10', configHeader()).then(function (result) {
        datos.value = result;
    });
}

function save() {
    let objeto = crearObjeto()
    let id = objeto.value.id
    let url = URL_API.value + 'api/v1/sectoreconomico'
    if (id != '') {
        url = URL_API.value + 'api/v1/sectoreconomicobyid/' + id
    }
    axios.post(url, objeto.value, configHeader()).then(function (result) {
        getItems()
        // limpiarFormulario()
        showAlert(result.data.message, result.data.status)
    });
}

function crearObjeto() {
    formulario.value = {
        id: id_sector.value,
        nombre: nombre.value,
        descripcion: descripcion.value,
    }
    return formulario;
}

function response(response) {
    id_sector.value = response.id
    nombre.value = response.nombre
    descripcion.value = response.descripcion
    titulo.value = "Editar sector económico";
    checks.value = [];
}

// function limpiarFormulario() {
//     formulario.value = {}
//     id_sector.value = ''
//     nombre.value = ''
//     descripcion.value = ''

// }
</script>
<style scoped>
.card {
    width: 50%;
    margin-bottom: 30px;
}
</style>