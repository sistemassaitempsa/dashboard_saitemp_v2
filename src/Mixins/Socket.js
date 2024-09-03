export const Socket = {
  data () {
    return {
      audioPath: require ('../assets/file.mp3'),
      pila_notificaciones: [],
    };
  },
  mounted() {
    var self = this
    setInterval(() => {
      console.log("limpiando consola")
      self.pila_notificaciones = JSON.parse(localStorage.getItem("pila"))
      if(self.pila_notificaciones.length > 1){
        self.pila_notificaciones.splice(0,1)
        localStorage.setItem (
          'pila',
          JSON.stringify (this.pila_notificaciones)
        );
      }
    }, 10000);
  },
  methods: {
    decodeJwtFromLocalStorage (key) {
      try {
        // Recuperar el token del localStorage
        const token = localStorage.getItem (key);
        if (!token) {
          return null;
        }
        // Dividir el token en partes
        const parts = token.split ('.');
        if (parts.length !== 3) {
          throw new Error ('Token JWT inválido');
        }

        // Obtener y convertir la parte del payload
        const base64Url = parts[1];
        const base64 = this.base64UrlToBase64 (base64Url);
        const decodedString = atob (base64);

        // Convertir el string decodificado a objeto JSON
        return JSON.parse (decodedString);
      }
       catch (error) {
        console.error ('Error al decodificar el token:', error);
        return null;
      }
    },

    // Función para convertir Base64URL a Base64 estándar
    base64UrlToBase64 (base64Url) {
      return base64Url
        .replace (/-/g, '+') 
        .replace (/_/g, '/')
        .concat ('='.repeat ((4 - base64Url.length % 4) % 4)); // Añadir relleno
    },
    socket (chanell, event) {
      window.Echo.channel (chanell).listen (event, e => {
        const decodedPayload = this.decodeJwtFromLocalStorage ('access_token');
        if (e.message.encargado_id == decodedPayload.sub) {
          if (this.pila_notificaciones != null) {
            if (Array.isArray (this.pila_notificaciones)) {
              this.pila_notificaciones.forEach (item => {
                item.visible = 'hidden';
              });
            } else {
              this.pila_notificaciones = [];
            }
          } else {
            this.pila_notificaciones = [];
          }
          this.pila_notificaciones.push ({
            message: e.message.mensaje,
            class: 'notificacion animate__animated animate__fadeInRight',
            visible: 'visible',
          });
          localStorage.setItem (
            'pila',
            JSON.stringify (this.pila_notificaciones)
          );
          const audio = new Audio (this.audioPath);
          audio.play ();
        }
      });
    },
  },
};
