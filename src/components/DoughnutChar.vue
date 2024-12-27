<template>
  <div>
    <div v-if="loading">
      <Doughnut :data="data" :options="options" />
    </div>
  </div>
</template>
<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "",
  components: {
    Doughnut,
  },
  mixins: [],
  props: {
    label_dataset: {
      default: "",
      type: String,
    },
    nombre_grafico: {
      default: "",
      type: String,
    },
    datos: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      loading: false,
      labels: [],
      cantidad_cargos: [],
      data: {},
      options: {
        responsive: true,
      },
      backgroundColor: [],
    };
  },
  computed: {},
  watch: {
    datos: {
      handler() {
        let self = this;
        Object.values(self.datos[0][0]).forEach(function (item) {
          self.labels.push(item);
        });
        Object.values(self.datos[0][1]).forEach(function (item) {
          self.cantidad_cargos.push(item);
        });

        self.llenarGrafico();
        self.loading = true;
      },
      deep: true,
    },
    loading: function () {
      this.graficosCargados();
    },
  },
  mounted() {},
  methods: {
    llenarGrafico() {
      var self = this;
      var color = "";
      for (var i = 0; i < this.labels.length; i++) {
        color = self.getRandomColor();
        self.backgroundColor.push(color);
      }
      this.data = {
        label: this.nombre_grafico,
        labels: this.labels,
        datasets: [
          {
            label: this.label_dataset,
            data: this.cantidad_cargos,
            backgroundColor: self.backgroundColor,
            // [
            //     'rgba(255, 99, 132, 0.8)',
            //     'rgba(255, 159, 64, 0.8)',
            //     'rgba(255, 205, 86, 0.8)',
            //     'rgba(75, 192, 192, 0.8)',
            //     'rgba(54, 162, 235, 0.8)',
            //     'rgba(153, 102, 255, 0.8)',
            //     'rgba(201, 203, 207, 0.8)'
            // ],
            borderColor: ["rgb(190, 201, 202)"],
            // [
            //     'rgb(255, 99, 132)',
            //     'rgb(255, 159, 64)',
            //     'rgb(255, 205, 86)',
            //     'rgb(75, 192, 192)',
            //     'rgb(54, 162, 235)',
            //     'rgb(153, 102, 255)',
            //     'rgb(201, 203, 207)'
            // ],
            borderWidth: 1,
          },
        ],
      };
    },
    getRandomColor() {
      const allowedColors = [
        "rgba(255, 99, 132, 0.8)",
        "rgba(255, 159, 64, 0.8)",
        "rgba(255, 205, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(186,157,244,0.8)",
        "rgba(201,153,175,0.8)",
      ];

      // Utilizar un Set para almacenar los colores seleccionados
      const selectedColors = new Set();

      // Mientras haya colores disponibles para seleccionar
      while (selectedColors.size < allowedColors.length) {
        // Seleccionar un índice aleatorio del array de colores permitidos
        const randomIndex = Math.floor(Math.random() * allowedColors.length);

        // Agregar el color al Set (no se agregará si ya está presente)
        selectedColors.add(allowedColors[randomIndex]);
      }

      // Convertir el Set de nuevo a un array y devolver un color aleatorio
      const uniqueColorsArray = Array.from(selectedColors);
      const randomColorIndex = Math.floor(
        Math.random() * uniqueColorsArray.length
      );
      return uniqueColorsArray[randomColorIndex];
    },

    graficosCargados() {
      this.$emit("graficoCargado", this.loading, this.index);
    },
  },
};
</script>
<style scoped></style>
