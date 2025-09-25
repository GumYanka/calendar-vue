<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps<{
  username: string;
  avatarUrl: string;
}>();
</script>

<template>
  <header class="flex items-center justify-between bg-white shadow px-6 h-16">
    <div class="flex-1 max-w-md relative">
      <input
        type="text"
        placeholder="Search transactions, invoices or help"
        class="w-full px-3 py-2 pl-10 rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
      <span
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-icons"
        >search</span
      >
    </div>

    <div class="flex items-center gap-4 ml-6">
      <button class="p-2 text-gray-400 hover:text-cyan-500">
        <span class="material-icons">notifications</span>
      </button>
      <button class="p-2 text-gray-400 hover:text-cyan-500">
        <span class="material-icons">email</span>
      </button>
      <button class="p-2 text-gray-400 hover:text-cyan-500">
        <span class="material-icons">location_on</span>
      </button>

      <div class="h-6 border-l border-gray-300"></div>

      <div class="flex items-center gap-2">
        <span class="text-gray-600 font-medium mr-4">{{ username }}</span>
        <img :src="avatarUrl" alt="User" class="w-8 h-8 rounded-full" />
      </div>
    </div>
  </header>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
