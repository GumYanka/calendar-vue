import { _ as _export_sfc, d as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, unref, ref, reactive, mergeProps, computed, useSSRContext } from 'vue';
import { ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderDynamicModel } from 'vue/server-renderer';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:path';
import 'pinia';
import 'vue-router';
import '@iconify/vue';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BaseInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    placeholder: {},
    type: {},
    icon: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputValue = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const isMaterialIcon = computed(() => {
      return props.icon && !props.icon.includes("/");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full" }, _attrs))} data-v-4f11102e><input${ssrRenderDynamicModel(props.type || "text", inputValue.value, null)}${ssrRenderAttr("type", props.type || "text")}${ssrRenderAttr("placeholder", props.placeholder)} class="w-full border-b border-gray-300 focus:border-gray-500 focus:outline-none placeholder-gray-400 text-gray-600 pr-8 py-1" data-v-4f11102e>`);
      if (props.icon && isMaterialIcon.value) {
        _push(`<span class="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" data-v-4f11102e>${ssrInterpolate(props.icon)}</span>`);
      } else if (props.icon) {
        _push(`<span class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" data-v-4f11102e><img${ssrRenderAttr("src", props.icon)} alt="icon" class="w-4 h-4 opacity-70" data-v-4f11102e></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/BaseInput.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const BaseInput = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-4f11102e"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ColorPicker",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2 cursor-pointer text-gray-500" }, _attrs))}><span class="w-6 h-6 rounded-full border border-gray-300 shadow-sm" style="${ssrRenderStyle({ backgroundColor: _ctx.modelValue })}"></span><span>select color</span><input type="color" class="sr-only"${ssrRenderAttr("value", _ctx.modelValue)}></label>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/ColorPicker.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EventPopup",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    menuPosition: {
      type: Object,
      required: true
    },
    menuWidth: {
      type: String,
      required: true
    },
    errors: {
      type: String,
      default: ""
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "save", "discard", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function updateField(key, value) {
      emit("update:modelValue", { ...props.modelValue, [key]: value });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "absolute bg-white px-8 max-w-72 py-4 border-gray-400 shadow-xl rounded-lg z-50 overflow-y-auto max-h-96",
        style: {
          width: __props.menuWidth + "px",
          top: __props.menuPosition.top + "px",
          left: __props.menuPosition.left + "px"
        }
      }, _attrs))} data-v-17cf0aa0><button class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 font-bold" data-v-17cf0aa0><span class="material-icons text-sm" data-v-17cf0aa0>close</span></button><div class="space-y-3 mt-5" data-v-17cf0aa0>`);
      _push(ssrRenderComponent(BaseInput, {
        "model-value": __props.modelValue.title,
        "onUpdate:modelValue": (v) => updateField("title", v),
        placeholder: "event name"
      }, null, _parent));
      _push(ssrRenderComponent(BaseInput, {
        "model-value": __props.modelValue.date,
        type: "date",
        "onUpdate:modelValue": (v) => updateField("date", v),
        placeholder: "event date",
        icon: "event"
      }, null, _parent));
      _push(ssrRenderComponent(BaseInput, {
        "model-value": __props.modelValue.time,
        type: "time",
        "onUpdate:modelValue": (v) => updateField("time", v),
        placeholder: "event time",
        icon: "schedule"
      }, null, _parent));
      _push(`<textarea placeholder="notes" class="border-b w-full border-gray-300 focus:border-gray-500 focus:outline-none placeholder-gray-400 text-gray-600 pr-8 py-1" rows="2" data-v-17cf0aa0>${ssrInterpolate(__props.modelValue.notes)}</textarea><div class="flex justify-center" data-v-17cf0aa0>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        "model-value": __props.modelValue.color,
        "onUpdate:modelValue": (v) => updateField("color", v)
      }, null, _parent));
      _push(`</div>`);
      if (__props.errors) {
        _push(`<p class="text-red-500 text-sm break-words whitespace-normal" data-v-17cf0aa0>${ssrInterpolate(__props.errors)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-4 flex justify-between" data-v-17cf0aa0><button class="px-4 py-1 text-red-500 hover:text-red-600" data-v-17cf0aa0>${ssrInterpolate(__props.editing ? "DISCARD" : "CANCEL")}</button><button class="px-4 py-1 text-gray-500 hover:text-cyan-600" data-v-17cf0aa0>${ssrInterpolate(__props.editing ? "EDIT" : "SAVE")}</button></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/calendar/EventPopup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const EventPopup = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-17cf0aa0"]]);
const DEFAULT_POPUP_WIDTH = 250;
const DEFAULT_EVENT_COLOR = "#06b6d4";
const TODAY_HIGHLIGHT_COLOR = "#A5F3FCAC";
const VIEWS = {
  MONTH: "dayGridMonth"
};
function createNewEventData(info, selectedDate, defaultColor = DEFAULT_EVENT_COLOR) {
  var _a;
  if (info == null ? void 0 : info.event) {
    const eventStart = new Date(info.event.start);
    return {
      id: info.event.id,
      title: info.event.title,
      time: eventStart.toTimeString().substring(0, 5),
      date: eventStart.toISOString().substring(0, 10),
      color: info.event.borderColor || defaultColor,
      notes: ((_a = info.event.extendedProps) == null ? void 0 : _a.notes) || ""
    };
  } else {
    return {
      id: Date.now().toString(),
      title: "",
      time: "12:00",
      date: selectedDate,
      color: defaultColor,
      notes: ""
    };
  }
}
function validateEvent(event) {
  const errs = [];
  if (!event.title) errs.push("Name is required");
  if (event.title && event.title.length > 30)
    errs.push("Name cannot exceed 30 characters");
  if (!event.date) errs.push("Date is required");
  if (!event.time) errs.push("Time is required");
  const selected = /* @__PURE__ */ new Date(`${event.date}T${event.time}`);
  if (selected < /* @__PURE__ */ new Date()) errs.push("Date and time cannot be in the past");
  return errs;
}
function calculatePopupPosition(wrapperRect, targetRect, popupWidth = DEFAULT_POPUP_WIDTH) {
  let left = targetRect.left - wrapperRect.left + targetRect.width / 2 - popupWidth / 2;
  let top = targetRect.top - wrapperRect.top + targetRect.height / 1.5;
  if (left < 0) left = 0;
  if (left + popupWidth > wrapperRect.width)
    left = wrapperRect.width - popupWidth;
  return { top, left, width: popupWidth };
}
function useCalendar() {
  const calendarRef = ref(null);
  const events = reactive([]);
  const selectedView = ref(VIEWS.MONTH);
  const currentTitle = ref("");
  const currentView = ref(null);
  const menu = ref(false);
  const calendarWrapper = ref(null);
  const menuPosition = reactive({ top: 0, left: 0 });
  const menuWidth = ref("250px");
  const selectedDate = ref("");
  const editing = ref(false);
  const newEvent = reactive({
    id: "",
    title: "",
    time: "",
    date: "",
    color: DEFAULT_EVENT_COLOR,
    notes: ""
  });
  const errors = ref("");
  function openMenu(info) {
    var _a;
    editing.value = !!info.event;
    selectedDate.value = info.startStr || ((_a = info.event) == null ? void 0 : _a.startStr);
    if (calendarWrapper.value) {
      const wrapperRect = calendarWrapper.value.getBoundingClientRect();
      let targetRect = null;
      if (editing.value && info.event) {
        targetRect = info.el.getBoundingClientRect();
      } else {
        const el = calendarWrapper.value.querySelector(
          `[data-date="${selectedDate.value}"]`
        );
        if (el) targetRect = el.getBoundingClientRect();
      }
      if (targetRect) {
        const { top, left, width } = calculatePopupPosition(
          wrapperRect,
          targetRect,
          DEFAULT_POPUP_WIDTH
        );
        menuPosition.top = top;
        menuPosition.left = left;
        menuWidth.value = width + "px";
      } else {
        menuPosition.top = 200;
        menuPosition.left = 200;
        menuWidth.value = DEFAULT_POPUP_WIDTH + "px";
      }
    }
    Object.assign(newEvent, createNewEventData(info, selectedDate.value));
    errors.value = "";
    menu.value = true;
  }
  function saveEvent() {
    const errs = validateEvent(newEvent);
    if (errs.length) {
      errors.value = errs.join(". ");
      return;
    }
    const eventDate = /* @__PURE__ */ new Date(`${newEvent.date}T${newEvent.time}`);
    const idx = events.findIndex((e) => e.id === newEvent.id);
    const eventObj = {
      id: newEvent.id,
      title: newEvent.title,
      start: eventDate.toISOString(),
      allDay: false,
      backgroundColor: newEvent.color,
      borderColor: newEvent.color,
      textColor: "#FFFFFFFF",
      display: "block",
      extendedProps: { notes: newEvent.notes }
    };
    if (idx >= 0) events[idx] = eventObj;
    else events.push(eventObj);
    menu.value = false;
  }
  function discardEvent() {
    const idx = events.findIndex((e) => e.id === newEvent.id);
    if (idx >= 0) events.splice(idx, 1);
    menu.value = false;
  }
  function updateTitle() {
    var _a, _b;
    const api = (_b = (_a = calendarRef.value) == null ? void 0 : _a.getApi) == null ? void 0 : _b.call(_a);
    if (!(api == null ? void 0 : api.view)) return;
    currentTitle.value = api.view.title;
  }
  function goToday() {
    var _a, _b;
    const api = (_b = (_a = calendarRef.value) == null ? void 0 : _a.getApi) == null ? void 0 : _b.call(_a);
    if (!api) return;
    api.today();
    updateTitle();
  }
  function goPrev() {
    var _a, _b;
    const api = (_b = (_a = calendarRef.value) == null ? void 0 : _a.getApi) == null ? void 0 : _b.call(_a);
    if (!api) return;
    api.prev();
    updateTitle();
  }
  function goNext() {
    var _a, _b;
    const api = (_b = (_a = calendarRef.value) == null ? void 0 : _a.getApi) == null ? void 0 : _b.call(_a);
    if (!api) return;
    api.next();
    updateTitle();
  }
  function changeView(view) {
    var _a, _b;
    selectedView.value = view;
    const api = (_b = (_a = calendarRef.value) == null ? void 0 : _a.getApi) == null ? void 0 : _b.call(_a);
    if (!api) return;
    api.changeView(view);
    updateTitle();
  }
  const isTodayActive = () => {
    if (!currentView.value) return false;
    const today = /* @__PURE__ */ new Date();
    return today >= currentView.value.currentStart && today < currentView.value.currentEnd;
  };
  const calendarOptions = reactive({
    plugins: [],
    initialView: selectedView.value,
    editable: true,
    selectable: true,
    events,
    headerToolbar: false,
    select: openMenu,
    eventClick: openMenu,
    eventOverlap: true,
    slotEventOverlap: true,
    eventDrop: (info) => {
      const idx = events.findIndex((e) => e.id === info.event.id);
      if (idx >= 0) events[idx].start = info.event.start;
    },
    datesSet: (info) => {
      currentTitle.value = info.view.title;
      currentView.value = info.view;
    },
    dayCellDidMount: (info) => {
      const today = /* @__PURE__ */ new Date();
      const cellDate = info.date;
      if (today.getFullYear() === cellDate.getFullYear() && today.getMonth() === cellDate.getMonth() && today.getDate() === cellDate.getDate()) {
        info.el.style.backgroundColor = TODAY_HIGHLIGHT_COLOR;
        info.el.style.borderRadius = "0.25rem";
      }
    }
  });
  return {
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
    calendarOptions
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      selectedView,
      currentTitle,
      menu,
      menuPosition,
      menuWidth,
      editing,
      newEvent,
      errors,
      saveEvent,
      discardEvent,
      isTodayActive,
      calendarOptions
    } = useCalendar();
    calendarOptions.plugins = [
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      interactionPlugin
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$2;
      _push(`<!--[--><h1 class="font-semibold mx-10 text-gray-600 text-2xl" data-v-0d6abad0>Calendar</h1><div class="p-6 bg-white relative m-10" data-v-0d6abad0><div class="flex justify-between" data-v-0d6abad0><h1 class="font-medium text-gray-600 text-m" data-v-0d6abad0>Calendar view</h1><div data-v-0d6abad0><div class="flex shadow" data-v-0d6abad0><button class="${ssrRenderClass([unref(selectedView) === "dayGridMonth" ? "text-cyan-500" : "", "px-4 py-1 text-gray-600 border-[1.5px] border-gray-300 rounded-l hover:text-cyan-500"])}" data-v-0d6abad0> Month </button><button class="${ssrRenderClass([unref(selectedView) === "timeGridWeek" ? "text-cyan-500" : "", "px-4 py-1 text-gray-600 border-y-[1.5px] border-r-[1.5px] border-gray-300 hover:text-cyan-500"])}" data-v-0d6abad0> Week </button><button class="${ssrRenderClass([unref(selectedView) === "timeGridDay" ? "text-cyan-500" : "", "px-4 text-gray-600 py-1 border-y-[1.5px] border-gray-300 hover:text-cyan-500"])}" data-v-0d6abad0> Day </button><button class="${ssrRenderClass([unref(selectedView) === "listWeek" ? "text-cyan-500" : "", "px-4 text-gray-600 py-1 border-[1.5px] border-gray-300 rounded-r hover:text-cyan-500"])}" data-v-0d6abad0> Agenda </button></div></div></div><div class="flex justify-center items-center my-2" data-v-0d6abad0><h2 class="text-xl font-semibold text-gray-500" data-v-0d6abad0>${ssrInterpolate(unref(currentTitle))}</h2></div><div class="flex justify-between items-center my-4" data-v-0d6abad0><div class="flex shadow" data-v-0d6abad0><button class="${ssrRenderClass([
        "px-4 py-1 border-[1.5px] text-gray-600 border-gray-300 rounded-l hover:text-cyan-500",
        unref(isTodayActive)() ? "text-cyan-500" : ""
      ])}" data-v-0d6abad0> Today </button><button class="px-4 py-1 border-y-[1.5px] text-gray-600 border-gray-300 hover:text-cyan-500" data-v-0d6abad0> Back </button><button class="px-4 py-1 border-[1.5px] text-gray-600 border-gray-300 rounded-r hover:text-cyan-500" data-v-0d6abad0> Next </button></div></div>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      if (unref(menu)) {
        _push(ssrRenderComponent(EventPopup, {
          "model-value": unref(newEvent),
          "menu-position": unref(menuPosition),
          "menu-width": unref(menuWidth),
          errors: unref(errors),
          editing: unref(editing),
          "onUpdate:modelValue": (v) => Object.assign(unref(newEvent), v),
          onSave: unref(saveEvent),
          onDiscard: unref(discardEvent),
          onClose: ($event) => menu.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0d6abad0"]]);

export { index as default };
//# sourceMappingURL=index-BaC0PEo6.mjs.map
