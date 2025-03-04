<template>
  <div>
    <!-- Contenedor del CAPTCHA -->
    <div ref="recaptchaContainer"></div>

    <!-- Mensajes de estado -->
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="loading" class="loading">Cargando CAPTCHA...</p>
  </div>
</template>

<script>
import { onMounted, ref, onBeforeUnmount } from "vue";

export default {
  props: {
    sitekey: {
      type: String,
      required: true,
    },
  },

  emits: ["verified", "error"],

  setup(props, { emit }) {
    const recaptchaContainer = ref(null);
    const widgetId = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const onSuccess = (token) => {
      emit("verified", token);
      error.value = null;
    };

    const onError = () => {
      error.value = "Error al verificar el CAPTCHA";
      emit("error");
    };

    const renderCaptcha = () => {
      if (!window.grecaptcha) {
        error.value = "reCAPTCHA no cargado";
        return;
      }

      widgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
        sitekey: props.sitekey,
        callback: onSuccess,
        "error-callback": onError,
        theme: "light", // 'light' o 'dark'
        size: "normal", // 'normal' o 'compact'
      });

      loading.value = false;
    };

    const loadScript = () => {
      if (document.querySelector("#recaptcha-script")) {
        renderCaptcha();
        return;
      }

      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.grecaptcha.ready(renderCaptcha);
      };
      script.onerror = () => {
        error.value = "Error al cargar reCAPTCHA";
        loading.value = false;
      };

      document.head.appendChild(script);
    };

    const resetCaptcha = () => {
      if (widgetId.value !== null) {
        window.grecaptcha.reset(widgetId.value);
      }
    };

    onMounted(loadScript);
    onBeforeUnmount(() => {
      if (widgetId.value !== null) {
        window.grecaptcha.reset(widgetId.value);
      }
    });

    return {
      recaptchaContainer,
      loading,
      error,
      resetCaptcha,
    };
  },
};
</script>

<style>
.grecaptcha-badge {
  visibility: visible; /* Para el badge flotante */
}

.error {
  color: #ff4444;
  margin-top: 0.5rem;
}

.loading {
  color: #666;
}
</style>
