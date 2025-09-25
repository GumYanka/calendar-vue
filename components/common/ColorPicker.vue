<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function updateColor(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <label class="flex items-center gap-2 cursor-pointer text-gray-500">
    <span
      class="w-6 h-6 rounded-full border border-gray-300 shadow-sm"
      :style="{ backgroundColor: modelValue }"
    ></span>
    <span>select color</span>
    <input
      type="color"
      class="sr-only"
      :value="modelValue"
      @input="updateColor"
    />
  </label>
</template>
