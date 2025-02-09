<template>
  <Toast />
  <UpdateOrderDialog />
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import UpdateOrderDialog from '@/components/UpdateOrderDialog.vue'
import Toast from 'primevue/toast'
</script>
