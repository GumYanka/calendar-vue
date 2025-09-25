<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps<{
  activeItem: string;
}>();

const emit = defineEmits<{
  (e: "update:activeItem", value: string): void;
}>();

const menu = [
  { title: "Home", icon: "home", to: "/home" },
  { title: "Dashboard", icon: "dashboard", to: "/dashboard" },
  { title: "Inbox", icon: "email", to: "/inbox" },
  { title: "Products", icon: "inventory_2", to: "/products" },
  { title: "Invoices", icon: "receipt_long", to: "/invoices" },
  { title: "Customers", icon: "groups", to: "/customers" },
  { title: "Chat Room", icon: "chat", to: "/chat" },
  { title: "Calendar", icon: "calendar_today", to: "/" },
  { title: "Help Center", icon: "help", to: "/help" },
  { title: "Settings", icon: "settings", to: "/settings" },
];
</script>

<template>
  <aside class="w-56 bg-gray-600 text-white flex-shrink-0">
    <div class="border-t bg-gray-700 p-5 text-l font-bold tracking-widest">
      IMPEKABLE
    </div>
    <nav class="mt-2">
      <ul>
        <li
          v-for="item in menu"
          :key="item.title"
          @click="$emit('update:activeItem', item.to)"
          :class="[
            'flex items-center gap-3 px-4 py-4 border-l-2 cursor-pointer',
            props.activeItem === item.to
              ? 'border-l-cyan-400 bg-gray-700 text-cyan-400'
              : 'border-l-2 border-gray-600 hover:border-l-cyan-400 hover:bg-gray-700 hover:text-cyan-400',
          ]"
        >
          <span class="material-icons">{{ item.icon }}</span>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
