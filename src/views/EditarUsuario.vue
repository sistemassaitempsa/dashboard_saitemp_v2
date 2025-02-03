<template>
  <div>
    <FormularioUsuario :titulo="titulo" v-if="user_type == '1'" />
    <EditarUsuarioCandidato v-if="user_type == '3'" />
  </div>
</template>
<script>
import FormularioUsuario from "@/components/FormularioUsuario.vue";
import EditarUsuarioCandidato from "@/components/EditarUsuarioCandidato.vue";
export default {
  props: {
    user_type: {
      type: String,
      required: false,
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
