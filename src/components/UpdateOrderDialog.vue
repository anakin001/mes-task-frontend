<template>
  <Dialog
    v-model:visible="isOpen"
    header="Update production order"
    modal
    :draggable="false"
    :dismissableMask="true"
    :closable="true"
    class="w-1/4"
  >
    <div class="flex flex-col items-start gap-3">
      <div>ID : {{ dialogProp!.id }}</div>
      <div>Status</div>
      <Select
        v-model="selectedStatus"
        :options="options"
        optionLabel="name"
        placeholder="Select status"
      />
      <div>Scheduled start</div>
      <DatePicker v-model="scheduled_start" showTime hourFormat="24" fluid />
      <div>Scheduled end</div>
      <DatePicker v-model="scheduled_end" showTime hourFormat="24" fluid />
      <button
        @click="updateOrder()"
        class="cursor-pointer bg-gray-800 text-white rounded-lg px-3 py-1 mx-auto"
      >
        Update
      </button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { useDialog } from '@/composables/useDialog'
import Dialog from 'primevue/dialog'
import DatePicker from 'primevue/datepicker'
import { getCurrentInstance, ref, watch } from 'vue'
import Select from 'primevue/select'
import { ProductionOrderStatus } from '@/types/types'
import { useToast } from 'primevue'

const { isOpen, dialogProp } = useDialog()

const scheduled_start = ref<Date | null>()

const scheduled_end = ref<Date | null>()

watch(isOpen, (n) => {
  if (n) {
    scheduled_start.value = dialogProp.value!.scheduled_start
    scheduled_end.value = dialogProp.value!.scheduled_end
    selectedStatus.value = options.value.find((value) => value.name == dialogProp.value!.status)
  }
})

const options = ref([
  { name: ProductionOrderStatus.PENDING, code: ProductionOrderStatus.PENDING },
  { name: ProductionOrderStatus.IN_PROGRESS, code: ProductionOrderStatus.IN_PROGRESS },
  { name: ProductionOrderStatus.COMPLETED, code: ProductionOrderStatus.COMPLETED },
  { name: ProductionOrderStatus.CANCELED, code: ProductionOrderStatus.CANCELED },
])

const selectedStatus = ref()

const toast = useToast()
const internalInstance = getCurrentInstance()
const emitter = internalInstance!.appContext.config.globalProperties.emitter

const updateOrder = async () => {
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/production-orders/${dialogProp.value!.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      scheduled_start: scheduled_start.value,
      scheduled_end: scheduled_end.value,
      status: selectedStatus.value.name,
    }),
  }).then(async (res) => {
    if (res.status == 200) {
      emitter.emit('refresh')
      toast.add({
        severity: 'success',
        summary: 'Updated successfully',
        detail: `Order ID: ${dialogProp.value!.id}`,
        life: 3000,
      })
      dialogProp.value = undefined
      isOpen.value = false
    }
  })
}
</script>
