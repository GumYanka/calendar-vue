import { ref, reactive, onMounted } from "vue";
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
  const currentView = ref<any>(null);

  const menu = ref(false);
  const calendarWrapper = ref<HTMLElement | null>(null);
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

  function goToday() {
    const api = calendarRef.value?.getApi?.();
    if (!api) return;
    api.today();
    updateTitle();
  }

  function goPrev() {
    const api = calendarRef.value?.getApi?.();
    if (!api) return;
    api.prev();
    updateTitle();
  }

  function goNext() {
    const api = calendarRef.value?.getApi?.();
    if (!api) return;
    api.next();
    updateTitle();
  }

  function changeView(view: string) {
    selectedView.value = view;
    const api = calendarRef.value?.getApi?.();
    if (!api) return;
    api.changeView(view);
    updateTitle();
  }

  const isTodayActive = () => {
    if (!currentView.value) return false;
    const today = new Date();
    return (
      today >= currentView.value.currentStart &&
      today < currentView.value.currentEnd
    );
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
    eventDrop: (info: any) => {
      const idx = events.findIndex((e) => e.id === info.event.id);
      if (idx >= 0) events[idx].start = info.event.start;
    },
    datesSet: (info: any) => {
      currentTitle.value = info.view.title;
      currentView.value = info.view;
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
    updateTitle();
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
    calendarOptions,
  };
}
