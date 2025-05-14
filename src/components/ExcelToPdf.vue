<template>
  <div class="pdf-to-excel-container">
    <h3>Convertir PDF a Excel</h3>
    <input type="file" accept="application/pdf" @change="handlePdfUpload" />
    <button @click="generateExcel" :disabled="!pdfText.length">
      Generar Excel
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import * as XLSX from "xlsx";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const pdfText = ref([]); // array de arrays (una por página)

const handlePdfUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  pdfText.value = [];

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();

    let currentLine = [];

    // Agrupar palabras por línea
    textContent.items.forEach((item) => {
      const str = item.str.trim();
      if (!str) return;
      const y = Math.floor(item.transform[5]); // coordenada vertical aproximada
      if (!currentLine[y]) currentLine[y] = [];
      currentLine[y].push(str);
    });

    const processedLines = Object.values(currentLine)
      .map((line) => line.join(" "))
      .map(
        (row) => row.trim().split(/\s{2,}/g) // separación por dos o más espacios
      );

    pdfText.value.push(processedLines);
  }

  alert("PDF procesado, ahora puedes generar el Excel.");
};

const generateExcel = () => {
  const wb = XLSX.utils.book_new();

  pdfText.value.forEach((pageRows, index) => {
    const ws = XLSX.utils.aoa_to_sheet(pageRows);
    XLSX.utils.book_append_sheet(wb, ws, `Página ${index + 1}`);
  });

  XLSX.writeFile(wb, `pdf_tablas_${Date.now()}.xlsx`);
};
</script>

<style scoped>
.pdf-to-excel-container {
  padding: 1rem;
}
</style>
