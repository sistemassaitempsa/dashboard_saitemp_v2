<template>
  <div>
    <div v-if="loading">
      <Bar :data="data" :options="options" />
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "StackedBarChart",
  components: {
    Bar,
  },
  props: {
    labels_x: {
      default: () => [], // Arreglo vacío por defecto
      type: Array, // Define que debe ser un arreglo
    },
    datosS: {
      default: "", // Cadena vacía por defecto
      type: String, // Define que debe ser una cadena
    },
    datosA: {
      default: () => [], // Arreglo vacío por defecto
      type: Array, // Define que debe ser un arreglo
    },
    items: {
      default: () => [], // Arreglo vacío por defecto
      type: Array, // Define que debe ser un arreglo
    },
    index: {
      type: Number, // Define que debe ser un número
      default: 0, // Valor predeterminado: 0
    },
  },
  data() {
    return {
      loading: false,
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
            // max: 2000,
            ticks: {
              stepSize: 500,
            },
          },
        },
      },
    };
  },
  watch: {
    datosS(newVal) {
      const datos = JSON.parse(newVal);
      this.llenarGraficoMultiple(datos);
      this.loading = true;
    },
    loading(newVal) {
      console.log(newVal);
      this.graficosCargados();
    },
  },
  mounted() {
    // const datos = this.generateRandomData();
    // console.log('*****',datos)
    // this.data.labels = datos.labels;
    // this.llenarGraficoMultiple(this.data.data);
    // this.loading = true;
  },
  methods: {
    llenarGraficoMultiple(datos) {
      // this.data.datasets = datos.map(item => {
      //   const color = this.getRandomColor();
      //   return {
      //     label: item.label,
      //     data: item.data,
      //     backgroundColor: color,
      //     borderColor: color,
      //     borderWidth: 1,
      //   };
      // });
      let self = this;
      this.data.labels = [];
      this.data.labels = this.labels_x;
      var color = "";
      self.data.datasets = [];
      datos.forEach(function (item) {
        color = self.getRandomColor();
        self.data.datasets.push({
          label: item.label,
          data: item.data,
          backgroundColor: [color],
          borderColor: [color],
          borderWidth: 1,
        });
      });
    },
    getRandomColor() {
      const allowedColors = [
        "rgba(255, 99, 132, 0.8)",
        "rgba(255, 159, 64, 0.8)",
        "rgba(255, 205, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(186, 157, 244, 0.8)",
        "rgba(201, 153, 175, 0.8)",
      ];
      return allowedColors[Math.floor(Math.random() * allowedColors.length)];
    },
    graficosCargados() {
      this.$emit("graficoCargado", this.loading, this.index);
    },
    // generateRandomData() {
    //   const months = [
    //     'Enero',
    //     'Febrero',

    //   ];
    //   const states = ['Estado 1', 'Estado 2', 'Estado 3','Estado 4'];

    //   const labels = months;
    //   const data = states.map(state => ({
    //     label: state,
    //     data: months.map(() => Math.floor(Math.random() * 100)),
    //   }));

    //   return { labels, data };
    // },
  },
};
</script>

<style scoped></style>
