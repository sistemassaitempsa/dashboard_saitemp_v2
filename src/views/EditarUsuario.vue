<template>
  <div>
    <FormularioUsuario :titulo="titulo" v-if="usuario()" />
    <Cliente :titulo="titulo" v-if="cliente()" />
    <EditarUsuarioCandidato v-if="candidato()" :user_type="user_type" />
  </div>
</template>
<script>
import Cliente from '@/components/Cliente.vue';
import FormularioUsuario from "@/components/FormularioUsuario.vue";
import EditarUsuarioCandidato from "@/components/EditarUsuarioCandidato.vue";
export default {
    components: {
        FormularioUsuario,
        Cliente,
        EditarUsuarioCandidato,
    },
    props: {
        user_type: {
            type: String,
            required: true
        },
        userlogued: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            titulo: 'Editar datos de usuario',
        };
    },

    methods: {
        usuario() {
            if (this.$route.params.tipo == undefined && this.user_type == 1) {
                return true;
            }
            else if (this.$route.params.tipo == 1) {
                return true;
            }
        },
        cliente() {
            if (this.$route.params.tipo == undefined && this.user_type == 2) {
                return true;
            }
            else if (this.$route.params.tipo == 2) {
                return true;
            }
        },
        candidato() {
            if (this.$route.params.tipo == undefined && this.user_type == 3) {
                return true;
            }
            else if (this.$route.params.tipo == 3) {
                return true;
            }
        },
    },
};
</script>
<style scoped></style>
