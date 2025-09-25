<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import BaseInput from "../common/BaseInput.vue";
import ColorPicker from "../common/ColorPicker.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  menuPosition: {
    type: Object,
    required: true,
  },
  menuWidth: {
    type: String,
    required: true,
  },
  errors: {
    type: String,
    default: "",
  },
  editing: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "save", "discard", "close"]);

function updateField(key: string, value: any) {
  emit("update:modelValue", { ...props.modelValue, [key]: value });
}
</script>

<template>
  <div
    class="absolute bg-white px-8 max-w-72 py-4 border-gray-400 shadow-xl rounded-lg z-50 overflow-y-auto max-h-96"
    :style="{
      width: menuWidth + 'px',
      top: menuPosition.top + 'px',
      left: menuPosition.left + 'px',
    }"
  >
    <button
      @click="emit('close')"
      class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 font-bold"
    >
      <span class="material-icons text-sm">close</span>
    </button>

    <div class="space-y-3 mt-5">
      <BaseInput
        :model-value="modelValue.title"
        @update:modelValue="(v) => updateField('title', v)"
        placeholder="event name"
      />
      <BaseInput
        :model-value="modelValue.date"
        type="date"
        @update:modelValue="(v) => updateField('date', v)"
        placeholder="event date"
        icon="event"
      />
      <BaseInput
        :model-value="modelValue.time"
        type="time"
        @update:modelValue="(v) => updateField('time', v)"
        placeholder="event time"
        icon="schedule"
      />
      <textarea
        :value="modelValue.notes"
        @input="updateField('notes', $event.target.value)"
        placeholder="notes"
        class="border-b w-full border-gray-300 focus:border-gray-500 focus:outline-none placeholder-gray-400 text-gray-600 pr-8 py-1"
        rows="2"
      ></textarea>

      <div class="flex justify-center">
        <ColorPicker
          :model-value="modelValue.color"
          @update:modelValue="(v) => updateField('color', v)"
        />
      </div>

      <p
        v-if="errors"
        class="text-red-500 text-sm break-words whitespace-normal"
      >
        {{ errors }}
      </p>
    </div>

    <div class="mt-4 flex justify-between">
      <button
        class="px-4 py-1 text-red-500 hover:text-red-600"
        @click="editing ? emit('discard') : emit('close')"
      >
        {{ editing ? "DISCARD" : "CANCEL" }}
      </button>
      <button
        class="px-4 py-1 text-gray-500 hover:text-cyan-600"
        @click="emit('save')"
      >
        {{ editing ? "EDIT" : "SAVE" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: transparent;
}

* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
</style>
