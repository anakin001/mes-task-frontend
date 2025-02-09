import type { ProductionOrder } from '@/types/types'
import { ref } from 'vue'

const isOpen = ref(false)

const dialogProp = ref<ProductionOrder>()

export const useDialog = () => {
  return {
    isOpen,
    dialogProp,
  }
}
