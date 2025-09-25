<script setup lang="ts">
import { defineProps, watch, ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";

const props = defineProps<{
  calendarRef: any;
  calendarOptions: any;
  events: any[];
}>();

const localOptions = ref({ ...props.calendarOptions });

watch(
  () => props.events,
  (newEvents) => {
    localOptions.value = { ...localOptions.value, events: newEvents };
  },
  { deep: true }
);
</script>

<template>
  <FullCalendar
    ref="calendarRef"
    :options="localOptions"
    class="bg-white custom-calendar"
  />
</template>

<style scoped>
:deep(.custom-calendar .fc-col-header-cell) {
  @apply bg-gray-100 py-3;
}
:deep(.custom-calendar .fc-col-header-cell-cushion) {
  @apply text-gray-500 font-medium;
}
:deep(.fc-event-dot) {
  display: none !important;
}
:deep(.fc-event) {
  padding: 4px 0;
  box-sizing: border-box;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
}
</style>
