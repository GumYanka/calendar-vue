<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import EventPopup from "~/components/calendar/EventPopup.vue";
import { useCalendar } from "~/composables/useCalendar";

const {
  calendarRef,
  events,
  selectedView,
  currentTitle,
  menu,
  calendarWrapper,
  menuPosition,
  menuWidth,
  selectedDate,
  editing,
  newEvent,
  errors,
  openMenu,
  saveEvent,
  discardEvent,
  goToday,
  goPrev,
  goNext,
  changeView,
  isTodayActive,
  calendarOptions,
} = useCalendar();

calendarOptions.plugins = [
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
];
</script>

<template>
  <h1 class="font-semibold mx-10 text-gray-600 text-2xl">Calendar</h1>

  <div class="p-6 bg-white relative m-10" ref="calendarWrapper">
    <div class="flex justify-between">
      <h1 class="font-medium text-gray-600 text-m">Calendar view</h1>
      <div>
        <div class="flex shadow">
          <button
            class="px-4 py-1 text-gray-600 border-[1.5px] border-gray-300 rounded-l hover:text-cyan-500"
            :class="selectedView === 'dayGridMonth' ? 'text-cyan-500' : ''"
            @click="changeView('dayGridMonth')"
          >
            Month
          </button>
          <button
            class="px-4 py-1 text-gray-600 border-y-[1.5px] border-r-[1.5px] border-gray-300 hover:text-cyan-500"
            :class="selectedView === 'timeGridWeek' ? 'text-cyan-500' : ''"
            @click="changeView('timeGridWeek')"
          >
            Week
          </button>
          <button
            class="px-4 text-gray-600 py-1 border-y-[1.5px] border-gray-300 hover:text-cyan-500"
            :class="selectedView === 'timeGridDay' ? 'text-cyan-500' : ''"
            @click="changeView('timeGridDay')"
          >
            Day
          </button>
          <button
            class="px-4 text-gray-600 py-1 border-[1.5px] border-gray-300 rounded-r hover:text-cyan-500"
            :class="selectedView === 'listWeek' ? 'text-cyan-500' : ''"
            @click="changeView('listWeek')"
          >
            Agenda
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center my-2">
      <h2 class="text-xl font-semibold text-gray-500">{{ currentTitle }}</h2>
    </div>

    <div class="flex justify-between items-center my-4">
      <div class="flex shadow">
        <button
          :class="[
            'px-4 py-1 border-[1.5px] text-gray-600 border-gray-300 rounded-l hover:text-cyan-500',
            isTodayActive() ? 'text-cyan-500' : '',
          ]"
          @click="goToday"
        >
          Today
        </button>
        <button
          class="px-4 py-1 border-y-[1.5px] text-gray-600 border-gray-300 hover:text-cyan-500"
          @click="goPrev"
        >
          Back
        </button>
        <button
          class="px-4 py-1 border-[1.5px] text-gray-600 border-gray-300 rounded-r hover:text-cyan-500"
          @click="goNext"
        >
          Next
        </button>
      </div>
    </div>

    <client-only>
      <FullCalendar
        ref="calendarRef"
        :options="calendarOptions"
        class="bg-white custom-calendar"
      />
    </client-only>

    <EventPopup
      v-if="menu"
      :model-value="newEvent"
      :menu-position="menuPosition"
      :menu-width="menuWidth"
      :errors="errors"
      :editing="editing"
      @update:modelValue="(v) => Object.assign(newEvent, v)"
      @save="saveEvent"
      @discard="discardEvent"
      @close="menu = false"
    />
  </div>
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

input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  display: none;
}
input[type="date"],
input[type="time"] {
  -moz-appearance: textfield;
}
</style>
