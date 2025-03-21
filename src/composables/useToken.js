import { ref } from "vue";
export const useToken = () => {
  const URL_API = ref(process.env.VUE_APP_URL_API);
  const urlExterna = () => {
    const urlCompleta = window.location.href;
    if (urlCompleta.includes("debidadiligencia.saitempsa.com")) {
      URL_API.value =
        "https://debidadiligencia.saitempsa.com:8484/aplicaciones/api/public/";
    }
  };
  const configHeader = () => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    return config;
  };
  return { configHeader, urlExterna, URL_API };
};
