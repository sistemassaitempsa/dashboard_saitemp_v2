<template>
    <div>
        <FormularioUsuario :titulo="titulo" v-if="user_type == 1" />
        <Cliente :titulo="titulo" v-if="user_type == 2"/>
        <EditarUsuarioCandidato v-if="user_type == 3" />
    </div>
</template>
<script>
import Cliente from '@/components/Cliente.vue';
import FormularioUsuario from '@/components/FormularioUsuario.vue';
import EditarUsuarioCandidato from "@/components/EditarUsuarioCandidato.vue";
export default {
    components: {
        FormularioUsuario,
        Cliente
    },
    props:{
        user_type:{
            type:String,
            required:true
        }
    },
  },
  components: {
    FormularioUsuario,
    EditarUsuarioCandidato,
  },
  data() {
    return {
      titulo: "Editar datos de usuario",
    };
  },

  methods: {},
};
</script>
<style scoped></style>
