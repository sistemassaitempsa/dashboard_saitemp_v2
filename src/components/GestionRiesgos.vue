<template>
    <div class="container">
        <h2> Matriz de riesgos</h2>
        <form class="was-validated" @submit.prevent="save()">
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <label class="form-label">Tipo de proceso: *</label>
                        <select class="form-select" aria-label="Default select example" v-model="tipo_proceso" required>
                            <option :value="item" v-for="item, index in tipos_proceso" :key="index">
                                {{ item.nombre }}</option>
                        </select>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                    <div class="col">
                        <label class="form-label">Nombre del proceso: *</label>
                        <select class="form-select" aria-label="Default select example" v-model="nombre_proceso" required>
                            <option :value="item" v-for="item, index in nombres_proceso" :key="index">
                                {{ item.nombre }}</option>
                        </select>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-label">Nombre del riesgo: *
                        </label>
                        <textarea id="novedades" class="form-control" rows="1" v-model="nombre_riesgo" required ></textarea>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                    <div class="col">
                        <label class="form-label">Oportunidad: *
                        </label>
                        <textarea id="novedades" class="form-control" rows="1" v-model="oportunidad" required></textarea>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-label">Causa: *
                        </label>
                        <textarea id="novedades" class="form-control" rows="1" v-model="causa" required></textarea>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                    <div class="col">
                        <label class="form-label">Plan de acción: *
                        </label>
                        <textarea id="novedades" class="form-control" rows="1" v-model="plan_accion" required></textarea>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-label">Consecuencia: *
                        </label>
                        <textarea id="novedades" class="form-control" rows="1" v-model="consecuencia" required></textarea>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                    <div class="col">
                        <label class="form-label">Efecto: *
                        </label>
                        <textarea id="novedades" class="form-control" rows="1" v-model="efecto" required></textarea>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-label">Amenaza: *
                        </label>
                        <textarea id="novedades" class="form-control" rows="1" v-model="amenaza" required></textarea>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                    <div class="col">
                        <label class="form-label">Oportunidad: *
                        </label>
                        <textarea id="novedades" class="form-control" rows="1" v-model="oportunidad2" required></textarea>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                </div>
                <ul class="nav nav-tabs mt-3 mb-2">
                    <li class="nav-item">
                        <a :class="['nav-link', { active: tab_amenaza }]"
                            :style="{ backgroundColor: tab_amenaza ? '#339c66' : '', color: tab_amenaza ? 'white' : 'black' }"
                            @click="tab_amenaza = true, tab_oportunidad = false, indice = 0">Amenaza</a>
                    </li>
                    <li class="nav-item">
                        <a :class="['nav-link', { active: tab_oportunidad }]"
                            :style="{ backgroundColor: tab_oportunidad ? '#339c66' : '', color: tab_oportunidad ? 'white' : 'black' }"
                            @click="tab_amenaza = false, tab_oportunidad = true, indice = 1">Oportunidad</a>
                    </li>
                </ul>
                
                <div>
                <div class="row">
                    <div class="col">
                        <div class="row mt-4">
                            <div
                                style="background-color: gray;color:white;width:95%; margin:auto; border-radius:10px;padding:5px">
                                Probabilidad</div>
                            <div class="col">
                                <label class="form-label">Peso: *</label>
                                <select class="form-select" aria-label="Default select example" required
                                    v-model="probabilidad[indice]">
                                    <option :value="item" v-for="item, index in nivel_probabilidad" :key="index">
                                        {{ item.nivel }}</option>
                                </select>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
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
                                <select class="form-select" aria-label="Default select example" required
                                    v-model="impacto[indice]">
                                    <option :value="item" v-for="item, index in nivel_impacto" :key="index">
                                        {{ item.nivel }}</option>
                                </select>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
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
                <div class="row">
                    <div class="col">
                        <label class="form-label">{{indice == 0 ? 'Nivel de riesgo: *':'Nivel de oportunidad: *'}}</label>
                        <input type="text" class="form-control" autocomplete="off" id="direccion_empresa" :style="cellStyle"
                            aria-describedby="emailHelp" v-model="nivel_oportunidad_riesgo[indice].nivel" disabled />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-label">Tratamiento: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="direccion_empresa" :style="cellStyle"
                            aria-describedby="emailHelp" v-model="nivel_oportunidad_riesgo[indice].tratamiento" disabled />
                        <div class="invalid-feedback">
                            {{ mensaje_error }}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-label">Método de identificación: *</label>
                        <select class="form-select" aria-label="Default select example" v-model="metodo_identificacion[indice]" required>
                            <option :value="item" v-for="item, index in metodos_identificacion" :key="index">
                                {{ item.nombre }}</option>
                        </select>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                    <div class="col">
                        <label class="form-label">Factor: *</label>
                        <select class="form-select" aria-label="Default select example" v-model="factor[indice]" required>
                            <option :value="item" v-for="item, index in factores" :key="index">
                                {{ item.nombre }}</option>
                        </select>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-label">Control: *
                        </label>
                        <textarea id="novedades" class="form-control" rows="1" v-model="control[indice].control" required></textarea>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                    <div class="col">
                        <label class="form-label">soporte: *
                        </label>
                        <textarea id="novedades" class="form-control" rows="1" v-model="soporte[indice].soporte" required></textarea>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-label">Seguimiento: *
                        </label>
                        <select class="form-select" aria-label="Default select example" v-model="seguimiento[indice]" required>
                            <option :value="item" v-for="item, index in seguimientos" :key="index">
                                {{ item.nombre }}</option>
                        </select>
                        <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="row mt-4" >
                            <div
                                style="background-color: gray;color:white;width:95%; margin:auto; border-radius:10px;padding:5px">
                                Documento registrado</div>
                            <div class="col">
                                <label class="form-label">Descripción: *</label>
                                <select class="form-select" aria-label="Default select example" required
                                    v-model="documento_registrado[indice]">
                                    <option :value="item" v-for="item, index in documentos_registrados" :key="index">
                                        {{ item.nombre }}</option>
                                </select>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                            <div class="col">
                                <label class="form-label">Peso: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                                    aria-describedby="emailHelp" v-model="documento_registrado[indice].peso" disabled />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="row  mt-4">
                            <div
                                style="background-color: gray;color:white;width:95%; margin:auto; border-radius:10px;padding:5px">
                                Clase de control</div>
                            <div class="col">
                                <label class="form-label">Descripción: *</label>
                                <select class="form-select" aria-label="Default select example" required
                                    v-model="clase_control[indice]">
                                    <option :value="item" v-for="item, index in clases_control" :key="index">
                                        {{ item.nombre }}</option>
                                </select>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                            <div class="col">
                                <label class="form-label">Peso: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                                    aria-describedby="emailHelp" v-model="clase_control[indice].peso" disabled />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="row  mt-4">
                            <div
                                style="background-color: gray;color:white;width:95%; margin:auto; border-radius:10px;padding:5px">
                                Frecuencia del control</div>
                            <div class="col">
                                <label class="form-label">Descripción: *</label>
                                <select class="form-select" aria-label="Default select example" required
                                    v-model="frecuencia_control[indice]">
                                    <option :value="item" v-for="item, index in frecuencias_control" :key="index">
                                        {{ item.nombre }}</option>
                                </select>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                            <div class="col">
                                <label class="form-label">Peso: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                                    aria-describedby="emailHelp" v-model="frecuencia_control[indice].peso" disabled />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="row  mt-4">
                            <div
                                style="background-color: gray;color:white;width:95%; margin:auto; border-radius:10px;padding:5px">
                                Tipo de control</div>
                            <div class="col">
                                <label class="form-label">Descripción: *</label>
                                <select class="form-select" aria-label="Default select example" required
                                    v-model="tipo_control[indice]">
                                    <option :value="item" v-for="item, index in tipos_control" :key="index">
                                        {{ item.nombre }}</option>
                                </select>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                            <div class="col">
                                <label class="form-label">Peso: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                                    aria-describedby="emailHelp" v-model="tipo_control[indice].peso" disabled />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="row  mt-4">
                            <div
                                style="background-color: gray;color:white;width:95%; margin:auto; border-radius:10px;padding:5px">
                                Existe evidencia</div>
                            <div class="col">
                                <label class="form-label">Descripción: *</label>
                                <select class="form-select" aria-label="Default select example" required
                                    v-model="existe_evidencia[indice]">
                                    <option :value="item" v-for="item, index in existe_evidencias" :key="index">
                                        {{ item.nombre }}</option>
                                </select>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                            <div class="col">
                                <label class="form-label">Peso: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                                    aria-describedby="emailHelp" v-model="existe_evidencia[indice].peso" disabled />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="row  mt-4">
                            <div
                                style="background-color: gray;color:white;width:95%; margin:auto; border-radius:10px;padding:5px">
                                Se ejecutó eficaz</div>
                            <div class="col">
                                <label class="form-label">Descripción: *</label>
                                <select class="form-select" aria-label="Default select example" required
                                    v-model="ejecucion_eficas[indice]">
                                    <option :value="item" v-for="item, index in ejecuciones_eficaces" :key="index">
                                        {{ item.nombre }}</option>
                                </select>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                            <div class="col">
                                <label class="form-label">Peso: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                                    aria-describedby="emailHelp" v-model="ejecucion_eficas[indice].peso" disabled />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="row  mt-4">
                            <div
                                style="background-color: gray;color:white;width:95%; margin:auto; border-radius:10px;padding:5px">
                                Resultado del control</div>
                            <div class="col">
                                <label class="form-label">Descripción: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                                    aria-describedby="emailHelp" v-model="resultado_control[indice].descripcion" disabled />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                            <div class="col">
                                <label class="form-label">Peso: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa"
                                    aria-describedby="emailHelp" v-model="resultado_control[indice].peso" disabled />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div class="row mb-5">
                        <div class="col">
                                <label class="form-label">Responsable: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa" required
                                    aria-describedby="emailHelp" v-model="responsable" />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                            <div class="col">
                                <label class="form-label">Última revisión: *</label>
                                <input type="text" class="form-control" autocomplete="off" id="direccion_empresa" required
                                    aria-describedby="emailHelp" v-model="ultima_revision" />
                                <div class="invalid-feedback">
                                    {{ mensaje_error }}
                                </div>
                            </div>
                    </div>
            </div>
            <!-- :disabled="deshabilitar_boton" -->
            <button 
                class="btn btn-success m-4"  type="submit">Guardar formulario</button>
        </form>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    components: {

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
            probabilidad: [{}, {}],
            impacto: [{}, {}],
            documento_registrado: [{}, {}],
            clase_control: [{}, {}],
            frecuencia_control: [{}, {}],
            tipo_control:[{},{}],
            existe_evidencia:[{},{}],
            ejecucion_eficas:[{},{}],
            metodo_identificacion:[{},{}],
            factor:[{},{}],
            seguimiento:[{},{}],
            control:[{},{}],
            soporte:[{},{}],
            nivel_oportunidad_riesgo:[{},{}],
            plan_accion:'',
            consecuencia:'',
            efecto:'',
            amenaza:'',
            oportunidad2:'',
            tab_amenaza: true,
            tab_oportunidad: false,
            indice: 0,
            resultado: [{ peso_probabilidad: "", descripcion_probabilidad: "", peso_impacto: "", descripcion_impacto: "", total: '' }, { peso_probabilidad: "", descripcion_probabilidad: "", peso_impacto: "", descripcion_impacto: "", total: '' }],
            resultado_control: [{ descripcion: "", peso: "" }, {  descripcion: "", peso: "" }],
            nivel_probabilidad: [{ nivel: 1, probabilidad: 'Muy Bajo', color: "" }, { nivel: 2, probabilidad: 'Bajo', color: "" }, { nivel: 3, probabilidad: 'Medio', color: "" }, { nivel: 4, probabilidad: 'Alto', color: "" }, { nivel: 5, probabilidad: 'Muy Bajo', color: "" }],
            nivel_impacto: [{ nivel: 1, impacto: 'Insignificante', color: "" }, { nivel: 5, impacto: 'Leve', color: "" }, { nivel: 10, impacto: 'Moderado', color: "" }, { nivel: 15, impacto: 'Alto', color: "" }, { nivel: 20, impacto: 'Muy Alto', color: "" }],
            tipos_proceso: [{ id: 1, nombre: 'Apoyo' }, { id: 2, nombre: 'Estrategico' }, { id: 3, nombre: 'Misional' }],
            nombres_proceso: [{ id: 1, nombre: 'Estrategia' }, { id: 2, nombre: 'Tesorería' }, { id: 3, nombre: 'Comercial' }, { id: 4, nombre: 'Atracción y selección' }, { id: 5, nombre: 'Preingreso' }, { id: 6, nombre: 'Contratación' }, { id: 7, nombre: 'Nómina' }, { id: 8, nombre: 'Facturación' }, { id: 9, nombre: 'Compras' }, { id: 10, nombre: 'Cartera' }, { id: 11, nombre: 'Servicio al cliente' }, { id: 12, nombre: 'Talento humano' }, { id: 13, nombre: 'Juridico' }, { id: 14, nombre: 'Conciliaciones' }, { id: 15, nombre: 'Tics' }],
            metodos_identificacion: [{ id: 1, nombre: 'Dofa' }, { id: 2, nombre: 'SNC Auditoría interna' }, { id: 3, nombre: 'SNC Auditoría externa' }, { id: 4, nombre: 'Quejas' }, { id: 5, nombre: 'Control NC' }, { id: 6, nombre: 'Grupo primario' }, { id: 7, nombre: 'Alta gerencia' }, { id: 8, nombre: 'Ente de control' }],
            factores:[{id:'1',nombre:'Interno'},{id:'2',nombre:'Externo'}],
            seguimientos:[{id:'1',nombre:'Mensual'},{id:'2',nombre:'Bimensual'},{id:'3',nombre:'Trimestral'},{id:'4',nombre:'Semestral'},{id:'5',nombre:'Anual'},{id:'6',nombre:'Permanente'}],
            documentos_registrados:[{id:'1',nombre:'Si',peso:'10'},{id:'2',nombre:'No',peso:'0'}],
            clases_control:[{id:'1',nombre:'Correctivo',peso:'0'},{id:'2',nombre:'Preventivo',peso:'15'}],
            frecuencias_control:[{id:'1',nombre:'Razonable',peso:'15'},{id:'2',nombre:'No razonable',peso:'0'}],
            tipos_control:[{id:'1',nombre:'Manual',peso:'0'},{id:'2',nombre:'Automático',peso:'25'}],
            existe_evidencias:[{id:'1',nombre:'Existe',peso:'20'},{id:'2',nombre:'No existe',peso:'0'}],
            ejecuciones_eficaces:[{id:'1',nombre:'Si',peso:'15'},{id:'2',nombre:'No',peso:'0'}],
            niveles_probabilidad: [],
            responsable:'',
            ultima_revision:'',
            color_celda_oportunidades:'',
            matriz_oportunidades:[
                {peso_columna:'1',peso_celda:'1',atributo_1:'OPORTUNIDAD BAJA',atributo_2:'REPLANTEAR', color:'red'},
                {peso_columna:'1',peso_celda:'2',atributo_1:'OPORTUNIDAD BAJA',atributo_2:'REPLANTEAR', color:'red'},
                {peso_columna:'1',peso_celda:'3',atributo_1:'OPORTUNIDAD BAJA',atributo_2:'REPLANTEAR', color:'red'},
                {peso_columna:'1',peso_celda:'4',atributo_1:'OPORTUNIDAD BAJA',atributo_2:'REPLANTEAR', color:'red'},
                {peso_columna:'1',peso_celda:'5',atributo_1:'OPORTUNIDAD BAJA',atributo_2:'REPLANTEAR', color:'red'},
               
                {peso_columna:'5',peso_celda:'5',atributo_1:'OPORTUNIDAD BAJA',atributo_2:'REPLANTEAR', color:'red'},
                {peso_columna:'5',peso_celda:'10',atributo_1:'OPORTUNIDAD MODERADA',atributo_2:'REVISAR', color:'yellow'},
                {peso_columna:'5',peso_celda:'15',atributo_1:'OPORTUNIDAD MODERADA',atributo_2:'REVISAR', color:'yellow'},
                {peso_columna:'5',peso_celda:'20',atributo_1:'OPORTUNIDAD MODERADA',atributo_2:'REVISAR', color:'yellow'},
                {peso_columna:'5',peso_celda:'25',atributo_1:'OPORTUNIDAD MODERADA',atributo_2:'REVISAR', color:'yellow'},
                
                {peso_columna:'10',peso_celda:'10',atributo_1:'OPORTUNIDAD MODERADA',atributo_2:'REVISAR', color:'yellow'},
                {peso_columna:'10',peso_celda:'20',atributo_1:'OPORTUNIDAD MODERADA',atributo_2:'REVISAR', color:'yellow'},
                {peso_columna:'10',peso_celda:'30',atributo_1:'OPORTUNIDAD',atributo_2:'APROVECHAR', color:'blue'},
                {peso_columna:'10',peso_celda:'40',atributo_1:'OPORTUNIDAD',atributo_2:'APROVECHAR', color:'blue'},
                {peso_columna:'10',peso_celda:'50',atributo_1:'OPORTUNIDAD',atributo_2:'APROVECHAR', color:'blue'},
                
                {peso_columna:'15',peso_celda:'15',atributo_1:'OPORTUNIDAD MODERADA',atributo_2:'REVISAR', color:'yellow'},
                {peso_columna:'15',peso_celda:'30',atributo_1:'OPORTUNIDAD',atributo_2:'APROVECHAR', color:'blue'},
                {peso_columna:'15',peso_celda:'45',atributo_1:'OPORTUNIDAD',atributo_2:'APROVECHAR', color:'blue'},
                {peso_columna:'15',peso_celda:'60',atributo_1:'OPORTUNIDAD ALTA',atributo_2:'APROVECHAR', color:'green'},
                {peso_columna:'15',peso_celda:'75',atributo_1:'OPORTUNIDAD ALTA',atributo_2:'APROVECHAR', color:'green'},
                
                
                {peso_columna:'20',peso_celda:'20',atributo_1:'OPORTUNIDAD MODERADA',atributo_2:'REVISAR', color:'yellow'},
                {peso_columna:'20',peso_celda:'40',atributo_1:'OPORTUNIDAD',atributo_2:'APROVECHAR', color:'blue'},
                {peso_columna:'20',peso_celda:'60',atributo_1:'OPORTUNIDAD ALTA',atributo_2:'APROVECHAR', color:'green'},
                {peso_columna:'20',peso_celda:'80',atributo_1:'OPORTUNIDAD ALTA',atributo_2:'APROVECHAR', color:'green'},
                {peso_columna:'20',peso_celda:'100',atributo_1:'OPORTUNIDAD ALTA',atributo_2:'APROVECHAR', color:'green'},
            ],
            matriz_amenazas:[
                {peso_columna:'1',peso_celda:'1',atributo_1:'RIESGO BAJO',atributo_2:'ASUMIR', color:'green'},
                {peso_columna:'1',peso_celda:'2',atributo_1:'RIESGO BAJO',atributo_2:'ASUMIR', color:'green'},
                {peso_columna:'1',peso_celda:'3',atributo_1:'RIESGO BAJO',atributo_2:'ASUMIR', color:'green'},
                {peso_columna:'1',peso_celda:'4',atributo_1:'RIESGO BAJO',atributo_2:'ASUMIR', color:'green'},
                {peso_columna:'1',peso_celda:'5',atributo_1:'RIESGO BAJO',atributo_2:'ASUMIR', color:'green'},
               
                {peso_columna:'5',peso_celda:'5',atributo_1:'RIESGO BAJO',atributo_2:'ASUMIR', color:'red'},
                {peso_columna:'5',peso_celda:'10',atributo_1:'RIESGO MODERADO',atributo_2:'REDUCIR', color:'yellow'},
                {peso_columna:'5',peso_celda:'15',atributo_1:'RIESGO MODERADO',atributo_2:'REDUCIR', color:'yellow'},
                {peso_columna:'5',peso_celda:'20',atributo_1:'RIESGO MODERADO',atributo_2:'REDUCIR', color:'yellow'},
                {peso_columna:'5',peso_celda:'25',atributo_1:'RIESGO MODERADO',atributo_2:'REDUCIR', color:'yellow'},
                
                {peso_columna:'10',peso_celda:'10',atributo_1:'RIESGO MODERADO',atributo_2:'REDUCIR', color:'yellow'},
                {peso_columna:'10',peso_celda:'20',atributo_1:'RIESGO MODERADO',atributo_2:'REDUCIR', color:'yellow'},
                {peso_columna:'10',peso_celda:'30',atributo_1:'RIESGO ALTO',atributo_2:'EVITAR', color:'orange'},
                {peso_columna:'10',peso_celda:'40',atributo_1:'RIESGO ALTO',atributo_2:'EVITAR', color:'orange'},
                {peso_columna:'10',peso_celda:'50',atributo_1:'RIESGO ALTO',atributo_2:'EVITAR', color:'orange'},
                
                {peso_columna:'15',peso_celda:'15',atributo_1:'RIESGO MODERADO',atributo_2:'REDUCIR', color:'yellow'},
                {peso_columna:'15',peso_celda:'30',atributo_1:'RIESGO ALTO',atributo_2:'EVITAR', color:'orange'},
                {peso_columna:'15',peso_celda:'45',atributo_1:'RIESGO ALTO',atributo_2:'EVITAR', color:'orange'},
                {peso_columna:'15',peso_celda:'60',atributo_1:'RIESGO CRITICO',atributo_2:'EVITAR', color:'red'},
                {peso_columna:'15',peso_celda:'75',atributo_1:'RIESGO CRITICO',atributo_2:'EVITAR', color:'red'},
                
                
                {peso_columna:'20',peso_celda:'20',atributo_1:'RIESGO MODERADO',atributo_2:'REDUCIR', color:'yellow'},
                {peso_columna:'20',peso_celda:'40',atributo_1:'RIESGO ALTO',atributo_2:'EVITAR', color:'orange'},
                {peso_columna:'20',peso_celda:'60',atributo_1:'RIESGO CRITICO',atributo_2:'EVITAR', color:'red'},
                {peso_columna:'20',peso_celda:'80',atributo_1:'RIESGO CRITICO',atributo_2:'EVITAR', color:'red'},
                {peso_columna:'20',peso_celda:'100',atributo_1:'RIESGO CRITICO',atributo_2:'EVITAR', color:'red'},
            ]

        }
    },
    computed: {
        cellStyle() {
      return {
        backgroundColor: this.color_celda_oportunidades,
        color: this.color_celda_oportunidades === 'yellow' ? 'black' : 'white'
      }
    }
    },
    watch: {
        impacto() {
            if (this.impacto[this.indice].nivel != undefined && this.probabilidad[this.indice].nivel != undefined) {
                let total = ''
                total = parseInt(this.impacto[this.indice].nivel) * parseInt(this.probabilidad[this.indice].nivel)
                this.resultado[this.indice].total = total + ' %'  
                this.oportunidadTratamiento(total)              
            }
        },
        probabilidad() {
            if (this.impacto[this.indice].nivel != undefined && this.probabilidad[this.indice].nivel != undefined) {
                let total = ''
                total = parseInt(this.probabilidad[this.indice].nivel) * parseInt(this.impacto[this.indice].nivel)
                this.resultado[this.indice].total = total + ' %'
                this.oportunidadTratamiento(total)         
            }
        }
    },
    mounted() {

    },
    methods: {
        oportunidadTratamiento(total){
          
            if(this.indice == 0){
                this.recorreMatriz( this.matriz_amenazas, total)
            }else{
                this.recorreMatriz( this.matriz_oportunidades, total)
            }
        },
        recorreMatriz(matriz, total){
            var self = this
            matriz.forEach(item => {
                    if(item.peso_celda == total){
                        self.nivel_oportunidad_riesgo[self.indice].nivel = item.atributo_1
                        self.nivel_oportunidad_riesgo[self.indice].tratamiento = item.atributo_2
                        self.color_celda_oportunidades = item.color
                    }
                });

        },
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