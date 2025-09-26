import { ref, reactive, computed, onMounted } from "vue";
import type { CalendarOptions } from "@fullcalendar/core";
import { validateEvent } from "~/utils/calendarUtils";
import {
  DEFAULT_EVENT_COLOR,
  VIEWS,
  TODAY_HIGHLIGHT_COLOR,
  DEFAULT_POPUP_WIDTH,
} from "../calendarConstants";

export function useCalendar() {
  const calendarRef = ref<any>(null);
  const events = reactive<any[]>([]);
  const selectedView = ref(VIEWS.MONTH);
  const currentTitle = ref("");
  const todayActive = ref(false);
  const currentViewType = ref<string>(VIEWS.MONTH);

  const menu = ref(false);
  const calendarWrapper = ref<HTMLElement | null>(null);
  const menuPosition = reactive({ top: 0, left: 0 });
  const menuWidth = ref(DEFAULT_POPUP_WIDTH + "px");

  const selectedDate = ref("");
  const editing = ref(false);

  const newEvent = reactive({
    id: "",
    title: "",
    time: "",
    date: "",
    color: DEFAULT_EVENT_COLOR,
    notes: "",
  });

  const errors = ref("");

  function openMenu(info: any) {
    editing.value = !!info.event;
    selectedDate.value = info.startStr || info.event?.startStr;

    if (calendarWrapper.value) {
      const wrapperRect = calendarWrapper.value.getBoundingClientRect();
      let targetRect: DOMRect | null = null;

      if (editing.value && info.event) {
        targetRect = (info.el as HTMLElement).getBoundingClientRect();
      } else {
        const el = calendarWrapper.value.querySelector(
          `[data-date="${selectedDate.value}"]`
        ) as HTMLElement;
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

    const eventDate = new Date(`${newEvent.date}T${newEvent.time}`);
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
      extendedProps: { notes: newEvent.notes },
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
    const api = calendarRef.value?.getApi?.();
    if (!api?.view) return;
    currentTitle.value = api.view.title;
  }

  const goToday = () => {
    calendarRef.value?.getApi()?.today();
    updateTodayActive();
  };
  const goPrev = () => {
    calendarRef.value?.getApi()?.prev();
    updateTodayActive();
  };
  const goNext = () => {
    calendarRef.value?.getApi()?.next();
    updateTodayActive();
  };
  const changeView = (view: string) => {
    calendarRef.value?.getApi()?.changeView(view);
    currentViewType.value = view;
    updateTodayActive();
  };

  const isViewActive = (view: string) => currentViewType.value === view;

  function updateTodayActive() {
    if (!calendarRef.value?.getApi()) return;
    const api = calendarRef.value.getApi();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(api.view.currentStart);
    const end = new Date(api.view.currentEnd);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    todayActive.value = today >= start && today < end;
  }

  const calendarOptions = reactive<CalendarOptions>({
    plugins: [],
    initialView: VIEWS.MONTH,
    editable: true,
    selectable: true,
    events,
    headerToolbar: false,
    select: openMenu,
    eventClick: openMenu,
    datesSet: (info: any) => {
      currentTitle.value = info.view.title;
      currentViewType.value = info.view.type;
      updateTodayActive();
    },
    dayCellDidMount: (info: any) => {
      const today = new Date();
      const cellDate = info.date;
      if (
        today.getFullYear() === cellDate.getFullYear() &&
        today.getMonth() === cellDate.getMonth() &&
        today.getDate() === cellDate.getDate()
      ) {
        info.el.style.backgroundColor = TODAY_HIGHLIGHT_COLOR;
        info.el.style.borderRadius = "0.25rem";
      }
    },
  });

  onMounted(() => {
    updateTodayActive();
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
    isViewActive,
    todayActive,
    calendarOptions,
  };
}
