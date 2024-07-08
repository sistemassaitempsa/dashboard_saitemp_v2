<template>
    <div class="container">
        <h2> Matriz de riesgos</h2>
        <form class="was-validated" @submit.prevent="save()">
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <label class="form-label">Tipo de proceso: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                            aria-describedby="emailHelp" v-model="tipo_proceso"
                            @input="tipo_proceso = formatInputUpperCase($event.target.value)" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-label">Nombre del proceso: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                            aria-describedby="emailHelp" v-model="nombre_proceso"
                            @input="nombre_proceso = formatInputUpperCase($event.target.value)" />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-label">Nombre del riesgo: *
                        </label>
                        <textarea name="" id="novedades" class="form-control" rows="1"
                            v-model="nombre_riesgo"></textarea>
                    </div>
                    <div class="col">
                        <label class="form-label">Oportunidad: *
                        </label>
                        <textarea name="" id="novedades" class="form-control" rows="1" v-model="oportunidad"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-label">Causa: *
                        </label>
                        <textarea name="" id="novedades" class="form-control" rows="1" v-model="causa"></textarea>
                    </div>
                    <div class="col">
                        <label class="form-label">Plan de acción: *
                        </label>
                        <textarea name="" id="novedades" class="form-control" rows="1" v-model="plan_accion"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-label">Consecuencia: *
                        </label>
                        <textarea name="" id="novedades" class="form-control" rows="1"
                            v-model="nombre_riesgo"></textarea>
                    </div>
                    <div class="col">
                        <label class="form-label">Efecto: *
                        </label>
                        <textarea name="" id="novedades" class="form-control" rows="1" v-model="oportunidad"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-label">Amenaza: *
                        </label>
                        <textarea name="" id="novedades" class="form-control" rows="1"
                            v-model="nombre_riesgo"></textarea>
                    </div>
                    <div class="col">
                        <label class="form-label">Oportunidad: *
                        </label>
                        <textarea name="" id="novedades" class="form-control" rows="1" v-model="oportunidad"></textarea>
                    </div>
                </div>
                <ul class="nav nav-tabs mt-3 mb-2">
                    <li class="nav-item">
                        <a :class="['nav-link', { active: tab_amenaza }]"
                            :style="{ backgroundColor: tab_amenaza ? '#148F77' : '', color: tab_amenaza ? 'white' : 'black' }"
                            @click="tab_amenaza = true, tab_oportunidad = false, indice = 0">Amenaza</a>
                    </li>
                    <li class="nav-item">
                        <a :class="['nav-link', { active: tab_oportunidad }]"
                            :style="{ backgroundColor: tab_oportunidad ? '#148F77' : '', color: tab_oportunidad ? 'white' : 'black' }"
                            @click="tab_amenaza = false, tab_oportunidad = true, indice = 1">Oportunidad</a>
                    </li>
                </ul>
                <div class="row">
                    <div class="col">
                        <div class="row mt-4">
                            <div
                                style="background-color: gray;color:white;width:95%; margin:auto; border-radius:10px;padding:5px">
                                Probabilidad</div>
                            <div class="col">
                                <label class="form-label">Peso: *</label>
                                <select class="form-select" aria-label="Default select example"
                                    v-model="probabilidad[indice]">
                                    <option :value="item" v-for="item, index in nivel_probabilidad" :key="index">
                                        {{ item.nivel }}</option>
                                </select>
                            </div>
                            <div class="col">
                                <label class="form-label">Descripción: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                                    aria-describedby="emailHelp" v-model="probabilidad[indice].probabilidad" disabled />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col">
                        <div class="row  mt-4">
                            <div
                                style="background-color: gray;color:white;width:95%; margin:auto; border-radius:10px;padding:5px">
                                Impacto</div>
                            <div class="col">
                                <label class="form-label">Peso: *</label>
                                <select class="form-select" aria-label="Default select example"
                                    v-model="impacto[indice]">
                                    <option :value="item" v-for="item, index in nivel_impacto" :key="index">
                                        {{ item.nivel }}</option>
                                </select>
                            </div>
                            <div class="col">
                                <label class="form-label">Descripción: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                                    aria-describedby="emailHelp" v-model="impacto[indice].impacto" disabled />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row  mt-4">
                            <div
                                style="background-color: gray;color:white;width:95%; margin:auto; border-radius:10px;padding:5px">
                                Total</div>
                            <div class="col">
                                <label class="form-label">Impacto * probabilidad: </label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                                    aria-describedby="emailHelp" v-model="resultado[indice].total" disabled />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
/* eslint-disable */
import SearchList from './SearchList.vue';
export default {
    components: {
        SearchList
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            mensaje_error: '¡Este campo debe ser diligenciado!',
            tipo_proceso: '',
            nombre_proceso: '',
            causa: '',
            nombre_riesgo: '',
            plan_accion: '',
            oportunidad: '',
            probabilidad: [{},{}],
            impacto: [{},{}],
            tab_amenaza: true,
            tab_oportunidad: false,
            indice: 0,
            resultado: [{ peso_probabilidad: "", descripcion_probabilidad: "", peso_impacto: "", descripcion_impacto: "", total: '' }, { peso_probabilidad: "", descripcion_probabilidad: "", peso_impacto: "", descripcion_impacto: "", total: '' }],
            nivel_probabilidad: [{ nivel: 1, probabilidad: 'Muy Bajo', color: "" }, { nivel: 2, probabilidad: 'Bajo', color: "" }, { nivel: 3, probabilidad: 'Medio', color: "" }, { nivel: 4, probabilidad: 'Alto', color: "" }, { nivel: 5, probabilidad: 'Muy Bajo', color: "" }],
            nivel_impacto: [{ nivel: 1, impacto: 'Insignificante', color: "" }, { nivel: 5, impacto: 'Leve', color: "" }, { nivel: 10, impacto: 'Moderado', color: "" }, { nivel: 15, impacto: 'Alto', color: "" }, { nivel: 20, impacto: 'Muy Alto', color: "" }],
            niveles_probabilidad: [],
        }
    },
    computed: {
    },
    watch: {
        impacto() {
            if (this.impacto[this.indice].nivel != undefined && this.probabilidad[this.indice].nivel != undefined) {
                let total = ''
                total = parseInt(this.impacto[this.indice].nivel) * parseInt(this.probabilidad[this.indice].nivel)
                this.resultado[this.indice].total = total + ' %'
            }
        },
        probabilidad() {
            if (this.impacto[this.indice].nivel != undefined && this.probabilidad[this.indice].nivel != undefined) {
                let total = ''
                total = parseInt(this.probabilidad[this.indice].nivel) * parseInt(this.impacto[this.indice].nivel)
                this.resultado[this.indice].total = total + ' %'
            }
        }
    },
    mounted() {

    },
    methods: {
        formatInputUpperCase(value) {
            const formattedValue = value.toUpperCase();
            return formattedValue;
        },
        getNivelProbabilidad() {
            this.niveles_probabilidad = this.nivel_probabilidad;
        }
    }
};
</script>
<style scoped>
label {
    float: left;
    margin: 20px 0px 5px 0px;
}

.nav-item {
    cursor: pointer;
}

.nav-link {
    color: black;
}
</style>