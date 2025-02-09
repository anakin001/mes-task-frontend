<template>
  <img src="@/assets/dot.png" class="w-6 h-6 cursor-pointer" @click="toggle" />
  <Menu ref="menu" :model="items" :popup="true"> </Menu>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
import Menu from 'primevue/menu'
import type { ProductionOrder } from '@/types/types'
import { useDialog } from '@/composables/useDialog'
import { useToast } from 'primevue'

const { productionOrder } = defineProps<{
  productionOrder: ProductionOrder
}>()

const { dialogProp, isOpen } = useDialog()

const menu = ref()

const toast = useToast()
const internalInstance = getCurrentInstance()
const emitter = internalInstance!.appContext.config.globalProperties.emitter

const items = ref([
  {
    visible: true,
    label: 'Update',
    command: () => {
      dialogProp.value = productionOrder
      isOpen.value = true
    },
  },
  {
    visible: true,
    label: 'Delete',
    command: async () => {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/production-orders/${productionOrder.id}`, {
        method: 'DELETE',
      }).then((res) => {
        if (res.status == 200) {
          toast.add({
            severity: 'success',
            summary: 'Removed successfully',
            detail: `Order ID:${productionOrder.id} `,
            life: 3000,
          })
          emitter.emit('refresh')
        }
      })
    },
  },
])

const toggle = (event: Event) => {
  menu.value.toggle(event)
}
</script>
