<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed z-20 inset-0 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false"
    />
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 flex flex-col justify-between overflow-y-auto transition duration-300 transform bg-gray-800 rounded-r-xl lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="w-full">
        <div class="flex justify-center mt-4" @click="isOpen = false">
          <router-link to="/dashboard">
            <img src="@/assets/google.png" class="w-auto h-16 mb-4" />
          </router-link>
        </div>
        <div class="flex justify-center" @click="isOpen = false"></div>
        <router-link
          @click="isOpen = false"
          class="flex items-center px-8 py-2 mt-4"
          :class="[
            $route.path === '/'
              ? 'bg-blue-500 text-gray-100 '
              : ' text-gray-200 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
          ]"
          to="/"
        >
          <span class="mx-4">Dashboard</span>
        </router-link>
        <router-link
          @click="isOpen = false"
          class="flex items-center px-8 py-2 mt-4"
          :class="[
            $route.path === '/tracking'
              ? 'bg-blue-500 text-gray-100 '
              : ' text-gray-200 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
          ]"
          to="/tracking"
        >
          <span class="mx-4">Production tracking</span>
        </router-link>

        <router-link
          @click="isOpen = false"
          class="flex items-center px-8 py-2 mt-4"
          :class="[
            $route.path === '/qc'
              ? 'bg-blue-500 text-gray-100 '
              : ' text-gray-200 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
          ]"
          to="/qc"
        >
          <span class="mx-4">Quality Control</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar'

const { isOpen } = useSidebar()
</script>
