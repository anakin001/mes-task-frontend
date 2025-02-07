<template>
  <div class="flex h-screen bg-gray-200">
    <NavigationMenu />
    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="flex justify-between bg-gray-800">
        <router-link to="/dashboard" class="lg:hidden">
          <img src="@/assets/google.png" class="h-16 py-2 px-4" />
        </router-link>
        <div class="lg:hidden">
          <img
            src="@/assets/bars.png"
            @click="isOpen = true"
            class="h-16 py-2 px-4 cursor-pointer"
          />
        </div>
      </div>
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-white flex flex-col justify-between">
        <div class="flex flex-col">
          <slot />
        </div>
        <footer
          class="mx-auto m px-6 flex text-txs text-xs justify-between container pb-5 items-center"
        >
          <div class="ml-2 sm:ml-0">Copyright © 2025. All Rights Reserved.</div>
          <div class="mr-2 sm:mr-0 py-2 sm:py-0">
            <span> Version {{ version }}</span>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavigationMenu from './NavigationMenu.vue'
import packageData from '../../package.json'
import { useSidebar } from '@/composables/useSidebar'

const version = packageData.version

const { isOpen } = useSidebar()
</script>
