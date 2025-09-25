<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  type?: string;
  icon?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const inputValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit("update:modelValue", val),
});

const isMaterialIcon = computed(() => {
  return props.icon && !props.icon.includes("/");
});
</script>

<template>
  <div class="relative w-full">
    <input
      v-model="inputValue"
      :type="props.type || 'text'"
      :placeholder="props.placeholder"
      class="w-full border-b border-gray-300 focus:border-gray-500 focus:outline-none placeholder-gray-400 text-gray-600 pr-8 py-1"
    />

    <span
      v-if="props.icon && isMaterialIcon"
      class="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
    >
      {{ props.icon }}
    </span>

    <span
      v-else-if="props.icon"
      class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
    >
      <img :src="props.icon" alt="icon" class="w-4 h-4 opacity-70" />
    </span>
  </div>
</template>

<style scoped>
input::placeholder {
  color: #c0c0c0;
}
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  cursor: pointer;
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
}

input[type="date"],
input[type="time"] {
  -moz-appearance: textfield; /* прибирає стандартну іконку */
  cursor: pointer;
}

input[type="date"],
input[type="time"] {
  padding-right: 2.5rem;
}
</style>
