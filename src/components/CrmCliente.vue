<template>
    <div class="container">
        <Loading :loading="loading" />
        <!-- <FlotanteInteraccionCliente /> -->
        <h2>Interacción cliente CRM</h2>
        <!-- <h6 class="tituloseccion">Interacción cliente</h6> -->
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
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <SearchList nombreCampo="Solicitante *" @getSolicitanteCrm="getSolicitanteCrm"
                            eventoCampo="getSolicitanteCrm" nombreItem="nombre" :registros="solicitantes"
                            placeholder="Seleccione una opción" :consulta="consulta_solicitante" />
                    </div>
                    <div class="col mb-3">
                        <SearchList nombreCampo="Tipo de atención *" @getInteracciones="getInteracciones"
                            eventoCampo="getInteracciones" nombreItem="nombre" :registros="respuestas_interaccion"
                            placeholder="Seleccione una opción" :consulta="consulta_interaccion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Telefono de contacto:
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="telefono_contacto" required />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Correo de contacto:
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="correo_contacto" required />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Observación: *</label>
                        <textarea class="form-control" required name="" id="razon_social" rows="10"
                            v-model="observacion" placeholder="Observación"></textarea>
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>
<script>
// import FlotanteInteraccionCliente from './FlotanteInteraccionCliente.vue'
import axios from 'axios'
import { Token } from '../Mixins/Token.js';
import { Alerts } from '../Mixins/Alerts.js';
import SearchList from './SearchList.vue';
import Loading from './Loading.vue';
export default {
    components: {
        // FlotanteInteraccionCliente
        SearchList,
        // TimeLineInteraccion
        Loading,
    },
    mixins: [Token, Alerts],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            procesos: [],
            consulta_proceso: '',
            loading: false,
            sedes: [],
            consulta_sede: '',
            respuestas_interaccion: [],
            consulta_interaccion: '',
            solicitantes: [],
            solicitante_id: '',
            consulta_solicitante: '',
            telefono_contacto: '',
            correo_contacto: '',
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
        getProcesos(item = null) {
            let self = this
            if (item != null) {
                this.proceso_id = item.id
                this.consulta_proceso = item.nombre
            }
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/procesos", config)
                .then(function (result) {
                    self.procesos = result.data
                });
        },
        getInteracciones(item = null) {
            let self = this
            if (item != null) {
                this.interaccion_id = item.id
                this.consulta_interaccion = item.nombre
            }
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/interaccion", config)
                .then(function (result) {
                    self.respuestas_interaccion = result.data
                });
        },
        getSolicitanteCrm(item = null) {
            let self = this
            if (item != null) {
                this.solicitante_id = item.id
                this.consulta_solicitante = item.nombre
            }
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/solicitantecrm", config)
                .then(function (result) {
                    self.solicitantes = result.data
                });
        },
    }
};
</script>
<style scoped>
#seccion {
    border: solid #D5DBDB 0.5px;
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

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