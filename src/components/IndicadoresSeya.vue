<template>
    <div class="container">
        <Loading :loading="loading" />
        <div class="row">
            <div class="col">
                <span v-if="char2">Cantidad de radicados por cada mes del año.</span>
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="radicados_mes"
                    :datosS="cargos_mes" :index="1" />
                <!-- <select v-if="char1" class="form-select form-select-sm"
                    style="margin-bottom: 30px;margin-top: 10px;width: 40%;" v-model="anio_radicado"
                    @change="getRadicadosMes(anio_radicado)" aria-label="Default select example">
                    <option selected>Seleccione una opción</option>
                    <option>2024</option>

                </select> -->
            </div>
            <div class="col">
                <span v-if="char2">Cantidad de radicados por tipo de servicio por cada mes del año.</span>
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="estados_cargo"
                    :datosS="cantidad_vacantes_tipo_servicio" :index="2" />
                <!-- <select v-if="char1" class="form-select form-select-sm"
                    style="margin-bottom: 30px;margin-top: 10px;width: 40%;" v-model="anio_tipo_servicio"
                    @change="getCantidadVacantesesTipoServicio(anio_tipo_servicio)" aria-label="Default select example">
                    <option selected>Seleccione una opción</option>
                    <option>2024</option>

                </select> -->
            </div>
        </div>
        <div class="row">
            <div :class="!expandido ? 'col-6' : 'col-12'">
                <span v-if="char3">Cantidad de vacantes efectivas por cada mes del año.</span>
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="vacantes_ocupadas"
                    :datosS="cantidad_vacantes" :index="3" />
            </div>
            <!-- <div :class="!expandido ? 'col-6' : 'col-12'">
                <span v-if="char3">Cantidad de vacantes efectivas por cada mes del año.</span>
                <GraficosBarrasApiladas @graficoCargado="graficoCargado" :labels_x="labels_x" :items="vacantes_ocupadas"
                    :datosS="cantidad_vacantes" :index="3" />
            </div> -->
            <!-- <div class="col">
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="label2"
                    :datosA="hojas_vida" :index="4" />
                <span v-if="char4">Cantidad de hojas de vida enviadas en todos los cargos registrados por cada mes del
                    año.</span>
            </div> -->
        </div>
        <!-- <div class="row">
            <div :class="expandido ? 'col-6' : 'col-12'">
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="estados" :items="estados"
                    :datosS="registros_estado" :index="4" />
                <span v-if="char3">Cantidad de vacantes ocupadas por cada mes del año.</span>
            </div>
        </div> -->
        <!-- <div class="row">
            <div :class="expandido ? 'col-6' : 'col-12'">
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="label1"
                    :datosA="cantidad_vacantes" :index="3" />
                <span v-if="char3">Cantidad de vacantes ocupadas por cada mes del año.</span>
            </div>
        </div> -->
        <!-- <div class="row">
            <div class="col">
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="items"
                    :datosS="vacantes_cargos_hojasVida" :index="5" />
                <span v-if="char5">Comparativa por cantidad entre cargos registrados, vacantes dispibles y hojas de vida
                    enviadas por
                    cada mes de año.</span>
            </div>
            <div class="col">
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="items2"
                    :datosA="vacantes_efectivas" :index="6" />
                <span v-if="char6">Cantidad de vacantes ocupadas por cada mes de año.</span>
            </div>
        </div> -->
        <div class="row">
            <div class="col-6">
                <span>Numero de radicados por estado.</span>
                <DoughnutChar @graficoCargado="graficoCargado" :datos="radicados_estados" :index="7" />
            </div>
            <div class="col-6">
                <span>Numero de radicados por responsable.</span>
                <DoughnutChar @graficoCargado="graficoCargado" :datos="radicados_responsable" :index="7" />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { Token } from '../Mixins/Token.js';
