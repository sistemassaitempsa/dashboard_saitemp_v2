<template>
    <div>
        <div class="container">
            <Loading :loading="loading" />
            <h2>Sectores económicos CIIU</h2>
            <div class="row">
                <div class="col-xs-12 col-md-3">
                    <SearchList nombreCampo="Código CIIU*" :valida_campo="false" nombreItem="codigo"
                        eventoCampo="getCodigosCiiu" :consulta="consulta_codigo_ciiu" :registros="codigos_ciiu"
                        @getCodigosCiiu="getCodigosCiiu" @setCodigosCiiu="setCodigosCiiu" :ordenCampo="1"
                        placeholder="Seleccione una opción" />
                </div>
                <div class="col-xs-12 col-md-3">
                    <SearchList nombreCampo="Sector economico*" :valida_campo="false" nombreItem="nombre"
                        eventoCampo="getSectoresEconomicos" :consulta="consulta_sector_economico"
                        :registros="sectores_economicos" @getSectoresEconomicos="getSectoresEconomicos"
                        placeholder="Seleccione una opción" />
                </div>
                <button type="button" id="newNews" class="col-xs-12 col-md-2 btn btn-sm btn-success" @click="asignar()"
                    style="margin-top: 33px">
                    <i class="bi bi-file-earmark-plus"></i> Asignar
                </button>
            </div>
            <div class="row">
                <div class="mb-3" v-if="asignar_codigos.length > 0">
                    <span>Códigos CIIU</span>
                    <div class="mb-3" style="
              padding: 10px;
              border: solid #d5dbdb 0.5px;
              border-radius: 10px;
            ">
                        <button type="button" style="margin: 10px 10px 5px 10px" id="btnMenu" class="btn btn-sm"
                            data-bs-toggle="button" v-for="(item, index) in asignar_codigos" :key="index">
                            {{ item.codigo }}
                            <i class="bi bi-x" @click="asignar_codigos.splice(index, 1)"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="mb-3" v-if="asignar_sectores.length > 0">
                    <span>Sectores económicos</span>
                    <div class="mb-3" style="
              padding: 10px;
              border: solid #d5dbdb 0.5px;
              border-radius: 10px;
            ">
                        <button type="button" style="margin: 10px 10px 5px 10px" id="btnMenu" class="btn btn-sm"
                            data-bs-toggle="button" v-for="(item, index) in asignar_sectores" :key="index">
                            {{ item.nombre }}
                            <i class="bi bi-x" @click="asignar_sectores.splice(index, 1)"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-3">
                    <SearchList nombreCampo="Código CIIU*" :valida_campo="false" nombreItem="codigo"
                        eventoCampo="getCodigosCiiu" :consulta="consulta_codigo_ciiu" :registros="codigos_ciiu"
                        @getCodigosCiiu="getCodigosCiiu" @setCodigosCiiu="setCodigosCiiu" :ordenCampo="2"
                        placeholder="Seleccione una opción" />
                </div>
                <button type="button" id="reset" class="col-xs-12 col-md-2 btn btn-success btn-sm"
                    style="margin-top: 33px" @click="getCodigosCiiu()">
                    <i class="bi bi-arrow-counterclockwise"></i> Borrar busqueda
                </button>
            </div>
            <Tabla :datos="codigos_ciiu_tabla" :tabla="tabla" :endpoint="endpoint" :checked="false" />
        </div>
    </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useConfig } from "../composables/token";
import SearchList from './SearchList.vue';
import Tabla from './Tabla.vue';
import Loading from './Loading.vue';
import { Alerts } from "../composables/Alerts";


const { URL_API, configHeader } = useConfig();
const { showAlert } = Alerts();
let sectores_economicos = ref([]);
let codigos_ciiu = ref([]);
let codigos_ciiu_tabla = ref([]);
let consulta_sector_economico = ref('');
let consulta_codigo_ciiu = ref('');
let asignar_codigos = ref([]);
let asignar_sectores = ref([]);
let cantidad = ref(10);
let loading = ref(true);
let endpoint = ref('');

let tabla = ref([
    { nombre: "#", orden: "DESC" },
    {
        nombre: "Codigo CIIU",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },
    {
        nombre: "Descripción código",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },
    {
        nombre: "Sector económico",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },

]);


onMounted(() => {
    getSectoresEconomicos()
    getCodigosCiiu()
    getCodigosCiiuTabla()
});

function getSectoresEconomicos(item = null) {
    if (item != null) {
        asignar_sectores.value.splice(0, 1, item);
    }
    axios.get(URL_API.value + 'api/v1/sectoreconomicolista', configHeader()).then(function (result) {
        sectores_economicos.value = result.data;
    });
}

function getCodigosCiiu() {
    axios.get(URL_API.value + 'api/v1/codigociiu', configHeader()).then(function (result) {
        codigos_ciiu.value = result.data;
    });
}

function getCodigosCiiuTabla(id = null) {
    let url = URL_API.value + 'api/v1/codigociiu/' + cantidad.value
    if (id != null) {
        url = URL_API.value + 'api/v1/codigociiubyid/' + id
    }
    axios.get(url, configHeader()).then(function (result) {
        codigos_ciiu_tabla.value = result;
        loading.value = false
    });
}

function setCodigosCiiu(item = null, campo = null) {
    if (item != null) {
        switch (campo) {
            case 1:
                if (item != null && !asignar_codigos.value.some(array => array.id === item.id)) {
                    asignar_codigos.value.push(item);
                }
                break;
            case 2:
                getCodigosCiiuTabla(item.codigo)
                break;
        }
    }
}

function asignar() {
    let sector_ciiu = {
        sector: asignar_sectores.value[0],
        codigos: asignar_codigos.value
    }
    axios.post(URL_API.value + 'api/v1/codigociiucodigosector', sector_ciiu, configHeader()).then(function (result) {
        getCodigosCiiuTabla()
        showAlert(result.data.message, result.data.status)
    });
}

</script>
<style scoped>
.container {
    animation: fadeIn;
    animation-duration: 2s;
}

.row {
    margin: 30px 0px 30px 0px;
}

h2 {
    font-family: "Montserrat", sans-serif;
    margin: 20px 0px 20px 0px;
}

label {
    float: left;
}

#btnMenu {
    background-color: rgb(28, 146, 77);
    color: white;
}
</style>