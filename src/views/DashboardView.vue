<template>
  <div class="px-12 py-8">
    <div class="pb-3 text-2xl">Key Metrics</div>
    <div class="flex gap-6 flex-wrap text-xs md:text-sm">
      <div class="shadow px-6 py-3 w-fit rounded-lg">
        <div>Total Machines: {{ machines.length }}</div>
      </div>

      <div class="shadow px-6 py-3 w-fit rounded-lg">
        <div>Running Machines: {{ runningMachines }}</div>
      </div>
      <div class="shadow px-6 py-3 w-fit rounded-lg">
        <div>Orders in Progress: {{ ordersInProgress }}</div>
      </div>

      <div class="shadow px-6 py-3 w-fit rounded-lg">
        <div>Defect Rate: {{ defectRate }} %</div>
      </div>
    </div>
    <div class="gap-3 md:grid grid-cols-2">
      <div class="mt-8 shadow px-6 py-3 rounded-lg">
        <div>Machine Utilization (%)</div>

        <Chart type="bar" :data="barChartData" class="w-full" />
        <div class="text-sm">
          Average machine utilization: {{ averageUtilization.toFixed(2) }} %
        </div>
      </div>

      <div class="mt-8 shadow px-6 py-3 rounded-lg">
        <div>Production order statuses</div>

        <Chart type="pie" :data="pieChartData" class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MachineStatus, ProductionOrderStatus, type machineType } from '@/types/types'
import Chart from 'primevue/chart'
import { computed, onMounted, ref } from 'vue'

const machines = ref<machineType[]>([])

const productionOrders = ref<{ status: ProductionOrderStatus }[]>([])

const defectRate = ref<number>(0)

const barChartData = computed(() => {
  return {
    labels: machines.value.map((machine) => machine.name),
    datasets: [
      {
        label: 'Machine',
        data: machines.value.map((machine) => machine.utilization_percentage),
      },
    ],
  }
})

const runningMachines = computed(
  () => machines.value.filter((machine) => machine.status == MachineStatus.RUNNING).length,
)

const getStatusCounts = (): [number, number, number, number] => {
  const counts = {
    [ProductionOrderStatus.PENDING]: 0,
    [ProductionOrderStatus.IN_PROGRESS]: 0,
    [ProductionOrderStatus.COMPLETED]: 0,
    [ProductionOrderStatus.CANCELED]: 0,
  }

  for (const order of productionOrders.value) {
    counts[order.status] = (counts[order.status] || 0) + 1
  }

  return [
    counts[ProductionOrderStatus.PENDING],
    counts[ProductionOrderStatus.IN_PROGRESS],
    counts[ProductionOrderStatus.COMPLETED],
    counts[ProductionOrderStatus.CANCELED],
  ]
}

const ordersInProgress = computed(() => {
  return productionOrders.value.filter(
    (orders) => orders.status == ProductionOrderStatus.IN_PROGRESS,
  ).length
})

const pieChartData = computed(() => {
  return {
    labels: ['Pending', 'In Progress', 'Completed', 'Canceled'],
    datasets: [
      {
        data: getStatusCounts(),
        backgroundColor: ['#F7C948', '#FF8C00', '#2ECC71', '#E74C3C'],
      },
    ],
  }
})
const averageUtilization = computed(() => {
  return (
    machines.value.reduce((sum, m) => sum + Number(m.utilization_percentage), 0) /
    machines.value.length
  )
})

onMounted(async () => {
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/machines`).then(
    async (res) => (machines.value = await res.json()),
  )

  await fetch(`${import.meta.env.VITE_BACKEND_URL}/production-orders`).then(
    async (res) => (productionOrders.value = await res.json()),
  )

  await fetch(`${import.meta.env.VITE_BACKEND_URL}/quality-inspections/defect-rate`).then(
    async (res) => (defectRate.value = await res.json()),
  )
})
</script>
