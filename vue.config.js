// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? ''
//     : '/'
// }
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      definitions[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = 'false'; // O 'true' si quieres habilitar los detalles
      return definitions;
    });
  }
};

