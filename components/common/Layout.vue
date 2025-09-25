<script setup lang="ts">
import Sidebar from "../common/Sidebar.vue";
import Header from "../common/Header.vue";
import { ref } from "vue";

const activeItem = ref("/");
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar v-model:activeItem="activeItem" />

    <div class="flex-1 flex flex-col">
      <Header
        username="John Doe"
        avatarUrl="https://randomuser.me/api/portraits/men/85.jpg"
      />
      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
