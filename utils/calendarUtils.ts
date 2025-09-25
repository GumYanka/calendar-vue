import { DEFAULT_EVENT_COLOR, DEFAULT_POPUP_WIDTH } from "../calendarConstants";

export function createNewEventData(
  info: any,
  selectedDate: string,
  defaultColor: string = DEFAULT_EVENT_COLOR
) {
  if (info?.event) {
    const eventStart = new Date(info.event.start);
    return {
      id: info.event.id,
      title: info.event.title,
      time: eventStart.toTimeString().substring(0, 5),
      date: eventStart.toISOString().substring(0, 10),
      color: info.event.borderColor || defaultColor,
      notes: info.event.extendedProps?.notes || "",
    };
  } else {
    return {
      id: Date.now().toString(),
      title: "",
      time: "12:00",
      date: selectedDate,
      color: defaultColor,
      notes: "",
    };
  }
}

export function validateEvent(event: any) {
  const errs: string[] = [];
  if (!event.title) errs.push("Name is required");
  if (event.title && event.title.length > 30)
    errs.push("Name cannot exceed 30 characters");
  if (!event.date) errs.push("Date is required");
  if (!event.time) errs.push("Time is required");

  const selected = new Date(`${event.date}T${event.time}`);
  if (selected < new Date()) errs.push("Date and time cannot be in the past");

  return errs;
}

export function calculatePopupPosition(
  wrapperRect: DOMRect,
  targetRect: DOMRect,
  popupWidth: number = DEFAULT_POPUP_WIDTH
) {
  let left =
    targetRect.left - wrapperRect.left + targetRect.width / 2 - popupWidth / 2;
  let top = targetRect.top - wrapperRect.top + targetRect.height / 1.5;

  if (left < 0) left = 0;
  if (left + popupWidth > wrapperRect.width)
    left = wrapperRect.width - popupWidth;

  return { top, left, width: popupWidth };
}
