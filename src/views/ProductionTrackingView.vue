<template>
  <div class="px-12 py-8">
    <div class="text-2xl pb-3">Production Orders</div>
    <DataTable
      :value="productionOrders"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      class="shadow rounded-lg"
    >
      <Column field="id" header="ID"></Column>
      <Column field="product.name" header="Product Name"></Column>
      <Column field="quantity" header="Quantity"></Column>
      <Column field="status" header="Status"></Column>
      <Column field="scheduled_start" header="Scheduled start"></Column>
      <Column field="scheduled_end" header="Scheduled end"></Column>

      <Column field="actual_start" header="Actual start"></Column>

      <Column field="actual_end" header="Actual end"></Column>
      <Column header="Action">
        <template #body="{ data }: { data: ProductionOrder }">
          <ActionMenu :production-order="data" />
        </template>
      </Column>
    </DataTable>

    <div class="text-2xl py-3">Production Logs</div>
    <DataTable
      :value="productionLogs"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      class="shadow rounded-lg"
    >
      <Column field="id" header="ID"></Column>
      <Column field="production_order.id" header="Production Order ID"></Column>
      <Column field="machine.name" header="Machine name"></Column>
      <Column field="status" header="Status"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type { ProductionLog, ProductionOrder } from '@/types/types'
import { Column, DataTable } from 'primevue'
import { getCurrentInstance, onMounted, ref } from 'vue'
import ActionMenu from '@/components/ActionMenu.vue'

const productionOrders = ref<ProductionOrder[]>([])

const productionLogs = ref<ProductionLog[]>([])

const internalInstance = getCurrentInstance()
const emitter = internalInstance!.appContext.config.globalProperties.emitter

onMounted(async () => {
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/production-orders`).then(
    async (res) => (productionOrders.value = await res.json()),
  )
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/production-logs`).then(
    async (res) => (productionLogs.value = await res.json()),
  )
})

emitter.on('refresh', async () => {
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/production-orders`).then(
    async (res) => (productionOrders.value = await res.json()),
  )
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/production-logs`).then(
    async (res) => (productionLogs.value = await res.json()),
  )
})
</script>
