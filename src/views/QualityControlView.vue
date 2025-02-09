<template>
  <div class="px-12 py-8">
    <div class="text-2xl pb-3">Quality Control</div>
    <DataTable
      :value="qc"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      class="shadow rounded-lg"
    >
      <Column field="id" header="ID"></Column>
      <Column field="production_order.id" header="Production Order ID"></Column>
      <Column field="inspected_at" header="Inspected at"></Column>
      <Column field="defects_found" header="Defects Found"></Column>

      <Column header="Defects rate">
        <template #body="{ data }: { data: QualityInspection }">
          <div>
            {{ ((data.defects_found / data.production_order.quantity) * 100).toFixed(2) }} %
          </div>
        </template>
      </Column>
      <Column field="notes" header="Notes"></Column>
    </DataTable>
    <div class="py-3 text-2xl">Defect Rate Trends</div>
    <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
  </div>
</template>

<script setup lang="ts">
import type { QualityInspection } from '@/types/types'
import { computed, onMounted, ref } from 'vue'
import { Column, DataTable } from 'primevue'
import Chart from 'primevue/chart'

const qc = ref<QualityInspection[]>([])

onMounted(async () => {
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/quality-inspections`).then(
    async (res) => (qc.value = await res.json()),
  )
})

const chartData = computed(() => {
  return {
    labels: qc.value.map((qc) => qc.inspected_at),
    datasets: [
      {
        label: 'Defect Rate (%)',
        data: qc.value.map(
          (entry) => (entry.defects_found / entry.production_order.quantity) * 100,
        ),
        fill: false,
        tension: 0.4,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Defect Rate (%)',
      },
      beginAtZero: true,
    },
    x: {
      title: {
        display: true,
        text: 'Inspection Date',
      },
    },
  },
}
</script>
