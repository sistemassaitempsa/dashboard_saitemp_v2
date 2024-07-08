export const Socket = {
  data () {
    return {
      audioPath: require ('../assets/file.mp3'),
      pila_notificaciones: [],
    };
  },
  methods: {
    socket (chanell, event) {
      window.Echo.channel (chanell).listen (event, e => {
        if (e.message.marca_temporal != localStorage.getItem ('marca_temporalnc')) {
          console.log (e.message.marca_temporal);
        }
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
      });
    },
  },
};
