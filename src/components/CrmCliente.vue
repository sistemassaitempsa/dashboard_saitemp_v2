<template>
    <div class="container">
        <Loading :loading="loading" />
        <!-- <FlotanteInteraccionCliente /> -->
        <h2>Interacción cliente</h2>
        <h6 class="tituloseccion">Información general</h6>
        <div id="seccion">
            <div class="row" v-if="$route.params.id != undefined">
                <h6 style="text-align: left;">Radicado: {{ radicado }}</h6>
            </div>
            <form class="was-validated" @submit.prevent="save()">
                <div class="row">
                    <div class="col mb-3">
                        <SearchList nombreCampo="Sede*" @getSedes="getSedes" eventoCampo="getSedes" nombreItem="nombre"
                            :registros="sedes" placeholder="Seleccione una opción" :consulta="consulta_sede" />
                    </div>
                    <div class="col mb-3">
                        <SearchList nombreCampo="Proceso o área *" @getProcesos="getProcesos" eventoCampo="getProcesos"
                            nombreItem="nombre" :registros="procesos" placeholder="Seleccione una opción"
                            :consulta="consulta_proceso" />
                    </div>
                    <div class="col mb-3">
                        <SearchList nombreCampo="Proceso o área *" @getInteracciones="getInteracciones"
                            eventoCampo="getInteracciones" nombreItem="nombre" :registros="respuestas_interaccion"
                            placeholder="Seleccione una opción" :consulta="consulta_interaccion" />
                    </div>
                </div>
                <div class="col mb-3">
                    <!-- <label class="form-label">Observación: *</label>
                <textarea class="form-control" required name="" id="razon_social" rows="10" v-model="observacion"
                    placeholder="Observación"></textarea>
                <div class="invalid-feedback">
                    {{ mensaje_error }}
                </div> -->
                </div>
            </form>
        </div>
    </div>
</template>
<script>
// import FlotanteInteraccionCliente from './FlotanteInteraccionCliente.vue'
import axios from 'axios'
// import { Token } from '../Mixins/Token.js';
// import { Alerts } from '../Mixins/Alerts.js';
import Loading from './Loading.vue';
export default {
    components: {
        // FlotanteInteraccionCliente
        // SearchList,
        // TimeLineInteraccion
        Loading,
    },
    // mixins: [Token, Alerts],
    props: {

    },
    data() {
        return {
            procesos: [],
            consulta_proceso: '',
            loading: false,
            sedes: [],
            consulta_sede: ''
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {
        getSedes(item = null) {
            if (item != null) {
                console.log(item)
            }
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/sede", config)
                .then(function (result) {
                    self.sedes = result.data
                });
        },
    }
};
</script>
<style scoped>
.tituloseccion {
    position: relative;
    display: inline-block;
    background-color: white;
    padding: 5px;
    top: 22px;
}

span {
    height: 38px;
}


label {
    float: left;
    margin: 20px 0px 5px 0px;
}
</style>