import DoughnutChar from './DoughnutChar.vue';
import GraficoBarras from './GraficoBarras.vue';
// import GraficosBarrasApiladas from './GraficosBarrasApiladas.vue';
import Loading from './Loading.vue'
export default {
    name: '',
    components: {
        DoughnutChar,
        GraficoBarras,
        // GraficosBarrasApiladas,
        Loading,
    },
    mixins: [Token],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            label_dataset: ['Radicados por mes'],
            label2: ['Hojas de vida enviadas por mes'],
            label1: ['Cantidad de vacantes ocupadas por mes'],
            labels_x: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            estadosseya: [],
            radicados_estados: [],
            radicados_responsable: [],
            cargos: [],
            cargos_mes: '',
            hojas_vida: [],
            cantidad_vacantes: '',
            cantidad_estados: [],
            expandido: false,
            items: ['CARGOS', 'VACANTES', 'HOJAS DE VIDA ENV.'],
            items2: ['VACANTES OCUPADAS'],
            comparativa: [],
            vacantes_cargos_hojasVida: '',
            cantidad_vacantes_tipo_servicio: '',
            estados_cargo: [],
            vacantes_efectivas: [],
            char1: false,
            char2: false,
            char3: false,
            char4: false,
            char5: false,
            char6: false,
            char7: false,
            loading: true,
            anio_radicado: '',
            anio_tipo_servicio: '',
            vacantes_ocupadas: [],
            radicados_mes: [],
            estados: [],
            registros_estado: ''
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        this.getResgistrosporestado()
        this.getRegistrosporresponsable()
        this.getRadicadosMes()
        this.getHojasVidaMes()
        this.getCantidadVacantesOcupadasMes()
        this.getCargos()
        this.getCargosVacantesHojasVida()
        this.getCantidadVacantesesTipoServicio()
        this.vacantesEfectivas()
    },
    methods: {
        getRadicadosMes(anio = null) {
            const fechaActual = new Date();
            const anioactual = fechaActual.getFullYear();
            if (anio == null) {
                anio = anioactual
            }
            let self = this;
            var array = []
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/ordenserviciochar/" + anio, config)
                .then(function (result) {
                    // Object.values(result.data).forEach(function (item) {
                    //     self.cargos_mes.push(item)
                    // })
                    result.data.forEach(function (item, index) {
                        if (index == 0) {
                            self.radicados_mes = Object.values(item['nombres'])
                        } else {
                            array.push(Object.values(item))
                        }
                    })
                    self.cargos_mes = JSON.stringify(array)
                });
        },
        getHojasVidaMes() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/ordenserviciohojavidachar/" + '2023', config)
                .then(function (result) {
                    Object.values(result.data).forEach(function (item) {
                        self.hojas_vida.push(item)
                    })
                });
        },
        getCantidadVacantesOcupadasMes() {
            let self = this;
            var array = []
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/vacantesocupadas/" + '2024', config)
                .then(function (result) {
                    result.data.forEach(function (item, index) {
                        if (index == 0) {
                            self.vacantes_ocupadas = Object.values(item['nombres'])
                        } else {
                            array.push(Object.values(item))
                        }
                    })
                    self.cantidad_vacantes = JSON.stringify(array)
                });
        },
        getResgistrosporestado() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/resgistrosporestado", config)
                .then(function (result) {
                    self.radicados_estados.push(result.data)
                });
        },
        getRegistrosporresponsable() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/registrosporresponsable", config)
                .then(function (result) {
                    self.radicados_responsable.push(result.data)
                });
        },

        getCargos() {
            // let self = this;
            // let config = this.configHeader();
            // axios
            //     .get(self.URL_API + "api/v1/ordenserviciocargocantidadchar2/" + '2023', config)
            //     .then(function (result) {
            //         self.radicados_estados.push(result.data)
            //     });
        },
        getCargosVacantesHojasVida() {
            let self = this;
            var array = []
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/cargosVacantesHojasVida/" + '2023', config)
                .then(function (result) {
                    result.data.forEach(function (item) {
                        array.push(Object.values(item))
                    })
                    self.vacantes_cargos_hojasVida = JSON.stringify(array)
                });
        },
        vacantesEfectivas() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/vacantesEfectivas/" + '2023', config)
                .then(function (result) {
                    self.vacantes_efectivas = Object.values(result.data)
                });
        },
        getCantidadVacantesesTipoServicio(anio = null) {
            const fechaActual = new Date();
            const anioactual = fechaActual.getFullYear();
            if (anio == null) {
                anio = anioactual
            }
            let self = this;
            var array = []
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/cantidadvacantestiposervicio/" + anio, config)
                .then(function (result) {
                    result.data.forEach(function (item, index) {
                        if (index == 0) {
                            self.estados_cargo = Object.values(item['nombres'])
                        } else {
                            array.push(Object.values(item))
                        }
                    })
                    self.cantidad_vacantes_tipo_servicio = JSON.stringify(array)
                });
        },
        graficoCargado(cargado, index) {
            this.loading = false
            switch (index) {
                case 1:
                    this.char1 = cargado
                    break;
                case 2:
                    this.char2 = cargado
                    break;
                case 3:
                    this.char3 = cargado
                    break;
                case 4:
                    this.char4 = cargado
                    break;
                case 5:
                    this.char5 = cargado
                    break;
                case 6:
                    this.char6 = cargado
                    break;
                case 7:
                    this.char7 = cargado
                    break;

                default:
                    break;
            }
        },
        expandir() {

        }
    }
};
</script>
<style scoped>
.row {
    background-color: rgba(216, 231, 233, 0.653);
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    padding: 15px;
}

span {
    float: left;
    display: block;
    padding: 15px;
    /* transition-duration: 500ms; */
}

/* span:hover {
    font-size: 1.5rem;
    cursor: pointer;
    transition-duration: 500ms;
    font-weight: 100;
} */
</style>