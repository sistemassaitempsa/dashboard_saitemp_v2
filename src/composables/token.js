// useConfig.js
import { computed } from 'vue';

export function useConfig() {
  const URL_API = computed(() => {
    const urlCompleta = window.location.href;
    if (urlCompleta.includes('debidadiligencia.saitempsa.com')) {
      return process.env.VUE_APP_URL_API2;
    }
    // return process.env.VUE_APP_URL_API; // Puedes agregar una URL por defecto si es necesario
    return 'http://localhost:80/aplicaciones/api/public/'; // Puedes agregar una URL por defecto si es necesario
  });

  const configHeader = () => ({
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  });

  return {
    URL_API,
    configHeader,
  };
}
