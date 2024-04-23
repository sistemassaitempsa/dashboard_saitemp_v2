<template>
    <div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Formulario en modo vista</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <GestionIngresos :id_registro="id_registro" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import GestionIngresos from './GestionIngresos.vue'

export default {
    components: {
        GestionIngresos,
     

    },
    props: {
        id_flotante: {
            type: Number,
            default: 0
        }

    },
    data() {
        return {
            id_registro: undefined,
            loading: true
        }
    },
    computed: {

    },
    watch: {
        id_flotante() {
            this.id_registro = this.id_flotante
        }
    },
    mounted() {
   
    },
    created() {

    },
    methods: {
       
    }
};
</script>
<style scoped>
#exampleModal{
    overflow: hidden;
}
</style>