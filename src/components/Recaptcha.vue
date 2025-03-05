<template>
  <div class="recaptcha-wrapper">
    <div ref="recaptchaContainer"></div>
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
      validator: (value) => /^6L[\w-]+$/.test(value),
    },
  },

  emits: ["verified", "error"],

  setup(props, { emit }) {
    const recaptchaContainer = ref(null);
    const widgetId = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const initializeRecaptcha = () => {
      if (!window.grecaptcha) {
        error.value = "reCAPTCHA no está disponible";
        return;
      }

      try {
        widgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
          sitekey: props.sitekey,
          callback: (token) => emit("verified", token),
          "error-callback": () => {
            error.value = "Error de verificación CAPTCHA";
            emit("error");
          },
        });
        loading.value = false;
      } catch (e) {
        error.value = "Error al inicializar CAPTCHA";
        emit("error", e);
      }
    };

    const loadScript = () => {
      if (window.grecaptcha) {
        initializeRecaptcha();
        return;
      }

      window.vueRecaptchaLoaded = () => {
        window.grecaptcha.ready(initializeRecaptcha);
      };

      if (!document.querySelector("#recaptcha-script")) {
        const script = document.createElement("script");
        script.id = "recaptcha-script";
        script.src =
          "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaLoaded&render=explicit";
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          error.value = "Error al cargar reCAPTCHA";
          loading.value = false;
        };
        document.head.appendChild(script);
      }
    };

    onMounted(loadScript);

    onBeforeUnmount(() => {
      if (window.grecaptcha && widgetId.value) {
        window.grecaptcha.reset(widgetId.value);
      }
      delete window.vueRecaptchaLoaded;
    });

    return {
      recaptchaContainer,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.recaptcha-wrapper {
  margin: 1rem 0;
  min-height: 78px;
  position: relative;
}

.grecaptcha-container {
  margin: 0 auto;
  max-width: 304px;
}

.error-message {
  color: #ff4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
  position: absolute;
  bottom: -1.5rem;
  width: 100%;
}

.loading-message {
  color: #666;
  font-size: 0.9rem;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
